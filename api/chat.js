// /api/chat.js  — Vercel Serverless Function (Node)

const PRIMARY_MODEL = "mistralai/mistral-small-3.2-24b-instruct:free";
// Enable any paid/alt models you’ve allowed in OpenRouter, then uncomment:
const FALLBACK_MODELS = [
  // "openai/gpt-4o-mini",
  // "google/gemini-1.5-flash",
  // "anthropic/claude-3.5-haiku",
];

function buildReferer(req) {
  // Use the actual deployment domain so OpenRouter accepts it
  const host = req?.headers?.host; // e.g., mihirkudale.vercel.app
  if (host) return `https://${host}`;
  return process.env.SITE_URL || "http://localhost:5173";
}

async function callOpenRouter({ messages, model, referer }) {
  return fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer": referer,           // IMPORTANT for OpenRouter
      "X-Title": "Mihir Portfolio Assistant",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.3,
      max_tokens: 600,
    }),
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Body can arrive as string in some runtimes — parse defensively
    let body = req.body;
    if (typeof body === "string") {
      try { body = JSON.parse(body); } catch {}
    }
    const { query, history = [] } = body || {};

    if (!query || !query.trim()) {
      return res.status(200).json({ answer: "Please ask a question." });
    }

    // Keep a short memory so follow-ups work
    const messages = [
      {
        role: "system",
        content:
          "You are Mihir Kudale's portfolio AI assistant. Be concise, helpful, and truthful. If a detail is unknown, say so briefly and point to the closest helpful info on the site.",
      },
      ...history.slice(-8).map((m) => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text,
      })),
      { role: "user", content: query },
    ];

    const referer = buildReferer(req);
    const modelsToTry = [PRIMARY_MODEL, ...FALLBACK_MODELS];

    // Try primary + fallbacks with tiny backoff for 429/5xx
    let lastErrorText = null;
    for (const model of modelsToTry) {
      try {
        const r = await callOpenRouter({ messages, model, referer });
        if (r.ok) {
          const data = await r.json();
          const answer =
            data?.choices?.[0]?.message?.content ??
            "I couldn’t generate a response.";
          return res.status(200).json({ answer });
        } else {
          const t = await r.text().catch(() => "");
          lastErrorText = `OpenRouter (${model}) -> ${r.status}: ${t}`;
          // Retry only on throttling/server errors
          if (r.status === 429 || r.status >= 500) {
            await new Promise((a) => setTimeout(a, 300));
            continue;
          }
          break; // non-retryable error
        }
      } catch (e) {
        lastErrorText = `Fetch failed for ${model}: ${e?.message || e}`;
        await new Promise((a) => setTimeout(a, 200));
      }
    }

    // Graceful fallback text + bubble up the actual error
    return res.status(200).json({
      answer:
        "I’m having trouble reaching the model right now. Quick summary: Mihir is a Pune-based software dev focused on data engineering/analytics (Python, SQL, AWS, Azure, Power BI, Tableau). See Projects/Contact for details.",
      error: lastErrorText || "unknown upstream error",
    });
  } catch (err) {
    console.error("API error:", err);
    return res.status(200).json({
      answer: "Something went wrong. Please try again.",
      error: err?.message || null,
    });
  }
}
