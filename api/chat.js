// /api/chat.js  (Vercel Serverless Function — no Python needed)
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { query, history = [] } = req.body || {};
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

    const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.SITE_URL || "http://localhost:5173",
        "X-Title": "Mihir Portfolio Assistant",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b:free", // your chosen model
        messages,
        temperature: 0.3,
        max_tokens: 600,
      }),
    });

    if (!r.ok) {
      const t = await r.text().catch(() => "");
      return res.status(200).json({
        answer:
          "I’m having trouble reaching the model right now. Quick summary: Mihir is a Pune-based software dev focused on data engineering/analytics (Python, SQL, AWS, Azure, Power BI, Tableau). See Projects/Contact for details.",
        error: t,
      });
    }

    const data = await r.json();
    const answer =
      data?.choices?.[0]?.message?.content ?? "I couldn’t generate a response.";
    return res.status(200).json({ answer });
  } catch (err) {
    return res
      .status(200)
      .json({ answer: "Something went wrong. Please try again.", error: err?.message || null });
  }
}