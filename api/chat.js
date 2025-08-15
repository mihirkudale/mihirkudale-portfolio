// /api/chat.js — Vercel Serverless Function (Node)

// --- Config: tweak as needed ---
const PRIMARY_MODEL = "mistralai/mistral-small-3.2-24b-instruct:free";
// Enable any paid/alt models you’ve allowed in OpenRouter, then uncomment:
const FALLBACK_MODELS = [
  // "openai/gpt-4o-mini",
  // "google/gemini-1.5-flash",
  // "anthropic/claude-3.5-haiku",
];

const SYSTEM_PROMPT =
  "You are Mihir Kudale's portfolio AI assistant. Be concise, helpful, and truthful. " +
  "If a detail is unknown, say so briefly and point to the closest helpful info on the site.";

const MAX_HISTORY_TURNS = 8;      // last N messages (pairs inclusive)
const TEMPERATURE = 0.3;
const MAX_TOKENS = 600;
const REQUEST_TIMEOUT_MS = 18000; // abort slow upstreams

// Optional: force Node runtime (Vercel default is fine)
// export const config = { runtime: "nodejs18.x" };

// --- Utilities ---
function buildReferer(req) {
  // Prefer live host; fall back to SITE_URL env; final fallback localhost
  const host = req?.headers?.host; // e.g., mihirkudale.vercel.app
  if (host) {
    const isLocal = host.includes("localhost") || host.includes("127.0.0.1");
    return `${isLocal ? "http" : "https"}://${host}`;
  }
  return process.env.SITE_URL || "http://localhost:5173";
}

function parseBody(req) {
  // In some runtimes body can be a string
  if (typeof req.body === "string") {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  return req.body || {};
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function withTimeout(promise, ms) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(new Error("upstream timeout")), ms);
  return {
    promise: (async () => {
      try {
        return await promise(ac.signal);
      } finally {
        clearTimeout(t);
      }
    })(),
    signal: ac.signal,
  };
}

function buildMessages({ query, history }) {
  const trimmed = (history || []).slice(-MAX_HISTORY_TURNS).map((m) => ({
    role: m.from === "user" ? "user" : "assistant",
    content: String(m.text ?? "").slice(0, 4000), // guard very long turns
  }));
  return [
    { role: "system", content: SYSTEM_PROMPT },
    ...trimmed,
    { role: "user", content: String(query) },
  ];
}

async function callOpenRouter({ messages, model, referer, signal }) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    // OpenRouter requires a valid site referer + app title for routing/abuse prevention
    "HTTP-Referer": process.env.OPENROUTER_SITE_URL || referer,
    "X-Title": process.env.OPENROUTER_APP_NAME || "Mihir Portfolio Assistant",
  };

  const body = {
    model,
    messages,
    temperature: TEMPERATURE,
    max_tokens: MAX_TOKENS,
  };

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    signal,
  });

  return res;
}

// Basic CORS helper (useful when calling this route from localhost)
function setCors(res, origin) {
  res.setHeader("Access-Control-Allow-Origin", origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req, res) {
  setCors(res, "*");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Ensure key exists
  if (!process.env.OPENROUTER_API_KEY) {
    return res.status(500).json({ error: "Missing OPENROUTER_API_KEY" });
  }

  try {
    const { query, history = [], model: clientModel } = parseBody(req);

    if (!query || !String(query).trim()) {
      return res.status(200).json({ answer: "Please ask a question." });
    }

    const messages = buildMessages({ query, history });
    const referer = buildReferer(req);

    // Allow client to override model (only if you've whitelisted it in OpenRouter)
    const modelsToTry = [clientModel || PRIMARY_MODEL, ...FALLBACK_MODELS].filter(Boolean);

    let lastErrorText = null;

    for (let i = 0; i < modelsToTry.length; i++) {
      const model = modelsToTry[i];

      // Exponential backoff with jitter for retries on 429/5xx
      const backoffMs = i === 0 ? 0 : Math.min(1500 * 2 ** (i - 1), 6000) + Math.floor(Math.random() * 200);

      try {
        if (backoffMs) await sleep(backoffMs);

        const { promise } = withTimeout(async (signal) => {
          return await callOpenRouter({ messages, model, referer, signal });
        }, REQUEST_TIMEOUT_MS);

        const r = await promise;

        if (r.ok) {
          const data = await r.json().catch(() => null);
          const answer =
            data?.choices?.[0]?.message?.content ??
            "I couldn’t generate a response.";
          return res.status(200).json({ answer, modelUsed: model });
        } else {
          const t = await r.text().catch(() => "");
          lastErrorText = `OpenRouter (${model}) -> ${r.status}: ${t}`;
          // Retry only on throttling/server errors
          if (r.status === 429 || r.status >= 500) {
            continue;
          }
          break; // non-retryable error
        }
      } catch (e) {
        lastErrorText = `Fetch failed for ${model}: ${e?.message || e}`;
        // continue to next model
      }
    }

    // Graceful fallback text + bubble up the actual error for debugging
    return res.status(200).json({
      answer:
        "I’m having trouble reaching the model right now. Quick summary: Mihir is a Pune-based software dev focused on data engineering/analytics (Python, SQL, AWS, Azure, Power BI, Tableau). See Projects/Contact for details.",
      error: lastErrorText || "unknown upstream error",
      modelUsed: null,
    });
  } catch (err) {
    console.error("API error:", err);
    return res.status(200).json({
      answer: "Something went wrong. Please try again.",
      error: err?.message || null,
      modelUsed: null,
    });
  }
}