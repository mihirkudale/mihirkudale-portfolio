/**
 * Vercel Serverless Function: Groq API Integration
 *
 * Handles AI responses for the portfolio chatbot.
 * Reads real portfolio data from api/data/portfolio.json — never hallucinate.
 *
 * Environment Variables Required:
 * - GROQ_API_KEY: Your Groq API key from https://console.groq.com
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Load real portfolio data at startup (bundled with the function on Vercel)
const portfolio = require('./data/portfolio.json');

// Using dynamic import for better cold start performance
let groqInstance = null;

// Rate limiting
const rateLimitMap = new Map();
const RATE_LIMIT = { maxRequests: 30, windowMs: 60000 };

function isRateLimited(clientId) {
  const now = Date.now();
  const clientData = rateLimitMap.get(clientId) || { count: 0, resetTime: now + RATE_LIMIT.windowMs };
  if (now > clientData.resetTime) {
    clientData.count = 1;
    clientData.resetTime = now + RATE_LIMIT.windowMs;
  } else {
    clientData.count++;
  }
  rateLimitMap.set(clientId, clientData);
  return clientData.count > RATE_LIMIT.maxRequests;
}

function sanitizeInput(text) {
  if (typeof text !== 'string') return '';
  return text.trim().slice(0, 1000).replace(/[<>"`]/g, '');
}

/**
 * Build a grounded system prompt from the real portfolio JSON data.
 * The AI can ONLY answer based on this data — no hallucination allowed.
 */
function buildSystemPrompt(data) {
  const { about, contact, education, experience, certifications, skills, projects } = data;

  const eduList = education.map(e =>
    `  - ${e.degree} | ${e.institution}${e.university ? ', ' + e.university : ''} | ${e.location} (${e.duration})`
  ).join('\n');

  const expList = experience.map(e =>
    `  - ${e.role} at ${e.company} | ${e.location} | ${e.duration}`
  ).join('\n');

  const certList = certifications.map(c => `  - ${c.title} — ${c.issuer}`).join('\n');

  const skillList = Object.entries(skills).map(([cat, items]) =>
    `  - ${cat}: ${items.join(', ')}`
  ).join('\n');

  const projectList = projects.map(p => {
    const links = [];
    if (p.github) links.push(`GitHub: ${p.github}`);
    if (p.demo) links.push(`Live Demo: ${p.demo}`);
    return `  - **${p.title}** [${p.stack.join(', ')}]${links.length ? ' | ' + links.join(' | ') : ''}
    ${p.description}`;
  }).join('\n');

  return `You are the portfolio assistant for ${about.name}'s personal website. Answer ONLY using the factual data below. If a fact is not in this data, say "I don't have that information — please reach out to ${about.name} directly via ${contact.email}." Never invent or guess.

---
## ABOUT
- Name: ${about.name}
- Role: ${about.title}
- Focus: ${about.focus}
- Roles: ${about.roles}
- Description: ${about.description}
- Credentials: ${about.credentials}
- Location: ${about.location}
- Availability: ${about.availability}
- Badges: ${about.badges.join(' | ')}

## CONTACT
- Email: ${contact.email}
- LinkedIn: ${contact.linkedin}
- GitHub: ${contact.github}

## EDUCATION
${eduList}

## WORK EXPERIENCE
${expList}

## CERTIFICATIONS
${certList}

## SKILLS
${skillList}

## PROJECTS (${projects.length} total)
${projectList}

---
## RESPONSE RULES
- Be friendly, concise, and professional.
- Use markdown bullet points and **bold** for readability.
- When sharing project info, include the title, a brief description, tech stack, and links if available.
- NEVER make up project names, certifications, companies, or dates not listed above.
- If asked about something unrelated to this portfolio, politely redirect to portfolio topics.
- Keep responses focused. For project lists, summarize by category if there are many.`;
}

// Build the system prompt once at cold start
const SYSTEM_PROMPT = buildSystemPrompt(portfolio);

async function getGroqResponse(userMessage, conversationHistory) {
  if (!groqInstance) {
    const { default: GroqSDK } = await import('groq-sdk');
    groqInstance = new GroqSDK({ apiKey: process.env.GROQ_API_KEY });
  }

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...conversationHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content,
    })),
    { role: 'user', content: userMessage },
  ];

  const response = await groqInstance.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages,
    temperature: 0.2,  // Very low — maximally factual, minimal creativity
    max_tokens: 512,
    top_p: 1,
  });

  return response.choices?.[0]?.message?.content || '';
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Invalid message' });
      return;
    }

    const clientId = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
    if (isRateLimited(clientId)) {
      res.status(429).json({ error: 'Rate limit exceeded', useRuleBased: true });
      return;
    }

    if (!process.env.GROQ_API_KEY) {
      console.warn('GROQ_API_KEY not set — using rule-based fallback');
      res.status(200).json({ reply: '', useRuleBased: true, error: 'API not configured' });
      return;
    }

    const sanitized = sanitizeInput(message);
    const reply = await getGroqResponse(sanitized, conversationHistory);

    res.status(200).json({ reply, useRuleBased: false, error: null });
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ reply: '', useRuleBased: true, error: error.message });
  }
}
