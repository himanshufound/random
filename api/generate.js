/*
 * Vercel serverless function: generates a word category with Google Gemini.
 *
 * The Gemini key lives in the GEMINI_API_KEY environment variable and never
 * reaches the browser. The prompt is built here from a few validated options,
 * so the endpoint can only make word lists, not answer arbitrary prompts.
 *
 * GET  /api/generate  -> { available: boolean, reason?: "daily_limit" }
 * POST /api/generate  -> { category, icon, entries: ["Word|Similar", ...], hints: { Word: "..." } }
 *
 * Optional env vars:
 *   GEMINI_MODEL      model id to try first (fallbacks: gemini-flash-latest,
 *                     gemini-3.8-flash, gemini-flash-lite-latest)
 *   ALLOWED_ORIGINS   comma-separated extra origins allowed to call this endpoint
 *   RATE_LIMIT        requests per visitor per 10 minutes (default 12)
 *   DAILY_LIMIT       generations per UTC day for the whole site (default 200, 0 = no cap)
 *   UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (or KV_REST_API_URL +
 *   KV_REST_API_TOKEN from Vercel KV): shared counters for both limits.
 *   Without them the counters live in each server instance's memory.
 */
const crypto = require("crypto");
const { buildPrompt, parseAIReply } = require("../js/ai.js");

const FALLBACK_MODELS = ["gemini-flash-latest", "gemini-3.8-flash", "gemini-flash-lite-latest"];
const WINDOW_MS = 10 * 60 * 1000;
const DAY_S = 24 * 60 * 60;
const KEY_PREFIX = "infiltrator:";

function envLimit(name, fallback) {
  const raw = process.env[name];
  if (raw == null || String(raw).trim() === "") return fallback;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : fallback;
}
const rateLimit = () => envLimit("RATE_LIMIT", 12) || 12;
const dailyLimit = () => envLimit("DAILY_LIMIT", 200); // 0 turns the cap off

function clientIp(req) {
  const fwd = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  return fwd || req.headers["x-real-ip"] || (req.socket && req.socket.remoteAddress) || "unknown";
}

/* ---- Shared store: Upstash Redis / Vercel KV over REST, or null ---- */
function kvConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url: url.replace(/\/+$/, ""), token } : null;
}

async function kvPipeline(commands) {
  const kv = kvConfig();
  const res = await fetch(`${kv.url}/pipeline`, {
    method: "POST",
    headers: { authorization: `Bearer ${kv.token}`, "content-type": "application/json" },
    body: JSON.stringify(commands)
  });
  if (!res.ok) throw new Error(`KV HTTP ${res.status}`);
  const out = await res.json();
  const bad = out.find((r) => r && r.error);
  if (bad) throw new Error(`KV ${bad.error}`);
  return out.map((r) => r.result);
}

// Adds one to a counter that expires ttl seconds after it was created; returns the new value.
async function kvIncr(key, ttl) {
  const [, n] = await kvPipeline([["SET", key, "0", "EX", String(ttl), "NX"], ["INCR", key]]);
  return Number(n);
}
async function kvGet(key) {
  const [n] = await kvPipeline([["GET", key]]);
  return Number(n) || 0;
}

/* ---- In-memory fallback (per server instance, resets on cold starts) ---- */
const memory = new Map(); // key -> { n, until }
function memIncr(key, ttl) {
  const now = Date.now();
  let e = memory.get(key);
  if (!e || e.until <= now) { e = { n: 0, until: now + ttl * 1000 }; memory.set(key, e); }
  e.n += 1;
  if (memory.size > 5000) for (const [k, v] of memory) if (v.until <= now) memory.delete(k);
  return e.n;
}
function memGet(key) {
  const e = memory.get(key);
  return e && e.until > Date.now() ? e.n : 0;
}

async function incr(key, ttl) {
  if (kvConfig()) {
    try { return await kvIncr(key, ttl); }
    catch (e) { console.error("KV unavailable, using in-memory limits:", e.message); }
  }
  return memIncr(key, ttl);
}
async function peek(key) {
  if (kvConfig()) {
    try { return await kvGet(key); }
    catch (e) { console.error("KV unavailable, using in-memory limits:", e.message); }
  }
  return memGet(key);
}

/* ---- Limits ---- */
const dayKey = () => `${KEY_PREFIX}day:${new Date().toISOString().slice(0, 10)}`;

async function dailyCapReached() {
  const cap = dailyLimit();
  return cap > 0 && (await peek(dayKey())) >= cap;
}
// Reserves one generation from today's budget before Gemini is called, so bursts can't overshoot.
async function takeDailySlot() {
  const cap = dailyLimit();
  return cap === 0 || (await incr(dayKey(), DAY_S + 3600)) <= cap;
}

async function rateLimited(ip) {
  // Visitor IPs are hashed before they're used as keys in the shared store.
  const id = crypto.createHash("sha256").update(ip).digest("hex").slice(0, 32);
  const win = Math.floor(Date.now() / WINDOW_MS);
  return (await incr(`${KEY_PREFIX}rl:${id}:${win}`, WINDOW_MS / 1000)) > rateLimit();
}

// Only the game's own pages may generate: POSTs must carry an Origin that matches this site.
function originAllowed(req) {
  const origin = req.headers.origin;
  if (!origin || origin === "null") return false;
  let host;
  try { host = new URL(origin).host; } catch (e) { return false; }
  if (host === req.headers.host || host === req.headers["x-forwarded-host"]) return true;
  const extra = String(process.env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim().replace(/\/+$/, "")).filter(Boolean);
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

const DAILY_MSG = "Today's free AI words are used up. Use the copy-and-paste option, or try again tomorrow.";

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const key = process.env.GEMINI_API_KEY;

  if (req.method === "GET") {
    if (!key) return res.status(200).json({ available: false });
    if (await dailyCapReached()) return res.status(200).json({ available: false, reason: "daily_limit" });
    return res.status(200).json({ available: true });
  }
  if (req.method !== "POST") { res.setHeader("Allow", "GET, POST"); return res.status(405).json({ error: "Method not allowed." }); }
  if (!originAllowed(req)) return res.status(403).json({ error: "This generator only works from the game's own website." });
  if (!key) return res.status(503).json({ error: "The built-in AI isn't set up yet. Use the copy-and-paste option instead." });
  if (await rateLimited(clientIp(req))) return res.status(429).json({ error: "That's a lot of categories! Wait a few minutes before generating more." });

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = null; } }

  try {
    const opts = readOptions(body);
    if (!(await takeDailySlot())) return res.status(429).json({ error: DAILY_MSG, code: "daily_limit" });
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
