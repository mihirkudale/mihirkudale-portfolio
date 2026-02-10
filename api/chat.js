/**
 * Vercel Serverless Function: Groq API Integration
 * 
 * Handles AI responses for the portfolio chatbot.
 * - Secure API key management (backend only)
 * - Rate limiting & error handling
 * - Fallback to rule-based responses
 * - Optimized for Vercel cold starts
 * 
 * Environment Variables Required:
 * - GROQ_API_KEY: Your Groq API key from https://console.groq.com
 */

// Using dynamic import for better cold start performance
let Groq;
let groqInstance = null;

// Rate limiting: simple in-memory store (reset on Function timeout)
const rateLimitMap = new Map();
const RATE_LIMIT = {
  maxRequests: 30,
  windowMs: 60000, // 1 minute
};

/**
 * Check if a client is rate limited
 */
function isRateLimited(clientId) {
  const now = Date.now();
  const clientData = rateLimitMap.get(clientId) || { count: 0, resetTime: now + RATE_LIMIT.windowMs };

  if (now > clientData.resetTime) {
    // Reset window
    clientData.count = 1;
    clientData.resetTime = now + RATE_LIMIT.windowMs;
  } else {
    clientData.count++;
  }

  rateLimitMap.set(clientId, clientData);

  return clientData.count > RATE_LIMIT.maxRequests;
}

/**
 * Sanitize user input for safety
 */
function sanitizeInput(text) {
  if (typeof text !== 'string') return '';
  return text
    .trim()
    .slice(0, 1000) // Max 1000 chars
    .replace(/[<>\"'`]/g, ''); // Remove potentially dangerous chars
}

/**
 * Get AI response from Groq API
 */
async function getGroqResponse(userMessage, conversationHistory) {
  // Initialize Groq SDK on first use (lazy loading)
  if (!groqInstance) {
    const { default: GroqSDK } = await import('groq-sdk');
    Groq = GroqSDK;
    groqInstance = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }

  const systemPrompt = `You are a helpful portfolio assistant for Mihir Kudale's website. 
You have knowledge about:
- Portfolio projects and technologies used
- Skills in Data Analytics, AI, Python, SQL, Power BI, Tableau
- Work experience and certifications
- Contact information and availability

Be concise, friendly, and professional. Keep responses to 2-3 sentences max.
If asked about something not related to the portfolio, politely redirect to portfolio topics.`;

  const messages = [
    ...conversationHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content,
    })),
    { role: 'user', content: userMessage },
  ];

  try {
    const response = await groqInstance.chat.completions.create({
      model: 'mixtral-8x7b-32768', // Fast, free tier model
      messages,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
    });

    return response.choices?.[0]?.message?.content || '';
  } catch (error) {
    console.error('Groq API error:', error.message);
    throw error;
  }
}

/**
 * Main handler
 */
export default async function handler(req, res) {
  // CORS headers (adjust origin for production)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { message, conversationHistory = [] } = req.body;

    // Validate input
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Invalid message' });
      return;
    }

    // Client ID from IP (simple rate limiting)
    const clientId = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    if (isRateLimited(clientId)) {
      res.status(429).json({ error: 'Rate limit exceeded', useRuleBased: true });
      return;
    }

    const sanitized = sanitizeInput(message);

    // Try Groq API
    if (!process.env.GROQ_API_KEY) {
      console.warn('GROQ_API_KEY not set, using rule-based fallback');
      res.status(200).json({
        reply: '',
        useRuleBased: true,
        error: 'API not configured',
      });
      return;
    }

    const reply = await getGroqResponse(sanitized, conversationHistory);

    res.status(200).json({
      reply,
      useRuleBased: false,
      error: null,
    });
  } catch (error) {
    console.error('Chat API error:', error);

    // Return error but signal frontend to use rule-based fallback
    res.status(500).json({
      reply: '',
      useRuleBased: true,
      error: error.message,
    });
  }
}
