/*
 * Vercel serverless function: generates a word category with Google Gemini.
 *
 * The Gemini key lives in the GEMINI_API_KEY environment variable and never
 * reaches the browser. The prompt is built here from a few validated options,
 * so the endpoint can only make word lists, not answer arbitrary prompts.
 *
 * GET  /api/generate  -> { available: boolean }
 * POST /api/generate  -> { category, icon, entries: ["Word|Similar", ...], hints: { Word: "..." } }
 *
 * Optional env vars:
 *   GEMINI_MODEL      model id to try first (fallbacks: gemini-flash-latest,
 *                     gemini-3.8-flash, gemini-flash-lite-latest)
 *   ALLOWED_ORIGINS   comma-separated extra origins allowed to call this endpoint
 *   RATE_LIMIT        requests per visitor per 10 minutes (default 12)
 */
const { buildPrompt, parseAIReply } = require("../js/ai.js");

const FALLBACK_MODELS = ["gemini-flash-latest", "gemini-3.8-flash", "gemini-flash-lite-latest"];
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map(); // best-effort per-instance rate limit

function clientIp(req) {
  const fwd = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  return fwd || req.headers["x-real-ip"] || (req.socket && req.socket.remoteAddress) || "unknown";
}

function rateLimited(ip) {
  const limit = Number(process.env.RATE_LIMIT) || 12;
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= limit) { hits.set(ip, recent); return true; }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

function originAllowed(req) {
  const origin = req.headers.origin;
  if (!origin) return true; // same-origin GETs and non-browser clients send no Origin
  let host;
  try { host = new URL(origin).host; } catch (e) { return false; }
  if (host === req.headers.host) return true;
  const extra = String(process.env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);
  return extra.includes(origin);
}

const str = (v, max) => String(v == null ? "" : v).replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max);

function readOptions(body) {
  const b = body && typeof body === "object" ? body : {};
  const topic = str(b.topic, 80);
  if (!topic) throw new Error("Tell me what the category should be about.");
  const count = Math.max(5, Math.min(50, Number(b.count) || 30));
  const difficulty = ["easy", "medium", "hard"].includes(b.difficulty) ? b.difficulty : "medium";
  const audience = ["all", "kids", "adults"].includes(b.audience) ? b.audience : "all";
  const language = str(b.language, 30) || "English";
  const avoid = Array.isArray(b.avoid) ? b.avoid.slice(0, 200).map((w) => str(w, 40)).filter(Boolean) : [];
  return { topic, count, difficulty, audience, language, avoid };
}

async function callGemini(prompt, key) {
  // Busy (429/5xx) or retired (404) models fall through to the next one.
  const models = [...new Set([process.env.GEMINI_MODEL, ...FALLBACK_MODELS].filter(Boolean))];
  let lastError = null;
  for (const model of models) {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json", temperature: 0.9 }
      })
    });
    let data = null;
    try { data = await res.json(); } catch (e) { /* handled below */ }
    if (res.status === 404 || res.status === 429 || res.status >= 500) {
      lastError = Object.assign(new Error(res.status === 429
        ? "The free AI quota is used up for now. Try again in a minute, or use the copy-and-paste option."
        : res.status === 404 ? "No Gemini model is available. The site owner can set GEMINI_MODEL." : "The AI service is busy. Try again shortly."), { status: res.status === 429 ? 429 : 502 });
      console.error(`Gemini ${model}: HTTP ${res.status}`);
      continue;
    }
    if (res.status === 400 || res.status === 403) {
      console.error("Gemini rejected the request:", res.status, data && data.error && data.error.message);
      throw Object.assign(new Error("The AI service rejected the request. The site owner should check the Gemini API key."), { status: 502 });
    }
    if (!res.ok) throw Object.assign(new Error("The AI service is busy. Try again shortly."), { status: 502 });

    if (data.promptFeedback && data.promptFeedback.blockReason) throw Object.assign(new Error("The AI declined this topic. Try wording it differently."), { status: 422 });
    const cand = (data.candidates || [])[0];
    const text = cand && cand.content && Array.isArray(cand.content.parts)
      ? cand.content.parts.filter((p) => !p.thought && typeof p.text === "string").map((p) => p.text).join("")
      : "";
    if (!text) {
      const reason = cand && cand.finishReason;
      if (reason === "SAFETY" || reason === "PROHIBITED_CONTENT") throw Object.assign(new Error("The AI declined this topic. Try wording it differently."), { status: 422 });
      throw Object.assign(new Error("The AI returned an empty answer. Try again."), { status: 502 });
    }
    return text;
  }
  throw lastError || Object.assign(new Error("No Gemini model is available. The site owner can set GEMINI_MODEL."), { status: 502 });
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const key = process.env.GEMINI_API_KEY;

  if (req.method === "GET") return res.status(200).json({ available: !!key });
  if (req.method !== "POST") { res.setHeader("Allow", "GET, POST"); return res.status(405).json({ error: "Method not allowed." }); }
  if (!originAllowed(req)) return res.status(403).json({ error: "This generator only works from the game's own website." });
  if (!key) return res.status(503).json({ error: "The built-in AI isn't set up yet. Use the copy-and-paste option instead." });
  if (rateLimited(clientIp(req))) return res.status(429).json({ error: "That's a lot of categories! Wait a few minutes before generating more." });

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = null; } }

  try {
    const opts = readOptions(body);
    const text = await callGemini(buildPrompt(opts), key);
    let parsed;
    try {
      if (!/[{[]/.test(text)) throw new Error("not JSON");
      parsed = parseAIReply(text);
    }
    catch (e) { return res.status(502).json({ error: "The AI's answer couldn't be read. Try again." }); }
    const entries = parsed.entries.slice(0, 60);
    const used = new Set(entries.flatMap((e) => e.split("|")));
    const hints = {};
    for (const [w, h] of Object.entries(parsed.hints || {})) if (used.has(w)) hints[w] = h;
    return res.status(200).json({ category: parsed.category || opts.topic, icon: parsed.icon, entries, hints });
  } catch (e) {
    return res.status(e.status || 400).json({ error: e.message || "Something went wrong." });
  }
};
