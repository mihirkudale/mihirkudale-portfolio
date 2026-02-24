/**
 * Vercel Serverless Function: LangGraph Agent Integration
 *
 * Handles AI responses for the portfolio chatbot using a ReAct Agent architecture.
 * Upgraded for 2026 AI Agent standards: Uses Tool Calling and Stateful Graphs.
 *
 * Environment Variables Required:
 * - GROQ_API_KEY: Your Groq API key from https://console.groq.com
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Load real portfolio data at startup (bundled with the function on Vercel)
const portfolio = require('./data/portfolio.json');

// --- Rate Limiting Strategy ---
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

// Global cached state so we don't re-instantiate LangChain objects per request
let graphInstance = null;

/**
 * Initializes the LangGraph Agent.
 * This is loaded dynamically because serverless cold starts with heavy 
 * LangChain imports can sometimes be slow. We only init when needed.
 */
async function getGraph() {
  if (graphInstance) return graphInstance;

  // Dynamically import LangChain dependencies
  const { ChatGroq } = await import('@langchain/groq');
  const { tool } = await import('@langchain/core/tools');
  const { z } = await import('zod');
  const { StateGraph, MessagesAnnotation, END, START } = await import('@langchain/langgraph');
  const { HumanMessage, SystemMessage, AIMessage } = await import('@langchain/core/messages');
  const { ToolNode } = await import('@langchain/langgraph/prebuilt');

  // --- 1. Define Tools (The Agent's "Hands") ---

  const getPortfolioDataTool = tool(
    async ({ topic }) => {
      console.log(`[Tool] getPortfolioData called for topic: ${topic}`);
      // Based on the topic, return the specific JSON slice to save tokens
      switch (topic.toLowerCase()) {
        case 'about': return JSON.stringify(portfolio.about);
        case 'contact': return JSON.stringify(portfolio.contact);
        case 'education': return JSON.stringify(portfolio.education);
        case 'experience': return JSON.stringify({ experience: portfolio.experience });
        case 'certifications': return JSON.stringify({ certifications: portfolio.certifications });
        case 'skills': return JSON.stringify({ skills: portfolio.skills });
        case 'projects': 
          // Compress projects to save tokens
          const compressed = portfolio.projects.map(p => ({
            title: p.title,
            stack: p.stack,
            github: p.github || 'N/A',
            demo: p.demo || 'N/A'
          }));
          return JSON.stringify({ projects: compressed });
        case 'all': // Try to avoid this, but fallback if needed
        default:
          return `Please search for a specific topic: about, contact, education, experience, certifications, skills, or projects.`;
      }
    },
    {
      name: "get_portfolio_data",
      description: "Gets specific factual information about Mihir's portfolio. Always use this tool to answer questions about his experience, skills, or projects. Topics allowed: about, contact, education, experience, certifications, skills, projects.",
      schema: z.object({
        topic: z.string().describe("The specific section of the portfolio to fetch (e.g., 'projects', 'experience', 'skills')."),
      }),
    }
  );

  const checkAvailabilityTool = tool(
    async () => {
      console.log(`[Tool] checkAvailability called`);
      return "Mihir is currently open to new opportunities and available for interviews Monday through Friday between 10:00 AM and 6:00 PM IST.";
    },
    {
      name: "check_interview_availability",
      description: "Checks Mihir's current availability for job interviews or freelance chats.",
    }
  );

  const tools = [getPortfolioDataTool, checkAvailabilityTool];
  const toolNode = new ToolNode(tools);

  // --- 2. Define the LLM (The Agent's "Brain") ---

  const llm = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    modelName: 'llama-3.1-8b-instant', // Fast, supports tool calling natively
    temperature: 0.2, // Keep interpretations strict
  });

  const llmWithTools = llm.bindTools(tools);

  // --- 3. Define the Agent Logic (The Graph Nodes) ---

  // The system prompt sets the behavioral boundaries for the agent.
  const IDENTIY_PROMPT = new SystemMessage(`You are the official AI Agent for Mihir Kudale's portfolio website. 
Your job is to answer visitor questions by calling the \`get_portfolio_data\` tool.
NEVER make up facts, dates, companies, or projects. If a user asks a question about Mihir, ALWAYS call the tool to get the real data first before answering.
Be friendly, concise, and professional. Use markdown for readability (bullet points, bold text).
If the user asks an unrelated technical question, politely pivot back to Mihir's skills and projects.`);

  // The main decision-making node
  const callModel = async (state) => {
    // We prepend the identity prompt to the dynamic conversation messages
    const messages = [IDENTIY_PROMPT, ...state.messages];
    const response = await llmWithTools.invoke(messages);
    return { messages: [response] };
  };

  // The routing function that decides what node runs next
  const routeNode = (state) => {
    const messages = state.messages;
    const lastMessage = messages[messages.length - 1];

    // If the LLM decided to call a tool, route to the ToolNode
    if (lastMessage.tool_calls && lastMessage.tool_calls.length > 0) {
      return "tools";
    }
    // Otherwise, it has finished thinking, end the graph.
    return END;
  };

  // --- 4. Build the StateGraph ---
  const workflow = new StateGraph(MessagesAnnotation)
    .addNode("agent", callModel)
    .addNode("tools", toolNode)
    .addEdge(START, "agent")
    .addConditionalEdges("agent", routeNode)
    .addEdge("tools", "agent");

  // Compile the graph into an executable app
  graphInstance = workflow.compile();
  
  // Expose the HumanMessage formatter so the handler can use it
  graphInstance.formatHumanMessage = (content) => new HumanMessage(content);
  graphInstance.formatAIMessage = (content) => new AIMessage(content);

  return graphInstance;
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

    // --- Execute the LangGraph Agent ---
    const app = await getGraph();

    // Reconstruct history into LangChain Message objects
    const formattedHistory = conversationHistory.map(msg => 
      msg.role === 'user' ? app.formatHumanMessage(msg.content) : app.formatAIMessage(msg.content)
    );

    const inputs = {
      messages: [...formattedHistory, app.formatHumanMessage(sanitized)]
    };

    console.log(`[Agent] Starting execution for query: "${sanitized}"`);
    
    // Invoke the graph. This will loop internally if tools are called.
    const result = await app.invoke(inputs);
    
    // The final state of `messages` contains the entire thread of the loop.
    // The very last message in the array is the LLM's final response to the user.
    const finalMessage = result.messages[result.messages.length - 1];

    res.status(200).json({ reply: finalMessage.content, useRuleBased: false, error: null });

  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ reply: '', useRuleBased: true, error: error.message });
  }
}
