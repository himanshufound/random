/*
 * AI word-pack generation.
 *
 * Three routes:
 *  1. Built in: POST to this site's /api/generate, which calls Gemini with the
 *     site owner's key (kept server-side). Needs the site hosted on Vercel.
 *  2. Free: build a prompt the player pastes into any chatbot, then paste the
 *     reply back. parseAIReply() turns that reply into word entries.
 *  3. Direct: call the Claude API from the browser with the player's own key.
 *     The key is kept only in this browser's localStorage.
 *
 * Also loaded by api/generate.js on the server (via module.exports).
 */
(function (root) {
  const DEFAULT_MODEL = "claude-opus-5-5";

  const SCHEMA = {
    type: "object",
    properties: {
      category: { type: "string" },
      icon: { type: "string" },
      words: {
        type: "array",
        items: {
          type: "object",
          properties: {
            word: { type: "string" },
            similar: { type: "array", items: { type: "string" } }
          },
          required: ["word", "similar"],
          additionalProperties: false
        }
      }
    },
    required: ["category", "icon", "words"],
    additionalProperties: false
  };

  const DIFFICULTY = {
    easy: "easy: very well-known, concrete things everyone in the group will know",
    medium: "medium: well-known things, with a few less obvious picks",
    hard: "hard: trickier picks, and similar words that are very close to the main word"
  };

  function buildPrompt(opts) {
    const count = Math.max(5, Math.min(100, Number(opts.count) || 30));
    const lines = [
      "I'm playing a party word game like Undercover / Spyfall. Most players get a secret word; an Infiltrator gets a similar but different word, and they all describe their word with short clues without saying it.",
      "",
      `Create a word list about: ${opts.topic}`,
      `Number of entries: ${count}`,
      `Difficulty: ${DIFFICULTY[opts.difficulty] || DIFFICULTY.medium}`,
      `Language: ${opts.language || "English"}`
    ];
    if (opts.audience === "kids") lines.push("Audience: kids, so keep everything family-friendly and simple.");
    if (opts.audience === "adults") lines.push("Audience: adults at a party. Cheeky is fine, but nothing hateful or explicit.");
    lines.push(
      "",
      "Rules for each entry:",
      "- \"word\": a specific, recognisable thing, place, person, title or activity that people can describe in one word clues.",
      "- \"similar\": 1 or 2 words from the same topic that are close enough to cause confusion during clues but clearly different (example: Coffee → Tea, Hot Chocolate).",
      "- Keep each word short (1 to 3 words). No duplicates."
    );
    if (opts.avoid && opts.avoid.length) {
      lines.push(`- Do not reuse any of these existing words: ${opts.avoid.slice(0, 200).join(", ")}`);
    }
    lines.push(
      "",
      "Reply with only JSON in exactly this shape, no extra text:",
      '{"category": "Short category name", "icon": "one emoji", "words": [{"word": "Coffee", "similar": ["Tea", "Hot Chocolate"]}]}'
    );
    return lines.join("\n");
  }

  function cleanWord(s) {
    return String(s || "").replace(/[|\n\r\t]/g, " ").replace(/\s+/g, " ").trim().slice(0, 60);
  }

  /* Turn {word, similar[]} items into "Word|Similar|Similar" entries. */
  function toEntries(items) {
    const seen = new Set();
    const out = [];
    for (const it of items || []) {
      const word = cleanWord(typeof it === "string" ? it : it && it.word);
      if (!word || seen.has(word.toLowerCase())) continue;
      seen.add(word.toLowerCase());
      const sims = (it && Array.isArray(it.similar) ? it.similar : [])
        .map(cleanWord)
        .filter((s) => s && s.toLowerCase() !== word.toLowerCase())
        .slice(0, 3);
      out.push([word, ...sims].join("|"));
    }
    return out;
  }

  /* Accept JSON (bare, fenced or surrounded by chatter) or plain lines. */
  function parseAIReply(text) {
    const raw = String(text || "").trim();
    if (!raw) throw new Error("Paste the AI's reply first.");
    let json = null;
    const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
    const candidates = [fenced && fenced[1], raw, raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1)];
    for (const c of candidates) {
      if (!c) continue;
      try { json = JSON.parse(c); break; } catch (e) { /* try the next shape */ }
    }
    if (json) {
      const items = Array.isArray(json) ? json : json.words;
      const entries = toEntries(items);
      if (!entries.length) throw new Error("The reply had no words in it.");
      return {
        category: cleanWord(json.category) || "",
        icon: (String(json.icon || "").trim().slice(0, 4)) || "✨",
        entries
      };
    }
    // Fallback: one word per line, optional "| similar" or ", similar".
    const entries = raw.split(/\r?\n/)
      .map((l) => l.replace(/^\s*([-*•]|\d+[.)])\s*/, "").trim())
      .filter((l) => l && l.length < 120)
      .map((l) => l.split(/\s*[|→]\s*|\s*,\s*/).map(cleanWord).filter(Boolean).join("|"))
      .filter(Boolean);
    if (!entries.length) throw new Error("Couldn't find any words in that reply.");
    return { category: "", icon: "✨", entries };
  }

  async function generateWithClaude(opts, apiKey, model) {
    if (!apiKey) throw new Error("Add your Claude API key first.");
    const useModel = (model || DEFAULT_MODEL).trim();
    const body = {
      model: useModel,
      max_tokens: 16000,
      messages: [{ role: "user", content: buildPrompt(opts) }],
      output_config: { format: { type: "json_schema", schema: SCHEMA } }
    };
    const headers = {
      "content-type": "application/json",
      "x-api-key": apiKey.trim(),
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true"
    };
    if (!/haiku/.test(useModel)) body.output_config.effort = "medium";
    // Server-side fallback re-runs a declined request on Anthropic's recommended model.
    if (/^claude-(opus-5|sonnet-5-5|fable-5)/.test(useModel)) {
      body.fallbacks = "default";
      headers["anthropic-beta"] = "server-side-fallback-2026-07-01";
    }

    let res;
    try {
      res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers, body: JSON.stringify(body) });
    } catch (e) {
      throw new Error("Couldn't reach the Claude API. Check your connection, or use the free copy-and-paste option instead.");
    }
    let data = null;
    try { data = await res.json(); } catch (e) { /* handled below */ }
    if (!res.ok) {
      const msg = data && data.error && data.error.message;
      if (res.status === 401) throw new Error("Your API key was rejected. Check that it's copied correctly.");
      if (res.status === 429) throw new Error("Rate limited by the API. Wait a minute and try again.");
      if (res.status === 529 || res.status >= 500) throw new Error("The Claude API is busy right now. Try again shortly.");
      throw new Error(msg || `The API returned an error (${res.status}).`);
    }
    if (data.stop_reason === "refusal") throw new Error("The AI declined this topic. Try wording it differently.");
    const text = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("");
    if (data.stop_reason === "max_tokens") throw new Error("The list was too long and got cut off. Ask for fewer words.");
    return parseAIReply(text);
  }

  /* Built-in generator: returns "ready", "nokey" or "none" (no server). */
  async function builtInStatus() {
    try {
      const res = await fetch("api/generate", { method: "GET", cache: "no-store" });
      if (!res.ok) return "none";
      const data = await res.json();
      return data && data.available ? "ready" : "nokey";
    } catch (e) { return "none"; }
  }

  async function generateBuiltIn(opts) {
    let res;
    try {
      res = await fetch("api/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ topic: opts.topic, count: opts.count, difficulty: opts.difficulty, audience: opts.audience, language: opts.language, avoid: opts.avoid })
      });
    } catch (e) {
      throw new Error("Couldn't reach the word generator. Check your connection, or use the copy-and-paste option.");
    }
    let data = null;
    try { data = await res.json(); } catch (e) { /* handled below */ }
    if (!res.ok || !data || !Array.isArray(data.entries)) throw new Error((data && data.error) || `The word generator failed (${res.status}). Try again.`);
    return { category: data.category || "", icon: data.icon || "✨", entries: data.entries };
  }

  const api = { DEFAULT_MODEL, buildPrompt, parseAIReply, generateWithClaude, builtInStatus, generateBuiltIn };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.AI = api;
})(typeof window !== "undefined" ? window : globalThis);
