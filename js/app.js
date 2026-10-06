(function () {
  "use strict";

  /* ================================================================
   * Utilities
   * ================================================================ */
  const LS_KEY = "infiltrator.v1";
  const $app = document.getElementById("app");
  const $overlay = document.getElementById("overlay");

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const uid = () => Math.random().toString(36).slice(2, 9);
  const randInt = (n) => Math.floor(Math.random() * n);
  const pick = (a) => a[randInt(a.length)];
  const shuffle = (a) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = randInt(i + 1); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const plural = (n, one, many) => `${n} ${n === 1 ? one : (many || one + "s")}`;
  const norm = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "").replace(/(es|s)$/, "");
  const parseEntry = (e) => String(e).split("|").map((s) => s.trim()).filter(Boolean);

  /* ================================================================
   * Persistent data
   * ================================================================ */
  const DEFAULT_SETTINGS = {
    mode: "undercover", autoCounts: true, countMode: "auto", inf: 1, blank: 0, infPct: 20, blankPct: 0,
    vote: "anon", reveal: "role", who: "notFirst", knowRole: "no", hint: "off", guess: "yes",
    style: "clues", clueRounds: 1, timer: 0, length: "elim", starter: "random",
    twists: "off", revealMode: "hold", difficulty: "all", wordHints: "on", kamikaze: "on", sound: "on", avoidRepeats: "on", scoring: "on", theme: "auto"
  };

  function loadData() {
    let d = {};
    try { d = JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch (e) { d = {}; }
    return {
      players: Array.isArray(d.players) && d.players.length ? d.players : ["", "", "", ""].map(() => ({ id: uid(), name: "" })),
      useNames: d.useNames !== false,
      playerCount: d.playerCount || 5,
      groups: d.groups || [],
      activeGroup: d.activeGroup || null,
      settings: Object.assign({}, DEFAULT_SETTINGS, d.settings || {}, d.settings && !d.settings.countMode && d.settings.autoCounts === false ? { countMode: "exact" } : {}),
      lastImpostors: d.lastImpostors || [], // names of last game's impostors, so nobody is picked twice in a row
      packs: d.packs || {},        // custom categories: {id: {id,name,icon,words}}
      extras: d.extras || {},      // words added to built-in categories
      extraHints: d.extraHints || {}, // explanations for words players added to built-in categories
      enabled: d.enabled || {},    // category on/off
      recent: d.recent || [],
      scores: d.scores || {},
      ai: Object.assign({ key: "", model: "" }, d.ai || {}),
      game: d.game || null,
      seenIntro: !!d.seenIntro,
      lastPlayed: d.lastPlayed || 0
    };
  }
  let data = loadData();
  function save() { try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch (e) { /* storage unavailable */ } }

  /* Transient UI state (not saved) */
  const ui = { screen: "home", from: {}, step: 0, packId: null, help: {}, revealed: false, seen: false, peek: null, modal: null, ai: null, toast: null, timer: null, newGroupName: "", guessText: "", transfer: "" };
  let lastScreenKey = "";

  /* ================================================================
   * Word categories
   * ================================================================ */
  function allCategories() {
    const custom = Object.values(data.packs).map((p) => Object.assign({}, p, { custom: true }));
    const easy = window.EASY_PAIRS || {};
    const builtin = (window.BUILTIN_PACKS || []).map((c) => Object.assign({}, c, { builtin: true, base: c.words, easy: easy[c.id], words: c.words.concat(data.extras[c.id] || []) }));
    return custom.concat(builtin);
  }
  /* Entries a game can draw from. Easy mode uses the hand-picked easy pairs plus
   * anything the players added themselves (their own words are assumed known). */
  function playableWords(c) {
    if (data.settings.difficulty !== "easy" || c.custom || !c.easy || c.easy === "all") return c.words;
    return c.easy.concat(data.extras[c.id] || []);
  }
  /* One-line explanation of a word: the category's own (custom/AI packs),
   * then a category-specific built-in one ("music/Queen"), then the general one. */
  function hintFor(catId, word) {
    if (!word) return "";
    const pack = data.packs[catId];
    if (pack && pack.hints && pack.hints[word]) return pack.hints[word];
    const H = window.WORD_HINTS || {};
    return H[catId + "/" + word] || H[word] || data.extraHints[word] || "";
  }
  const getCategory = (id) => allCategories().find((c) => c.id === id);
  const isEnabled = (c) => (c.id in data.enabled ? data.enabled[c.id] : !c.off);
  const enabledCategories = () => allCategories().filter((c) => isEnabled(c) && playableWords(c).length);
  const totalEntries = () => allCategories().reduce((n, c) => n + c.words.length, 0);

  function pickWords(needPair) {
    const cats = enabledCategories();
    if (!cats.length) return null;
    const recent = new Set(data.settings.avoidRepeats === "on" ? data.recent : []);
    const keyOf = (c, e) => c.id + ":" + parseEntry(e)[0];
    let pool = cats.map((c) => ({ c, entries: playableWords(c).filter((e) => !recent.has(keyOf(c, e))) })).filter((x) => x.entries.length);
    if (!pool.length) { data.recent = []; pool = cats.map((c) => ({ c, entries: playableWords(c) })); }
    const { c, entries } = pick(pool);
    const entry = pick(entries);
    const group = parseEntry(entry);
    let civ = group[0], inf = null;
    if (needPair) {
      if (group.length > 1) { [civ, inf] = shuffle(group); }
      else {
        const others = playableWords(c).map((e) => parseEntry(e)[0]).filter((w) => w !== civ);
        inf = others.length ? pick(others) : civ;
      }
    }
    data.recent.push(keyOf(c, entry));
    if (data.recent.length > 250) data.recent = data.recent.slice(-250);
    return { civ, inf, civHint: hintFor(c.id, civ), infHint: hintFor(c.id, inf), category: c.name, icon: c.icon || "🗂️" };
  }

  /* ================================================================
   * Players, modes and role counts
   * ================================================================ */
  function currentPlayers() {
    if (!data.useNames) return Array.from({ length: data.playerCount }, (_, i) => ({ id: "p" + i, name: `Player ${i + 1}` }));
    return data.players.map((p, i) => ({ id: p.id, name: p.name.trim() || `Player ${i + 1}` }));
  }

  const MODES = {
    undercover: { name: "Undercover", tag: "Classic", desc: "Civilians share a secret word. Infiltrators get a similar one and have to blend in.", preset: { style: "clues", length: "elim", hint: "off", timer: 0 } },
    mrwhite: { name: "Mr. White", tag: "Bluff", desc: "One player gets no word at all and has to fake it from everyone else's clues.", preset: { style: "clues", length: "elim", hint: "off", timer: 0 } },
    mixed: { name: "Undercover + Mr. White", tag: "Chaos", desc: "Infiltrators and a Mr. White in the same game. Nobody can trust anybody.", preset: { style: "clues", length: "elim", hint: "off", timer: 0 } },
    spy: { name: "Spy", tag: "Spyfall-style", desc: "Everyone knows the word except the Spy. Ask each other questions, then vote once.", preset: { style: "questions", length: "single", hint: "category", timer: 300 } }
  };

  function recommend(n, mode) {
    if (mode === "spy" || mode === "mrwhite") return { inf: 0, blank: n >= 9 ? 2 : 1 };
    if (mode === "mixed") return n < 5 ? { inf: 1, blank: 0 } : { inf: n >= 10 ? 3 : n >= 7 ? 2 : 1, blank: n >= 11 ? 2 : 1 };
    return { inf: n >= 10 ? 3 : n >= 6 ? 2 : 1, blank: 0 };
  }
  /* Percentage mode: a share of the group, rounded, with at least one player
   * for any role whose share is above zero. */
  function pctCounts(n, infPct, blankPct) {
    let inf = Math.round((n * infPct) / 100), blank = Math.round((n * blankPct) / 100);
    if (infPct > 0 && inf === 0) inf = 1;
    if (blankPct > 0 && blank === 0) blank = 1;
    return { inf, blank };
  }
  function roleCounts() {
    const s = data.settings;
    const n = currentPlayers().length;
    if (s.countMode === "percent") return pctCounts(n, s.infPct, s.blankPct);
    if (s.countMode === "exact") return { inf: s.inf, blank: s.blank };
    return recommend(n, s.mode);
  }
  const blankName = (s) => (s.mode === "spy" ? "Spy" : "Mr. White");
  const roleLabel = (role, s) => (role === "civilian" ? "Civilian" : role === "infiltrator" ? "Infiltrator" : blankName(s));
  const bannedFirst = (s) => (s.who === "notFirst" ? 1 : s.who === "notFirstTwo" ? 2 : 0);

  function validateSetup() {
    const players = currentPlayers();
    const n = players.length;
    const s = data.settings;
    const { inf, blank } = roleCounts();
    if (n < 3) return "You need at least 3 players.";
    if (inf + blank < 1) return "Add at least one Infiltrator or " + blankName(s) + ".";
    if (n - inf - blank <= inf + blank) return `Too many impostors for ${n} players. Civilians must outnumber them.`;
    if (n - bannedFirst(s) < inf + blank) return "Not enough players to respect the “who can be an impostor” rule.";
    if (!enabledCategories().length) return "Turn on at least one word category.";
    if (data.useNames) {
      const names = players.map((p) => p.name.toLowerCase());
      if (new Set(names).size !== names.length) return "Two players have the same name. Make them unique so votes and scores stay clear.";
    }
    return null;
  }

  /* ================================================================
   * Game engine
   * ================================================================ */
  function newGame() {
    const s = Object.assign({}, data.settings);
    const players = currentPlayers();
    const n = players.length;
    let { inf, blank } = roleCounts();
    const planned = { inf, blank };

    let twist = null;
    if (s.twists === "on") {
      const r = Math.random();
      if (r < 0.06) twist = "none";
      else if (r < 0.12 && n - inf - blank - 1 > inf + blank + 1) twist = "extra";
    }
    if (twist === "none") { inf = 0; blank = 0; }
    if (twist === "extra") inf += 1;

    const startIdx = s.starter === "random" ? randInt(n) : 0;
    const order = players.map((_, i) => (startIdx + i) % n);
    // Last game's impostors go to the back of the queue, so they're only picked
    // again when there aren't enough other eligible players.
    const recent = new Set(data.lastImpostors || []);
    const pool = order.slice(bannedFirst(s));
    const eligible = shuffle(pool.filter((i) => !recent.has(players[i].name))).concat(shuffle(pool.filter((i) => recent.has(players[i].name))));
    const infSet = new Set(eligible.slice(0, inf));
    const blankSet = new Set(eligible.slice(inf, inf + blank));
    const words = pickWords(inf > 0 || planned.inf > 0);

    const game = {
      id: uid(), settings: s, planned, twist, words,
      players: players.map((p, i) => {
        const role = infSet.has(i) ? "infiltrator" : blankSet.has(i) ? "blank" : "civilian";
        return { id: p.id, name: p.name, role, word: role === "civilian" ? words.civ : role === "infiltrator" ? words.inf : null, alive: true, outRound: null };
      }),
      startId: players[startIdx].id, round: 1, phase: "deal", dealIdx: 0,
      vote: null, lastOut: null, guess: null, result: null, scope: data.activeGroup || "session"
    };
    data.game = game;
    data.lastImpostors = game.players.filter((p) => p.role !== "civilian").map((p) => p.name);
    save();
    ui.revealed = false; ui.seen = false; ui.peek = null;
    go("game");
    requestWakeLock();
    sfx("start");
  }

  const G = () => data.game;
  const playerById = (id) => G().players.find((p) => p.id === id);
  const alivePlayers = () => G().players.filter((p) => p.alive);

  function speakingOrder() {
    const g = G();
    const ps = g.players;
    let i = ps.findIndex((p) => p.id === g.startId);
    const out = [];
    for (let k = 0; k < ps.length; k++) { const p = ps[(i + k) % ps.length]; if (p.alive) out.push(p); }
    return out;
  }

  function checkWinner() {
    const alive = alivePlayers();
    const imp = alive.filter((p) => p.role !== "civilian").length;
    const civ = alive.length - imp;
    if (imp === 0) return "civilians";
    if (civ <= imp) return "impostors";
    return null;
  }

  function startVote() {
    const g = G();
    stopTimer();
    const alive = alivePlayers().map((p) => p.id);
    g.vote = { mode: g.settings.vote, candidates: alive, voters: alive, idx: 0, ballots: {}, stage: "pass" };
    g.phase = "vote";
    save(); render();
  }

  function tally() {
    const g = G();
    const counts = {};
    g.vote.candidates.forEach((id) => (counts[id] = 0));
    Object.values(g.vote.ballots).forEach((t) => { if (t in counts) counts[t]++; });
    const max = Math.max(...Object.values(counts));
    const top = Object.keys(counts).filter((id) => counts[id] === max);
    return { counts, max, top };
  }

  function eliminate(id) {
    const g = G();
    const p = playerById(id);
    p.alive = false; p.outRound = g.round;
    g.lastOut = id; g.guess = null; ui.guessText = ""; g.outCause = "vote"; g.kami = null;
    if (g.twist === "none") return finish("twist");
    g.phase = "reveal";
    save(); render();
    sfx(p.role === "civilian" ? "civilianOut" : "impostorOut");
  }

  function noElimination() {
    const g = G();
    if (g.settings.length === "single") return finish("impostors", null, "Nobody was voted out, so the impostors slipped away.");
    nextRound();
  }

  /* Who gets a last-chance guess at the civilians' word when they go out:
   * Mr. White / Spy when the setting allows it, and any impostor caught by a kamikaze. */
  function canGuess(p) {
    const g = G();
    if (p.role === "blank" && g.settings.guess === "yes") return true;
    return g.outCause === "kamikaze" && !!g.kami && g.kami.correct && p.id === g.kami.target && p.role !== "civilian";
  }

  /* Kamikaze: one player bets their life on an accusation. Right → the impostor is out
   * (and may guess the word). Wrong → the kamikaze player is out instead. */
  function resolveKamikaze(byId, targetId) {
    const g = G();
    const by = playerById(byId), target = playerById(targetId);
    const correct = target.role !== "civilian";
    const victim = correct ? target : by;
    victim.alive = false; victim.outRound = g.round;
    g.kami = { by: byId, target: targetId, correct, stage: "done" };
    g.lastOut = victim.id; g.outCause = "kamikaze"; g.guess = null; ui.guessText = "";
    if (correct) (g.kamiHeroes = g.kamiHeroes || []).push(byId);
    if (g.twist === "none") return finish("twist");
    g.phase = "kamiReveal";
    save(); render();
    sfx(correct ? "impostorOut" : "civilianOut"); vibrate([80, 60, 200]);
  }

  function afterKamikaze() {
    const g = G();
    const p = playerById(g.lastOut);
    if (g.settings.length === "single" && p.role !== "civilian") return finish("civilians");
    const w = checkWinner();
    if (w) return finish(w);
    g.phase = "play"; g.kami = null; g.outCause = null;
    save(); render();
  }

  function afterElimination() {
    const g = G();
    if (g.outCause === "kamikaze") return afterKamikaze();
    const p = playerById(g.lastOut);
    if (g.settings.length === "single") return finish(p.role === "civilian" ? "impostors" : "civilians");
    const w = checkWinner();
    if (w) return finish(w);
    nextRound();
  }

  function nextRound() {
    const g = G();
    g.round += 1;
    const ps = g.players;
    const i = ps.findIndex((p) => p.id === g.startId);
    for (let k = 1; k <= ps.length; k++) { const p = ps[(i + k) % ps.length]; if (p.alive) { g.startId = p.id; break; } }
    g.phase = "play"; g.vote = null;
    ui.timer = null;
    save(); render();
  }

  const POINTS = { civilian: 2, infiltrator: 10, blank: 6, blankGuess: 12, twist: 1, kamikaze: 3 };

  function finish(winner, byId, note) {
    const g = G();
    stopTimer();
    const pts = {};
    g.players.forEach((p) => {
      let v = 0;
      if (winner === "civilians" && p.role === "civilian") v = POINTS.civilian;
      if (winner === "impostors" && p.role === "infiltrator") v = POINTS.infiltrator;
      if (winner === "impostors" && p.role === "blank") v = POINTS.blank;
      if (winner === "mrwhite" && p.id === byId) v = POINTS.blankGuess;
      if (winner === "twist" && p.id !== g.lastOut) v = POINTS.twist;
      (g.kamiHeroes || []).forEach((id) => { if (id === p.id) v += POINTS.kamikaze; });
      pts[p.id] = v;
    });
    g.result = { winner, byId: byId || null, note: note || "", points: pts };
    g.phase = "end";
    if (g.settings.scoring === "on") {
      const board = data.scores[g.scope] || (data.scores[g.scope] = {});
      g.players.forEach((p) => { board[p.name] = (board[p.name] || 0) + pts[p.id]; });
    }
    save(); render();
    sfx("win");
    confetti();
  }

  /* ================================================================
   * Timer, sound, haptics, effects
   * ================================================================ */
  let timerInt = null;
  function ensureTimer() {
    const total = Number(G().settings.timer) || 0;
    if (!ui.timer || ui.timer.round !== G().round) ui.timer = { round: G().round, total, left: total, running: false, last: 0 };
  }
  function startTimer() {
    ensureTimer();
    if (ui.timer.left <= 0) ui.timer.left = ui.timer.total;
    ui.timer.running = true; ui.timer.last = Date.now();
    clearInterval(timerInt); timerInt = setInterval(tick, 200);
    updateTimerDom();
  }
  function stopTimer() { clearInterval(timerInt); timerInt = null; if (ui.timer) ui.timer.running = false; }
  function tick() {
    const t = ui.timer; if (!t) return;
    const now = Date.now();
    const before = Math.ceil(t.left);
    t.left -= (now - t.last) / 1000; t.last = now;
    const after = Math.ceil(t.left);
    if (after !== before && after <= 5 && after > 0) sfx("tick");
    if (t.left <= 0) { t.left = 0; stopTimer(); sfx("alarm"); vibrate([300, 120, 300, 120, 500]); }
    updateTimerDom();
  }
  const fmtTime = (s) => { s = Math.max(0, Math.ceil(s)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
  function updateTimerDom() {
    const el = document.getElementById("timer-face");
    if (!el || !ui.timer) return;
    el.textContent = fmtTime(ui.timer.left);
    el.classList.toggle("is-low", ui.timer.left <= 10 && ui.timer.left > 0);
    el.classList.toggle("is-done", ui.timer.left <= 0);
    const ring = document.getElementById("timer-ring");
    if (ring && ui.timer.total) ring.style.setProperty("--p", String(ui.timer.left / ui.timer.total));
    const btn = document.getElementById("timer-toggle");
    if (btn) btn.textContent = ui.timer.running ? "Pause" : ui.timer.left <= 0 ? "Restart" : ui.timer.left < ui.timer.total ? "Resume" : "Start timer";
  }

  let actx = null;
  function tone(freq, dur, type, vol, delay) {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === "suspended") actx.resume();
      const t0 = actx.currentTime + (delay || 0);
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = type || "sine"; o.frequency.setValueAtTime(freq, t0);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(vol || 0.15, t0 + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      o.connect(g); g.connect(actx.destination); o.start(t0); o.stop(t0 + dur + 0.05);
    } catch (e) { /* audio unavailable */ }
  }
  function sfx(name) {
    if (data.settings.sound !== "on") return;
    const S = {
      tap: () => tone(520, 0.06, "triangle", 0.06),
      reveal: () => { tone(330, 0.12, "sine", 0.1); tone(495, 0.18, "sine", 0.1, 0.08); },
      start: () => [392, 523, 659].forEach((f, i) => tone(f, 0.18, "triangle", 0.1, i * 0.09)),
      tick: () => tone(880, 0.08, "square", 0.05),
      alarm: () => [0, 0.25, 0.5].forEach((d) => tone(740, 0.2, "sawtooth", 0.12, d)),
      civilianOut: () => { tone(300, 0.3, "sawtooth", 0.08); tone(200, 0.4, "sawtooth", 0.08, 0.2); },
      impostorOut: () => [523, 659, 784].forEach((f, i) => tone(f, 0.16, "triangle", 0.1, i * 0.1)),
      win: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.25, "triangle", 0.1, i * 0.12))
    };
    (S[name] || S.tap)();
  }
  function vibrate(p) { try { if (data.settings.sound === "on" && navigator.vibrate) navigator.vibrate(p); } catch (e) { /* not supported */ } }
  function requestWakeLock() { try { navigator.wakeLock && navigator.wakeLock.request("screen").catch(() => {}); } catch (e) { /* not supported */ } }

  function confetti() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = document.createElement("canvas");
    c.className = "confetti";
    document.body.appendChild(c);
    const ctx = c.getContext("2d");
    const W = (c.width = innerWidth * devicePixelRatio), H = (c.height = innerHeight * devicePixelRatio);
    const colors = ["#f2c14e", "#ff5a5f", "#5cc8ff", "#f4f1e8", "#7ee3a5"];
    const parts = Array.from({ length: 140 }, () => ({ x: Math.random() * W, y: -Math.random() * H * 0.5, vx: (Math.random() - 0.5) * 6, vy: 4 + Math.random() * 6, r: 4 + Math.random() * 8, a: Math.random() * 6, va: (Math.random() - 0.5) * 0.3, c: pick(colors) }));
    const t0 = performance.now();
    (function frame(t) {
      ctx.clearRect(0, 0, W, H);
      parts.forEach((p) => { p.x += p.vx; p.y += p.vy; p.vy += 0.08; p.a += p.va; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.c; ctx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); ctx.restore(); });
      if (t - t0 < 3200) requestAnimationFrame(frame); else c.remove();
    })(t0);
  }

  /* ================================================================
   * Rendering helpers
   * ================================================================ */
  function topbar(title, backAct, right) {
    return `<header class="bar">
      ${backAct ? `<button class="icon-btn" data-act="${backAct}" aria-label="Back">←</button>` : `<span class="icon-btn is-ghost"></span>`}
      <h1 class="bar-title">${esc(title)}</h1>
      ${right || `<span class="icon-btn is-ghost"></span>`}
    </header>`;
  }
  function seg(key, options, value, act) {
    return `<div class="seg" role="radiogroup">${options.map(([v, label, sub]) => `
      <button type="button" role="radio" aria-checked="${String(v) === String(value)}" class="seg-opt${String(v) === String(value) ? " is-on" : ""}" data-act="${act || "set"}" data-key="${key}" data-val="${esc(v)}">
        <span class="seg-label">${esc(label)}</span>${sub ? `<span class="seg-sub">${esc(sub)}</span>` : ""}
      </button>`).join("")}</div>`;
  }
  function helpBtn(id) { return `<button type="button" class="help-btn${ui.help[id] ? " is-open" : ""}" data-act="help" data-id="${id}" aria-label="Explain this setting" aria-expanded="${!!ui.help[id]}">?</button>`; }
  function helpText(id, text) { return ui.help[id] ? `<p class="help-text">${text}</p>` : ""; }
  function toggle(act, on, attrs) { return `<button type="button" class="switch${on ? " is-on" : ""}" role="switch" aria-checked="${!!on}" data-act="${act}" ${attrs || ""}><span></span></button>`; }

  /* ================================================================
   * Screens
   * ================================================================ */
  const SCREENS = {};

  SCREENS.home = () => {
    const g = data.game;
    const inProgress = g && g.phase !== "end";
    const cats = allCategories().length;
    return `<main class="home">
      <section class="hero">
        <p class="eyebrow">Case file · pass-the-phone party game</p>
        <h1 class="logo"><span>INFIL</span><span class="redact">TRATOR</span></h1>
        <p class="tagline">Everyone gets a secret word. Somebody's word is different. Find them before they find out.</p>
      </section>
      <div class="stack">
        ${inProgress ? `<button class="btn btn-primary btn-xl" data-act="resume">Resume game <small>Round ${g.round} · ${alivePlayers().length} players left</small></button>` : ""}
        <button class="btn ${inProgress ? "btn-ghost" : "btn-primary"} btn-xl" data-act="newSetup">New game</button>
        ${!inProgress && validateSetup() === null && data.lastPlayed ? `<button class="btn btn-ghost" data-act="quickStart">Rematch with last setup</button>` : ""}
      </div>
      <nav class="home-grid">
        <button class="tile" data-act="go" data-to="packs"><span class="tile-k">${cats}</span><span class="tile-l">Word packs</span><span class="tile-s">Add your own or make them with AI</span></button>
        <button class="tile" data-act="go" data-to="howto"><span class="tile-k">?</span><span class="tile-l">How to play</span><span class="tile-s">Rules, roles, modes and tips</span></button>
        <button class="tile" data-act="go" data-to="scores"><span class="tile-k">#</span><span class="tile-l">Groups &amp; scores</span><span class="tile-s">Saved crews and leaderboards</span></button>
      </nav>
      <p class="fineprint">${totalEntries()} word sets in ${cats} categories · free · works offline · nothing leaves your phone</p>
    </main>`;
  };

  /* ---------------- Setup wizard ---------------- */
  const STEPS = ["Players", "Mode", "Words", "Rules"];

  SCREENS.setup = () => {
    const body = [setupPlayers, setupMode, setupWords, setupRules][ui.step]();
    const err = ui.step === 3 ? validateSetup() : null;
    return `${topbar("New game", "setupBack")}
      <ol class="steps">${STEPS.map((s, i) => `<li class="${i === ui.step ? "is-on" : i < ui.step ? "is-done" : ""}"><button data-act="step" data-i="${i}">${i + 1}. ${s}</button></li>`).join("")}</ol>
      <main class="page">${body}</main>
      <footer class="dock">
        ${err ? `<p class="dock-err">${esc(err)}</p>` : ""}
        <div class="dock-row">
          <button class="btn btn-ghost" data-act="setupBack">${ui.step === 0 ? "Home" : "Back"}</button>
          ${ui.step < 3 ? `<button class="btn btn-primary" data-act="setupNext">Next: ${STEPS[ui.step + 1]}</button>`
            : `<button class="btn btn-primary" data-act="start" ${err ? "disabled" : ""}>Deal the cards</button>`}
        </div>
      </footer>`;
  };

  function setupPlayers() {
    const groups = data.groups;
    const active = groups.find((g) => g.id === data.activeGroup);
    const n = currentPlayers().length;
    const changed = active && JSON.stringify(active.players) !== JSON.stringify(data.players.map((p) => p.name.trim()));
    return `<section class="card">
      <div class="row-between"><h2 class="h2">Who's playing?</h2><span class="count-pill">${plural(n, "player")}</span></div>
      ${groups.length ? `<p class="label">Your groups</p>
        <div class="chips">${groups.map((g) => `<button class="chip${g.id === data.activeGroup ? " is-on" : ""}" data-act="loadGroup" data-id="${g.id}">${esc(g.name)} <small>${g.players.length}</small></button>`).join("")}
        ${data.activeGroup ? `<button class="chip chip-quiet" data-act="clearGroup">No group</button>` : ""}</div>` : ""}
      <div class="row-between toggle-row">
        <div><p class="strong">Use player names</p><p class="muted small">Off = just “Player 1, Player 2…”</p></div>
        ${toggle("toggleNames", data.useNames)}
      </div>
    </section>
    ${data.useNames ? `<section class="card">
      <ol class="name-list">${data.players.map((p, i) => `<li>
        <span class="seat">${i + 1}</span>
        <input class="input" id="name-${p.id}" data-input="name" data-id="${p.id}" value="${esc(p.name)}" placeholder="Player ${i + 1}" maxlength="24" autocomplete="off" enterkeyhint="next">
        <button class="icon-btn small" data-act="moveUp" data-id="${p.id}" aria-label="Move up" ${i === 0 ? "disabled" : ""}>↑</button>
        <button class="icon-btn small" data-act="removePlayer" data-id="${p.id}" aria-label="Remove">✕</button>
      </li>`).join("")}</ol>
      <div class="row-gap">
        <button class="btn btn-ghost" data-act="addPlayer">+ Add player</button>
        <button class="btn btn-quiet" data-act="shufflePlayers">Shuffle seats</button>
      </div>
      <p class="muted small">Seat order matters: the phone is passed in this order and the speaking order follows it.</p>
    </section>
    <section class="card">
      ${active ? `<p class="small">Playing as <strong>${esc(active.name)}</strong>. Scores go to this group.</p>
        ${changed ? `<button class="btn btn-ghost" data-act="updateGroup">Save changes to “${esc(active.name)}”</button>` : ""}` : ""}
      <p class="label">Save these players as a group</p>
      <div class="row-gap">
        <input class="input" id="new-group" data-input="newGroupName" value="${esc(ui.newGroupName)}" placeholder="e.g. Friday crew" maxlength="30">
        <button class="btn btn-ghost" data-act="saveGroup">Save</button>
      </div>
    </section>` : `<section class="card">
      <p class="label">Number of players</p>
      <div class="stepper big">
        <button data-act="count" data-d="-1" aria-label="Fewer players">−</button>
        <output>${data.playerCount}</output>
        <button data-act="count" data-d="1" aria-label="More players">+</button>
      </div>
    </section>`}`;
  }

  function setupMode() {
    const s = data.settings;
    const n = currentPlayers().length;
    const { inf, blank } = roleCounts();
    const civ = Math.max(0, n - inf - blank);
    return `<section class="stack">
      ${Object.entries(MODES).map(([k, m]) => `<button class="mode${s.mode === k ? " is-on" : ""}" data-act="mode" data-val="${k}">
        <span class="mode-top"><span class="mode-name">${m.name}</span><span class="mode-tag">${m.tag}</span></span>
        <span class="mode-desc">${m.desc}</span>
      </button>`).join("")}
    </section>
    <section class="card">
      <div class="row-between"><h2 class="h2">Roles</h2>${helpBtn("roles")}</div>
      ${helpText("roles", "<b>Civilians</b> all get the same word. <b>Infiltrators</b> get a similar but different word (Coffee vs Tea). <b>" + blankName(s) + "</b> gets no word at all. Infiltrators and " + blankName(s) + " are the impostors. Pick <b>Suggested</b> for sensible numbers, <b>Exact number</b> to choose yourself, or <b>Percentage</b> to set a share of the group that scales with how many are playing.")}
      <p class="label">How many impostors?</p>
      ${seg("countMode", [["auto", "Suggested"], ["exact", "Exact number"], ["percent", "Percentage"]], s.countMode, "countMode")}
      ${s.countMode === "percent" ? `
      <div class="role-row"><div><p class="strong">Infiltrators</p><p class="muted small">Similar word · ${plural(inf, "player")}</p></div>
        <div class="stepper"><button data-act="pct" data-key="infPct" data-d="-5" aria-label="Fewer Infiltrators">−</button><output>${s.infPct}%</output><button data-act="pct" data-key="infPct" data-d="5" aria-label="More Infiltrators">+</button></div></div>
      <div class="role-row"><div><p class="strong">${blankName(s)}</p><p class="muted small">No word · ${plural(blank, "player")}</p></div>
        <div class="stepper"><button data-act="pct" data-key="blankPct" data-d="-5" aria-label="Fewer ${blankName(s)}">−</button><output>${s.blankPct}%</output><button data-act="pct" data-key="blankPct" data-d="5" aria-label="More ${blankName(s)}">+</button></div></div>
      <p class="muted small">Percent of the group, so it scales when people join or leave. Any share above 0% means at least one player.</p>` : `
      <div class="role-row"><div><p class="strong">Infiltrators</p><p class="muted small">Similar word</p></div>
        ${s.countMode === "exact" ? `<div class="stepper"><button data-act="roleCount" data-key="inf" data-d="-1" aria-label="Fewer Infiltrators">−</button><output>${inf}</output><button data-act="roleCount" data-key="inf" data-d="1" aria-label="More Infiltrators">+</button></div>` : `<output class="count-out">${inf}</output>`}</div>
      <div class="role-row"><div><p class="strong">${blankName(s)}</p><p class="muted small">No word</p></div>
        ${s.countMode === "exact" ? `<div class="stepper"><button data-act="roleCount" data-key="blank" data-d="-1" aria-label="Fewer ${blankName(s)}">−</button><output>${blank}</output><button data-act="roleCount" data-key="blank" data-d="1" aria-label="More ${blankName(s)}">+</button></div>` : `<output class="count-out">${blank}</output>`}</div>`}
      <div class="composition">${Array.from({ length: civ }, () => `<i class="dot civ"></i>`).join("")}${Array.from({ length: inf }, () => `<i class="dot inf"></i>`).join("")}${Array.from({ length: blank }, () => `<i class="dot blank"></i>`).join("")}</div>
      <p class="small">${plural(civ, "Civilian")} · ${plural(inf, "Infiltrator")} · ${blank} ${blankName(s)}</p>
      ${inf + blank > 0 && civ <= inf + blank ? `<p class="dock-err">Too many impostors for ${n} players. Civilians must outnumber them, so lower the numbers.</p>` : ""}
      ${s.countMode === "auto" ? `<p class="muted small">Suggested for ${n} players.</p>` : ""}
      <p class="muted small">🔁 Nobody is an impostor two games in a row (unless the group is too small to avoid it).</p>
    </section>`;
  }

  function setupWords() {
    const cats = allCategories();
    const on = cats.filter(isEnabled);
    const entries = on.reduce((n, c) => n + playableWords(c).length, 0);
    return `<section class="card">
      <div class="row-between"><h2 class="h2">Word difficulty</h2>${helpBtn("difficulty")}</div>
      ${helpText("difficulty", "<b>Everyday words</b> only uses pairs where both words are things almost anyone knows, like Coffee / Tea or Hot Pot / Dumplings. Great for mixed groups, different countries and first games. <b>All words</b> adds harder and niche ones like Malatang or Silly Point. Words you added yourself are always included.")}
      ${seg("difficulty", [["easy", "Everyday words", "Everyone knows them"], ["all", "All words", "Harder and niche too"]], data.settings.difficulty)}
    </section>
    <section class="card">
      <div class="row-between"><h2 class="h2">Word categories</h2><span class="count-pill">${entries} sets</span></div>
      <p class="muted small">A random word is drawn from the categories that are on.</p>
      <div class="row-gap"><button class="btn btn-quiet" data-act="allCats" data-val="1">All on</button><button class="btn btn-quiet" data-act="allCats" data-val="0">All off</button></div>
      <div class="cat-grid">${cats.map((c) => `<button class="cat${isEnabled(c) ? " is-on" : ""}" data-act="toggleCat" data-id="${c.id}" aria-pressed="${isEnabled(c)}">
        <span class="cat-icon">${esc(c.icon || "🗂️")}</span><span class="cat-name">${esc(c.name)}</span><span class="cat-n">${playableWords(c).length}${c.custom ? " · yours" : ""}</span>
      </button>`).join("")}</div>
    </section>
    <section class="card row-between">
      <div><p class="strong">Want your own words?</p><p class="muted small">Create categories, paste lists, or generate them with AI.</p></div>
      <button class="btn btn-ghost" data-act="go" data-to="packs">Manage</button>
    </section>`;
  }

  const STYLES = {
    clues: { name: "One-word clues", how: "Going around in order, each player says ONE word about their secret word. Too obvious and the impostors catch on; too vague and you look guilty.", turns: true },
    sentence: { name: "One sentence", how: "Going around in order, each player describes their word in one short sentence without saying it.", turns: true },
    questions: { name: "Questions", how: "The first player asks anyone a question about the word. Whoever answers asks the next question to someone else (no asking straight back). Keep going until the timer ends or someone calls a vote.", turns: false },
    free: { name: "Free talk", how: "No turns. Talk about the word, accuse, defend, bluff. Vote when the timer ends or when everyone is ready.", turns: false },
    act: { name: "Act it out", how: "Going around in order, each player does a short mime of their word. No sounds and no words.", turns: true },
    draw: { name: "Draw it", how: "On one shared sheet of paper, each player in turn adds ONE line to a drawing of the word without lifting the pen.", turns: true }
  };

  const RULES = [
    { section: "Voting" },
    { key: "vote", title: "How do you prefer to vote?", help: "<b>Anonymous:</b> the phone goes around and everyone taps their vote in secret, then the app counts. <b>Real-life:</b> everyone points at a suspect on the count of 3 and you tap who got the most votes. Faster, louder.",
      options: [["anon", "Anonymous vote", "Pass the phone"], ["live", "Real-life vote", "Faster"]] },
    { key: "kamikaze", title: "Kamikaze button", help: "During a round, any player can tap <b>💥 Kamikaze</b> and bet their life on an accusation. If the suspect is an impostor, the impostor is out straight away and gets one last guess at the civilians' word (a correct guess steals the win). If the suspect is a Civilian, the kamikaze player is out instead. A correct kamikaze is worth +3 points.",
      options: [["on", "On"], ["off", "Off"]] },
    { key: "reveal", title: "When someone is voted out…", help: "Revealing the role gives civilians information. Keeping it secret makes later rounds much more paranoid.",
      options: [["role", "Reveal their role"], ["hidden", "Keep it secret"]] },
    { section: "Roles" },
    { key: "who", title: "Who can be an impostor?", help: "The first speaker has no clues to copy from, which is brutal for an impostor. Protecting the first one or two seats keeps it fair.",
      options: [["any", "Anyone"], ["notFirst", "Not the first player"], ["notFirstTwo", "Not the first two players"]] },
    { key: "wordHints", title: "Explain the word on each card", help: "Shows a one-line description under the secret word, like <b>Malatang: spicy soup where you pick your own skewers</b>. Handy when not everyone knows every word. Mr. White still gets nothing.",
      options: [["on", "Yes, explain it"], ["off", "No, just the word"]] },
    { key: "knowRole", title: "Do Infiltrators know they are Infiltrators?", when: () => roleCounts().inf > 0, help: "<b>Yes:</b> their card says Infiltrator, so they know to blend in. <b>No:</b> everyone just sees a word, and Infiltrators have to work out from the clues that their word is the odd one out.",
      options: [["yes", "Yes, they should know"], ["no", "No, keep it a secret"]] },
    { key: "hint", title: () => `Hint for ${blankName(data.settings)}`, when: () => roleCounts().blank > 0, help: () => `Gives the player with no word a small head start. With <b>letter count</b> they also see how long the word is.`,
      options: [["off", "No hint"], ["category", "Show category"], ["letters", "Category + letters"]] },
    { key: "guess", title: () => `${blankName(data.settings)} gets a last guess`, when: () => roleCounts().blank > 0, help: () => `When ${blankName(data.settings)} is voted out they can guess the civilians' word. A correct guess steals the win.`,
      options: [["yes", "Yes"], ["no", "No"]] },
    { section: "Rounds" },
    { key: "style", title: "How do you play a round?", help: () => Object.values(STYLES).map((s) => `<b>${s.name}:</b> ${s.how}`).join("<br>"),
      options: Object.entries(STYLES).map(([k, s]) => [k, s.name]) },
    { key: "clueRounds", title: "Turns before each vote", when: () => STYLES[data.settings.style].turns, help: "How many times you go around the circle before voting. Two rounds gives impostors more chances to slip up.",
      options: [[1, "1 lap"], [2, "2 laps"], [3, "3 laps"]] },
    { key: "timer", title: "Discussion timer", help: "A countdown you can start during the round. It buzzes at zero. Off means you vote whenever you're ready.",
      options: [[0, "Off"], [30, "30s"], [60, "1 min"], [120, "2 min"], [180, "3 min"], [300, "5 min"], [480, "8 min"]] },
    { key: "length", title: "How long is a game?", help: "<b>Until a team wins:</b> keep voting players out round after round. Civilians win when every impostor is out; impostors win when they equal or outnumber the civilians. <b>One vote:</b> a single vote decides everything, Spyfall style.",
      options: [["elim", "Until a team wins"], ["single", "One vote decides"]] },
    { key: "starter", title: "Who speaks first?", help: "Random keeps people from always going first. Seat order starts with the first name in the list.",
      options: [["random", "Random"], ["first", "First in the list"]] },
    { section: "Extras" },
    { key: "twists", title: "Surprise twists", help: "Now and then the game secretly breaks the rules: sometimes there are <b>no impostors at all</b>, sometimes there is <b>one extra Infiltrator</b>. Revealed at the end.",
      options: [["off", "Off"], ["on", "On"]] },
    { key: "revealMode", title: "Revealing your card", help: "Hold-to-reveal hides the word the moment you let go, so nobody peeks over your shoulder.",
      options: [["hold", "Hold to reveal"], ["tap", "Tap to flip"]] },
    { key: "scoring", title: "Keep score", help: `Civilians +${POINTS.civilian} each when they win. Infiltrators +${POINTS.infiltrator} and Mr. White +${POINTS.blank} when the impostors win. Mr. White +${POINTS.blankGuess} for guessing the word.`,
      options: [["on", "On"], ["off", "Off"]] },
    { key: "avoidRepeats", title: "Avoid repeated words", help: "Remembers the last 250 words drawn on this device and skips them.",
      options: [["on", "On"], ["off", "Off"]] },
    { key: "sound", title: "Sound and vibration", options: [["on", "On"], ["off", "Off"]] },
    { key: "theme", title: "Theme", options: [["auto", "Match device"], ["dark", "Night ops"], ["light", "Manila folder"]] }
  ];
  const val = (x) => (typeof x === "function" ? x() : x);

  function setupRules() {
    const s = data.settings;
    let html = "";
    RULES.forEach((r) => {
      if (r.section) { html += `<h2 class="section-h">${r.section}</h2>`; return; }
      if (r.when && !r.when()) return;
      html += `<section class="setting">
        <div class="row-between"><h3 class="setting-title">${esc(val(r.title))}</h3>${r.help ? helpBtn(r.key) : ""}</div>
        ${r.help ? helpText(r.key, val(r.help)) : ""}
        ${seg(r.key, r.options, s[r.key])}
      </section>`;
    });
    return `<p class="muted small">Every setting has a <b>?</b> that explains it. The defaults are a good start.</p>${html}`;
  }

  /* ---------------- In-game ---------------- */
  SCREENS.game = () => {
    const g = G();
    if (!g) return SCREENS.home();
    const fn = { deal: gameDeal, play: gamePlay, vote: gameVote, tally: gameTally, reveal: gameReveal, guess: gameGuess, guessResult: gameGuessResult, kamikaze: gameKamikaze, kamiReveal: gameKamiReveal, end: gameEnd }[g.phase];
    return fn();
  };

  function cardFace(p, g) {
    const s = g.settings;
    const known = s.knowRole === "yes" || g.planned.inf === 0;
    if (p.role === "blank") {
      let hint = "";
      if (s.hint !== "off") hint += `<p class="card-hint">Category: <b>${esc(g.words.category)}</b></p>`;
      if (s.hint === "letters") hint += `<p class="card-hint">Letters: <b>${esc(g.words.civ.split(/\s+/).map((w) => w.replace(/[^\p{L}\p{N}]/gu, "").length).join(" + "))}</b></p>`;
      return `<p class="stamp stamp-blank">${esc(blankName(s))}</p>
        <p class="secret-word is-none">No word</p>
        ${hint}
        <p class="card-note">You don't know the word. Listen to the others and bluff your way through.${s.guess === "yes" ? " If you're caught, you get one guess at the word." : ""}</p>`;
    }
    const isInf = p.role === "infiltrator";
    const stamp = known ? `<p class="stamp ${isInf ? "stamp-inf" : "stamp-civ"}">${isInf ? "Infiltrator" : g.planned.inf === 0 ? "Not the " + blankName(s) : "Civilian"}</p>` : `<p class="stamp stamp-plain">Your secret word</p>`;
    const note = known
      ? (isInf ? "Your word is close to everyone else's, but not the same. Blend in and don't get caught." : "Find the impostors. Keep your clues subtle so they can't copy you.")
      : "Most players share this word. Someone might not. Is it you?";
    const desc = s.wordHints !== "off" ? (isInf ? g.words.infHint : g.words.civHint) : "";
    return `${stamp}<p class="secret-word${p.word.length > 14 ? " is-long" : ""}">${esc(p.word)}</p>${desc ? `<p class="word-desc">${esc(desc)}</p>` : ""}<p class="card-note">${note}</p>`;
  }

  function revealCard(p, g) {
    const hold = g.settings.revealMode === "hold";
    return `<div class="dossier${ui.revealed ? " is-open" : ""}" id="dossier" ${hold ? "data-hold" : `data-act="flip"`} role="button" tabindex="0" aria-label="${hold ? "Hold to reveal your card" : "Tap to reveal your card"}">
      <div class="dossier-cover">
        <span class="dossier-tab">FILE · ${esc(p.name)}</span>
        <span class="dossier-classified">CLASSIFIED</span>
        <span class="dossier-cta">${hold ? "Press and hold to read" : "Tap to open"}</span>
      </div>
      <div class="dossier-inside">${cardFace(p, g)}</div>
    </div>`;
  }

  function gameDeal() {
    const g = G();
    const p = g.players[g.dealIdx];
    const last = g.dealIdx === g.players.length - 1;
    return `${topbar(`Card ${g.dealIdx + 1} of ${g.players.length}`, "quitGame")}
      <main class="page deal">
        <p class="eyebrow center">Pass the phone to</p>
        <h2 class="pass-name">${esc(p.name)}</h2>
        ${revealCard(p, g)}
        <p class="muted small center">${g.settings.revealMode === "hold" ? "Only you should see this. Let go to hide it." : "Only you should see this. Tap again to close."}</p>
      </main>
      <footer class="dock"><div class="dock-row">
        <button class="btn btn-primary" id="deal-next" data-act="dealNext" ${ui.seen ? "" : "disabled"}>${last ? "Everyone's seen their card" : "Hide &amp; pass to " + esc(g.players[g.dealIdx + 1].name)}</button>
      </div></footer>`;
  }

  function gamePlay() {
    const g = G();
    const s = g.settings;
    const style = STYLES[s.style];
    const order = speakingOrder();
    ensureTimer();
    const t = ui.timer;
    const imp = alivePlayers().filter((p) => p.role !== "civilian");
    return `${topbar(`Round ${g.round}`, "quitGame", `<button class="icon-btn" data-act="go" data-to="howto" aria-label="Rules">?</button>`)}
      <main class="page">
        <section class="card brief">
          <p class="eyebrow">${esc(style.name)}${style.turns ? ` · ${plural(Number(s.clueRounds), "lap")}` : ""}</p>
          <p>${esc(style.how)}</p>
          ${s.style === "questions" ? `<button class="btn btn-quiet" data-act="question">Need a question idea?</button>${ui.question ? `<p class="question">“${esc(ui.question)}”</p>` : ""}` : ""}
        </section>
        ${t.total ? `<section class="timer">
          <div class="timer-ring" id="timer-ring" style="--p:${t.left / t.total}"><span id="timer-face" class="timer-face">${fmtTime(t.left)}</span></div>
          <div class="row-gap center">
            <button class="btn btn-ghost" id="timer-toggle" data-act="timerToggle">${t.running ? "Pause" : t.left <= 0 ? "Restart" : t.left < t.total ? "Resume" : "Start timer"}</button>
            <button class="btn btn-quiet" data-act="timerAdd">+30s</button>
          </div>
        </section>` : ""}
        <section class="card">
          <div class="row-between"><h2 class="h2">Speaking order</h2><span class="count-pill">${plural(order.length, "player")} left</span></div>
          <ol class="order">${order.map((p, i) => `<li class="${i === 0 ? "is-first" : ""}"><span class="seat">${i + 1}</span>${esc(p.name)}${i === 0 ? `<span class="tag">starts</span>` : ""}</li>`).join("")}</ol>
          ${g.players.some((p) => !p.alive) ? `<p class="muted small">Out: ${g.players.filter((p) => !p.alive).map((p) => esc(p.name) + (s.reveal === "role" || p.role === "blank" ? ` (${roleLabel(p.role, s)})` : "")).join(", ")}</p>` : ""}
          ${s.reveal === "role" && s.length === "elim" ? `<p class="muted small">Impostors still hiding: <b>${imp.length}</b></p>` : ""}
        </section>
        <button class="btn btn-quiet" data-act="peek">Forgot your word? Peek again</button>
      </main>
      <footer class="dock"><div class="dock-row">
        ${s.kamikaze !== "off" && alivePlayers().length > 2 ? `<button class="btn btn-kamikaze" data-act="kamikaze" aria-label="Kamikaze: bet your life on an accusation">💥 Kamikaze</button>` : ""}
        <button class="btn btn-primary" data-act="startVote">Time to vote</button>
      </div></footer>`;
  }

  function gameVote() {
    const g = G();
    const v = g.vote;
    const s = g.settings;
    if (v.mode === "live") {
      return `${topbar("Vote", "backToPlay")}
        <main class="page">
          <section class="card brief"><p class="eyebrow">Real-life vote</p><p>Count down from 3 and everyone points at their suspect. Tap the player with the most votes.</p></section>
          <div class="vote-list">${v.candidates.map((id) => `<button class="vote-btn" data-act="liveVote" data-id="${id}">${esc(playerById(id).name)}</button>`).join("")}</div>
          <button class="btn btn-quiet" data-act="liveTie">It's a tie / skip ${s.length === "single" ? "(impostors win)" : "this round"}</button>
        </main>`;
    }
    const voter = playerById(v.voters[v.idx]);
    if (v.stage === "pass") {
      return `${topbar(`Vote ${v.idx + 1} of ${v.voters.length}`, "backToPlay")}
        <main class="page deal">
          <p class="eyebrow center">Secret ballot · pass the phone to</p>
          <h2 class="pass-name">${esc(voter.name)}</h2>
          <p class="muted center">Nobody else should look while ${esc(voter.name)} votes.</p>
        </main>
        <footer class="dock"><div class="dock-row"><button class="btn btn-primary" data-act="voteReady">I'm ${esc(voter.name)}, let me vote</button></div></footer>`;
    }
    if (v.stage === "choose") {
      return `${topbar(`${voter.name}'s vote`, null)}
        <main class="page">
          <p class="eyebrow">Who is an impostor?</p>
          <div class="vote-list">${v.candidates.filter((id) => id !== voter.id).map((id) => `<button class="vote-btn" data-act="castVote" data-id="${id}">${esc(playerById(id).name)}</button>`).join("")}</div>
        </main>`;
    }
    return `${topbar("Vote locked", null)}
      <main class="page deal"><p class="locked">✓</p><h2 class="pass-name">Vote saved</h2><p class="muted center">Hide the screen and pass the phone on.</p></main>
      <footer class="dock"><div class="dock-row"><button class="btn btn-primary" data-act="voteNext">${v.idx + 1 < v.voters.length ? "Next voter" : "Count the votes"}</button></div></footer>`;
  }

  function gameTally() {
    const g = G();
    const { counts, max, top } = tally();
    const sorted = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    const single = g.settings.length === "single";
    return `${topbar("The votes are in", null)}
      <main class="page">
        <section class="card">
          ${sorted.map((id) => `<div class="tally-row${top.includes(id) ? " is-top" : ""}">
            <span class="tally-name">${esc(playerById(id).name)}</span>
            <span class="tally-bar"><i style="width:${max ? (counts[id] / max) * 100 : 0}%"></i></span>
            <span class="tally-n">${counts[id]}</span></div>`).join("")}
        </section>
        ${top.length === 1 ? `<p class="center big-line"><b>${esc(playerById(top[0]).name)}</b> has the most votes.</p>`
          : `<section class="card brief"><p class="eyebrow">It's a tie</p><p>${top.map((id) => esc(playerById(id).name)).join(" and ")} are tied. What now?</p></section>`}
      </main>
      <footer class="dock">${top.length === 1
        ? `<div class="dock-row"><button class="btn btn-primary" data-act="eliminate" data-id="${top[0]}">Reveal ${esc(playerById(top[0]).name)}</button></div>`
        : `<div class="dock-col">
            <button class="btn btn-primary" data-act="revote">Revote between the tied players</button>
            <button class="btn btn-ghost" data-act="randomTie">Let fate pick one</button>
            <button class="btn btn-quiet" data-act="noElim">Nobody goes out${single ? " (impostors win)" : ""}</button>
          </div>`}
      </footer>`;
  }

  function gameReveal() {
    const g = G();
    const p = playerById(g.lastOut);
    const s = g.settings;
    const guessing = canGuess(p);
    const showRole = s.reveal === "role" || guessing;
    return `${topbar("Voted out", null)}
      <main class="page deal">
        <p class="eyebrow center">The group has decided</p>
        <h2 class="pass-name">${esc(p.name)}</h2>
        ${showRole ? `<p class="verdict verdict-${p.role}">${p.role === "civilian" ? "was a Civilian" : "was " + (p.role === "infiltrator" ? "an Infiltrator" : blankName(s))}</p>
          ${p.role === "civilian" ? `<p class="muted center">Ouch. An innocent goes down.</p>` : `<p class="muted center">${guessing ? "Not so fast. They get one last chance." : "Nice catch!"}</p>`}`
          : `<p class="verdict verdict-hidden">is out</p><p class="muted center">Their role stays secret. Keep your eyes open.</p>`}
      </main>
      <footer class="dock"><div class="dock-row">${guessing
        ? `<button class="btn btn-primary" data-act="toGuess">${esc(p.name)}, make your guess</button>`
        : `<button class="btn btn-primary" data-act="afterElim">Continue</button>`}</div></footer>`;
  }

  function gameKamikaze() {
    const g = G();
    const k = g.kami;
    const alive = alivePlayers();
    if (k.stage === "who") {
      return `${topbar("💥 Kamikaze", "kamiCancel")}
        <main class="page">
          <section class="card brief"><p class="eyebrow">Bet your life</p>
            <p>Accuse one player of being an impostor. <b>Right:</b> they're out on the spot and get one last guess at the word. <b>Wrong:</b> you're out instead.</p></section>
          <p class="eyebrow">Who's going kamikaze?</p>
          <div class="vote-list">${alive.map((p) => `<button class="vote-btn" data-act="kamiBy" data-id="${p.id}">${esc(p.name)}</button>`).join("")}</div>
        </main>`;
    }
    const by = playerById(k.by);
    return `${topbar("💥 Kamikaze", "kamiCancel")}
      <main class="page">
        <p class="eyebrow">${esc(by.name)}, who is the impostor?</p>
        <div class="vote-list">${alive.filter((p) => p.id !== by.id).map((p) => `<button class="vote-btn" data-act="kamiTarget" data-id="${p.id}">${esc(p.name)}</button>`).join("")}</div>
        <button class="btn btn-quiet" data-act="kamiBack">Pick a different kamikaze</button>
      </main>`;
  }

  function gameKamiReveal() {
    const g = G();
    const s = g.settings;
    const k = g.kami;
    const by = playerById(k.by), target = playerById(k.target);
    const victim = playerById(g.lastOut);
    const guessing = canGuess(victim);
    const roleText = (p) => (p.role === "infiltrator" ? "an Infiltrator" : blankName(s));
    const showByRole = s.reveal === "role" || guessing;
    return `${topbar("💥 Kamikaze", null)}
      <main class="page deal">
        <p class="eyebrow center">${esc(by.name)} bet their life that</p>
        <h2 class="pass-name">${esc(target.name)}</h2>
        ${k.correct
          ? `<p class="verdict verdict-${target.role}">is ${roleText(target)}!</p>
             <p class="muted center">Direct hit. ${esc(target.name)} is out${guessing ? " but gets one last guess at the word." : "."}</p>`
          : `<p class="verdict verdict-civilian">is a Civilian</p>
             <p class="muted center">Wrong call. <b>${esc(by.name)}</b> goes down instead${showByRole ? ` and was <b>${by.role === "civilian" ? "a Civilian" : roleText(by)}</b>` : ""}.</p>`}
      </main>
      <footer class="dock"><div class="dock-row">${guessing
        ? `<button class="btn btn-primary" data-act="toGuess">${esc(victim.name)}, make your guess</button>`
        : `<button class="btn btn-primary" data-act="afterElim">Continue</button>`}</div></footer>`;
  }

  function gameGuess() {
    const g = G();
    const p = playerById(g.lastOut);
    return `${topbar("Last chance", null)}
      <main class="page">
        <section class="card brief"><p class="eyebrow">${esc(p.name)}, only you type here</p>
          <p>What is the civilians' secret word? Get it right and you win the game on your own.</p></section>
        <form class="stack" data-form="guess">
          <input class="input input-big" id="guess-input" data-input="guessText" value="${esc(ui.guessText)}" placeholder="Your guess" autocomplete="off" autocapitalize="words" maxlength="60">
          <button class="btn btn-primary" type="submit">Lock in my guess</button>
        </form>
        <section class="card">
          <p class="strong">Guessing out loud instead?</p>
          <p class="muted small">${esc(p.name)} says their guess to the group. Civilians decide if it's right.</p>
          <div class="dock-row"><button class="btn btn-ghost" data-act="guessIrl" data-ok="1">✓ They got it</button><button class="btn btn-ghost" data-act="guessIrl" data-ok="0">✗ Wrong</button></div>
        </section>
      </main>`;
  }

  function gameGuessResult() {
    const g = G();
    const p = playerById(g.lastOut);
    const ok = g.guess.correct;
    return `${topbar("The guess", null)}
      <main class="page deal">
        <p class="eyebrow center">${esc(p.name)} guessed</p>
        <h2 class="pass-name">“${esc(g.guess.text)}”</h2>
        ${ok ? `<p class="verdict verdict-blank">Correct!</p>` : `<p class="verdict verdict-civilian">Wrong</p><p class="muted center">The game goes on. Civilians: if that guess really means the same thing as your word, you can count it.</p>`}
      </main>
      <footer class="dock">${ok
        ? `<div class="dock-row"><button class="btn btn-primary" data-act="blankWins">See the results</button></div>`
        : `<div class="dock-col"><button class="btn btn-primary" data-act="afterElim">Continue</button><button class="btn btn-quiet" data-act="blankWins">That's basically right, count it</button></div>`}
      </footer>`;
  }

  function gameEnd() {
    const g = G();
    const s = g.settings;
    const r = g.result;
    const by = r.byId && playerById(r.byId);
    const titles = {
      civilians: ["Civilians win", "Every impostor has been caught."],
      impostors: ["Impostors win", r.note || "They blended in and took over."],
      mrwhite: [`${by ? roleLabel(by.role, s) : blankName(s)} wins`, by && by.role === "infiltrator" ? `${by.name} guessed the civilians' word and stole the win.` : `${by ? by.name : ""} guessed the word with nothing to go on.`],
      twist: ["Twist!", "There were no impostors at all. You were suspicious of each other for nothing."]
    }[r.winner];
    const board = data.scores[g.scope] || {};
    const ranking = Object.entries(board).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const group = data.groups.find((x) => x.id === g.scope);
    return `${topbar("Case closed", null)}
      <main class="page">
        <section class="winner winner-${r.winner}">
          <p class="eyebrow">Round ${g.round} · ${esc(g.words.icon)} ${esc(g.words.category)}</p>
          <h2 class="winner-title">${esc(titles[0])}</h2>
          <p>${esc(titles[1])}</p>
          ${g.twist === "extra" ? `<p class="twist-note">Twist: there was a secret extra Infiltrator this game.</p>` : ""}
        </section>
        <section class="card words-reveal">
          <div><p class="label">Civilian word</p><p class="word-big">${esc(g.words.civ)}</p>${g.words.civHint ? `<p class="muted small">${esc(g.words.civHint)}</p>` : ""}</div>
          ${g.players.some((p) => p.role === "infiltrator") ? `<div><p class="label">Infiltrator word</p><p class="word-big is-inf">${esc(g.words.inf)}</p>${g.words.infHint ? `<p class="muted small">${esc(g.words.infHint)}</p>` : ""}</div>` : ""}
        </section>
        <section class="card">
          <h2 class="h2">Who was who</h2>
          <ul class="recap">${g.players.map((p) => `<li>
            <span class="recap-name">${esc(p.name)}</span>
            <span class="role-chip role-${p.role}">${roleLabel(p.role, s)}</span>
            <span class="recap-status">${p.alive ? "survived" : "out in round " + p.outRound}${(g.kamiHeroes || []).includes(p.id) ? " · 💥 kamikaze hero" : ""}</span>
            ${s.scoring === "on" ? `<span class="recap-pts">${r.points[p.id] ? "+" + r.points[p.id] : "0"}</span>` : ""}
          </li>`).join("")}</ul>
        </section>
        ${s.scoring === "on" && ranking.length ? `<section class="card">
          <div class="row-between"><h2 class="h2">Leaderboard</h2><span class="count-pill">${esc(group ? group.name : "This session")}</span></div>
          <ol class="board">${ranking.map(([name, pts], i) => `<li><span class="seat">${i + 1}</span><span class="board-name">${esc(name)}</span><span class="board-pts">${pts}</span></li>`).join("")}</ol>
        </section>` : ""}
      </main>
      <footer class="dock"><div class="dock-col">
        <button class="btn btn-primary" data-act="playAgain">Play again, new word</button>
        <div class="dock-row"><button class="btn btn-ghost" data-act="changeSetup">Change setup</button><button class="btn btn-ghost" data-act="home">Home</button></div>
        <button class="btn btn-quiet" data-act="shareGame">Share this game</button>
      </div></footer>`;
  }

  /* ---------------- Word packs ---------------- */
  SCREENS.packs = () => {
    const cats = allCategories();
    return `${topbar("Word packs", "back")}
      <main class="page">
        <section class="card">
          <h2 class="h2">Make your own</h2>
          <p class="muted small">Your categories and words live on this device. Export them to share with friends.</p>
          <div class="row-gap wrap">
            <button class="btn btn-primary" data-act="aiOpen">✨ Generate with AI</button>
            <button class="btn btn-ghost" data-act="newPack">+ New category</button>
            <button class="btn btn-quiet" data-act="go" data-to="transfer">Import / export</button>
          </div>
        </section>
        <ul class="pack-list">${cats.map((c) => `<li class="pack-row">
          <button class="pack-open" data-act="openPack" data-id="${c.id}">
            <span class="cat-icon">${esc(c.icon || "🗂️")}</span>
            <span class="pack-text"><span class="strong">${esc(c.name)}</span>
            <span class="muted small">${c.words.length} word sets${c.custom ? " · your category" : (data.extras[c.id] || []).length ? ` · ${data.extras[c.id].length} added by you` : ""}</span></span>
          </button>
          ${toggle("toggleCat", isEnabled(c), `data-id="${c.id}" aria-label="Use ${esc(c.name)}"`)}
        </li>`).join("")}</ul>
      </main>`;
  };

  SCREENS.pack = () => {
    const c = getCategory(ui.packId);
    if (!c) { ui.screen = "packs"; return SCREENS.packs(); }
    const extras = c.custom ? c.words : (data.extras[c.id] || []);
    const base = c.custom ? [] : c.base;
    const wordChip = (e, removable) => { const [w, ...sim] = parseEntry(e); return `<li class="word-chip" title="${esc([w, ...sim].map((x) => hintFor(c.id, x) ? x + ": " + hintFor(c.id, x) : "").filter(Boolean).join("\n"))}"><span><b>${esc(w)}</b>${sim.length ? `<span class="muted"> · ${sim.map(esc).join(", ")}</span>` : ""}</span>${removable ? `<button class="icon-btn small" data-act="removeWord" data-w="${esc(e)}" aria-label="Remove ${esc(w)}">✕</button>` : ""}</li>`; };
    return `${topbar(c.name, "back")}
      <main class="page">
        ${c.custom ? `<section class="card">
          <p class="label">Name and icon</p>
          <div class="row-gap"><input class="input input-icon" id="pack-icon" data-input="packIcon" value="${esc(c.icon || "")}" maxlength="4" aria-label="Icon (emoji)">
          <input class="input" id="pack-name" data-input="packName" value="${esc(c.name)}" maxlength="30" aria-label="Category name"></div>
        </section>` : ""}
        <section class="card">
          <div class="row-between"><h2 class="h2">Add words</h2>${helpBtn("addwords")}</div>
          ${helpText("addwords", "One word per line. Add similar words for Infiltrators after a <b>|</b> bar, for example <b>Coffee | Tea | Hot Chocolate</b>. Words without a similar word still work: the Infiltrator gets another word from this category.")}
          <textarea class="input" id="add-words" rows="4" placeholder="Coffee | Tea&#10;Pizza | Burger&#10;Netflix"></textarea>
          <div class="row-gap wrap"><button class="btn btn-primary" data-act="addWords">Add</button><button class="btn btn-ghost" data-act="aiOpen" data-target="${c.id}">✨ More with AI</button></div>
        </section>
        <section class="card">
          <div class="row-between"><h2 class="h2">${c.words.length} word sets</h2>${toggle("toggleCat", isEnabled(c), `data-id="${c.id}" aria-label="Use this category"`)}</div>
          ${extras.length ? `<p class="label">${c.custom ? "Words" : "Added by you"}</p><ul class="word-list">${extras.map((e) => wordChip(e, true)).join("")}</ul>` : c.custom ? `<p class="muted">No words yet. Add some above or generate them with AI.</p>` : ""}
          ${base.length ? `<p class="label">Built in</p><ul class="word-list">${base.map((e) => wordChip(e, false)).join("")}</ul>` : ""}
        </section>
        ${c.custom ? `<section class="row-gap wrap"><button class="btn btn-ghost" data-act="sharePack">Copy to share</button><button class="btn btn-danger" data-act="deletePack">Delete category</button></section>` : ""}
      </main>`;
  };

  SCREENS.ai = () => {
    const a = ui.ai;
    const target = a.target && getCategory(a.target);
    return `${topbar(target ? "More words with AI" : "Generate with AI", "aiBack")}
      <main class="page">
        <section class="card">
          <p class="label">${target ? `Adding to ${esc(target.name)}` : "What should the category be about?"}</p>
          <input class="input input-big" id="ai-topic" data-input="aiTopic" value="${esc(a.topic)}" placeholder="e.g. 90s cartoons, things at a wedding, Marvel" maxlength="80">
          <div class="chips">${["Things at a hospital", "Video games", "Street food", "Famous landmarks", "Office life", "Superpowers", "Cricket"].map((t) => `<button class="chip chip-quiet" data-act="aiTopic" data-val="${esc(t)}">${t}</button>`).join("")}</div>
          <div class="ai-grid">
            <div><p class="label">How many</p>${seg("count", [[15, "15"], [30, "30"], [50, "50"]], a.count, "aiSet")}</div>
            <div><p class="label">Difficulty</p>${seg("difficulty", [["easy", "Easy"], ["medium", "Medium"], ["hard", "Hard"]], a.difficulty, "aiSet")}</div>
            <div><p class="label">For</p>${seg("audience", [["all", "Everyone"], ["kids", "Kids"], ["adults", "Adults"]], a.audience, "aiSet")}</div>
            <div><p class="label">Language</p><input class="input" id="ai-lang" data-input="aiLang" value="${esc(a.language)}" placeholder="English" maxlength="30"></div>
          </div>
        </section>

        ${a.server === "ready" ? `<section class="card result">
          <div class="row-between"><h2 class="h2">Generate</h2><span class="tag">free · built in</span></div>
          <p class="muted small">Makes the whole category in about 10 seconds. Review it before saving.</p>
          <button class="btn btn-primary btn-xl" data-act="aiBuiltIn" ${a.busy ? "disabled" : ""}>${a.busy ? "Generating…" : "✨ Generate words"}</button>
        </section>` : a.server === "checking" ? `<p class="muted small center">Checking for the built-in generator…</p>`
          : a.server === "nokey" ? `<p class="muted small">The built-in generator isn't switched on for this site yet (no Gemini key). Use the free copy-and-paste option below.</p>`
          : a.server === "limit" ? `<p class="muted small">Today's free AI words are used up. The built-in generator switches back on tomorrow; the copy-and-paste option below works any time.</p>` : ""}

        <section class="card">
          <div class="row-between"><h2 class="h2">${a.server === "ready" ? "Or use any chatbot" : "Free: use any chatbot"}</h2><span class="tag">no key needed</span></div>
          <ol class="howto-steps">
            <li>Copy the prompt. <button class="btn btn-ghost" data-act="aiCopy">Copy prompt</button></li>
            <li>Paste it into ChatGPT, Claude, Gemini or any AI chat.
              <span class="links"><a href="https://chatgpt.com/" target="_blank" rel="noopener">ChatGPT</a> · <a href="https://claude.ai/new" target="_blank" rel="noopener">Claude</a> · <a href="https://gemini.google.com/" target="_blank" rel="noopener">Gemini</a></span></li>
            <li>Copy its whole reply and paste it here.</li>
          </ol>
          <textarea class="input" id="ai-reply" data-input="aiReply" rows="4" placeholder="Paste the AI's reply here">${esc(a.reply)}</textarea>
          <button class="btn btn-primary" data-act="aiParse">Read the reply</button>
          <details class="prompt-peek"><summary>See the prompt</summary><pre id="ai-prompt">${esc(AI.buildPrompt(aiOpts()))}</pre></details>
        </section>

        <details class="card advanced" ${data.ai.key ? "open" : ""}>
          <summary class="strong">Advanced: use your own Claude API key</summary>
          <div class="row-between"><p class="muted small">Calls Claude straight from this device.</p>${helpBtn("apikey")}</div>
          ${helpText("apikey", "Get a key at console.anthropic.com. It's saved only in this browser and sent only to Anthropic's API, never anywhere else. Each generation costs a few cents. Don't save a key on a shared phone.")}
          <input class="input" id="ai-key" type="password" data-input="aiKey" value="${esc(data.ai.key)}" placeholder="sk-ant-…" autocomplete="off">
          <details class="prompt-peek"><summary>Model</summary><input class="input" id="ai-model" data-input="aiModel" value="${esc(data.ai.model)}" placeholder="${AI.DEFAULT_MODEL}"></details>
          <div class="row-gap wrap">
            <button class="btn btn-ghost" data-act="aiGenerate" ${a.busy ? "disabled" : ""}>${a.busy ? "Generating…" : "Generate with Claude"}</button>
            ${data.ai.key ? `<button class="btn btn-quiet" data-act="aiForget">Forget key</button>` : ""}
          </div>
        </details>

        ${a.error ? `<p class="error" role="alert">${esc(a.error)}</p>` : ""}
        ${a.result ? aiResult(a, target) : ""}
      </main>`;
  };

  function aiResult(a, target) {
    const r = a.result;
    return `<section class="card result" id="ai-result">
      <div class="row-between"><h2 class="h2">${r.entries.length} words ready</h2><span class="tag">review</span></div>
      ${target ? "" : `<div class="row-gap"><input class="input input-icon" id="ai-icon" data-input="aiResIcon" value="${esc(r.icon)}" maxlength="4" aria-label="Icon">
        <input class="input" id="ai-name" data-input="aiResName" value="${esc(r.category)}" placeholder="Category name" maxlength="30" aria-label="Category name"></div>`}
      <ul class="word-list">${r.entries.map((e, i) => { const [w, ...sim] = parseEntry(e); const h = r.hints && r.hints[w]; return `<li class="word-chip"><span><b>${esc(w)}</b>${sim.length ? `<span class="muted"> · ${sim.map(esc).join(", ")}</span>` : ""}${h ? `<br><span class="muted small">${esc(h)}</span>` : ""}</span><button class="icon-btn small" data-act="aiDrop" data-i="${i}" aria-label="Remove">✕</button></li>`; }).join("")}</ul>
      <button class="btn btn-primary" data-act="aiSave">${target ? `Add to ${esc(target.name)}` : "Save as new category"}</button>
    </section>`;
  }

  function aiOpts() {
    const a = ui.ai;
    const target = a.target && getCategory(a.target);
    return { topic: a.topic || (target && target.name) || "anything fun", count: a.count, difficulty: a.difficulty, audience: a.audience, language: a.language, avoid: target ? target.words.map((e) => parseEntry(e)[0]) : [] };
  }

  SCREENS.transfer = () => {
    const custom = Object.values(data.packs);
    return `${topbar("Import / export", "back")}
      <main class="page">
        <section class="card">
          <h2 class="h2">Export your categories</h2>
          <p class="muted small">${custom.length ? `Copies your ${plural(custom.length, "category", "categories")} as text. Send it to a friend and they can import it here.` : "You haven't made any categories yet."}</p>
          <div class="row-gap wrap"><button class="btn btn-ghost" data-act="exportCopy" ${custom.length ? "" : "disabled"}>Copy export</button>
          <button class="btn btn-quiet" data-act="exportFile" ${custom.length ? "" : "disabled"}>Download file</button></div>
        </section>
        <section class="card">
          <h2 class="h2">Import</h2>
          <p class="muted small">Paste an export from a friend, an AI reply, or a plain list (one word per line).</p>
          <textarea class="input" id="import-text" data-input="transfer" rows="6" placeholder='{"categories": [...]}'>${esc(ui.transfer)}</textarea>
          <div class="row-gap wrap"><button class="btn btn-primary" data-act="importText">Import</button>
          <label class="btn btn-quiet file-btn">Choose file<input type="file" id="import-file" accept=".json,.txt,application/json,text/plain" data-change="importFile"></label></div>
        </section>
      </main>`;
  };

  /* ---------------- Scores & groups ---------------- */
  SCREENS.scores = () => {
    const scopes = [["session", "No group"]].concat(data.groups.map((g) => [g.id, g.name]));
    const sel = ui.scoreScope || data.activeGroup || "session";
    const board = Object.entries(data.scores[sel] || {}).sort((a, b) => b[1] - a[1]);
    const group = data.groups.find((g) => g.id === sel);
    return `${topbar("Groups & scores", "back")}
      <main class="page">
        <div class="chips">${scopes.map(([id, name]) => `<button class="chip${id === sel ? " is-on" : ""}" data-act="scoreScope" data-id="${id}">${esc(name)}</button>`).join("")}</div>
        <section class="card">
          <div class="row-between"><h2 class="h2">${esc(group ? group.name : "Games without a group")}</h2>${group ? `<span class="count-pill">${plural(group.players.length, "player")}</span>` : ""}</div>
          ${group ? `<p class="muted small">${group.players.map(esc).join(", ")}</p>` : ""}
          ${board.length ? `<ol class="board">${board.map(([name, pts], i) => `<li><span class="seat">${i + 1}</span><span class="board-name">${esc(name)}</span><span class="board-pts">${pts}</span></li>`).join("")}</ol>`
            : `<p class="muted">No points yet. Finish a game with scoring on and the leaderboard appears here.</p>`}
          <div class="row-gap wrap">
            ${group ? `<button class="btn btn-ghost" data-act="playGroup" data-id="${group.id}">Play with this group</button>` : ""}
            ${board.length ? `<button class="btn btn-quiet" data-act="resetScores" data-id="${sel}">Reset scores</button>` : ""}
            ${group ? `<button class="btn btn-danger" data-act="deleteGroup" data-id="${group.id}">Delete group</button>` : ""}
          </div>
        </section>
        <section class="card"><h2 class="h2">How points work</h2>
          <ul class="points">
            <li><span>Civilians win</span><b>+${POINTS.civilian}</b> each civilian</li>
            <li><span>Impostors win</span><b>+${POINTS.infiltrator}</b> each Infiltrator, <b>+${POINTS.blank}</b> each Mr. White</li>
            <li><span>Mr. White guesses the word</span><b>+${POINTS.blankGuess}</b></li>
            <li><span>Correct kamikaze</span><b>+${POINTS.kamikaze}</b> bonus for the brave one</li>
            <li><span>No-impostor twist</span><b>+${POINTS.twist}</b> everyone except whoever got voted out</li>
          </ul>
          <p class="muted small">Create groups from the Players step of a new game.</p>
        </section>
      </main>`;
  };

  /* ---------------- How to play ---------------- */
  SCREENS.howto = () => `${topbar("How to play", "back")}
    <main class="page prose">
      <section class="card">
        <h2 class="h2">The idea in 20 seconds</h2>
        <p>Everyone secretly gets a word on the phone. Most players get the <b>same</b> word. One or more impostors either get a slightly <b>different</b> word or <b>no word at all</b>. Take turns describing your word without saying it, then vote out who you think is lying. Civilians want to catch the impostors; impostors want to survive.</p>
      </section>
      <section class="card">
        <h2 class="h2">The roles</h2>
        <dl class="roles">
          <div><dt><span class="role-chip role-civilian">Civilian</span></dt><dd>Gets the main word, for example <b>Coffee</b>. Give clues that prove you know it, but don't make it so obvious that impostors can copy you.</dd></div>
          <div><dt><span class="role-chip role-infiltrator">Infiltrator</span></dt><dd>Also called the Undercover. Gets a similar word, for example <b>Tea</b>. Depending on the settings they may not even know they're the odd one out. Listen carefully: if the clues don't quite fit, it might be you.</dd></div>
          <div><dt><span class="role-chip role-blank">Mr. White / Spy</span></dt><dd>Gets no word at all (maybe a category hint). Bluff using what others say. If voted out, Mr. White can guess the word and steal the win.</dd></div>
        </dl>
      </section>
      <section class="card">
        <h2 class="h2">A round, step by step</h2>
        <ol class="howto-steps">
          <li><b>Deal.</b> Pass the phone around. Each player privately looks at their card, then hides it.</li>
          <li><b>Talk.</b> Starting with the first speaker, play the chosen style: one-word clues, a sentence, questions, mime or drawing.</li>
          <li><b>Vote.</b> Secretly on the phone or out loud by pointing. The player with the most votes is out.</li>
          <li><b>Repeat</b> until one side wins (or after one vote in “one vote decides” games).</li>
        </ol>
      </section>
      <section class="card">
        <h2 class="h2">Game modes</h2>
        <dl class="roles">${Object.values(MODES).map((m) => `<div><dt class="strong">${m.name}</dt><dd>${m.desc}</dd></div>`).join("")}</dl>
        <p class="muted small">After picking a mode you can still change every rule.</p>
      </section>
      <section class="card">
        <h2 class="h2">Ways to play a round</h2>
        <dl class="roles">${Object.values(STYLES).map((s) => `<div><dt class="strong">${s.name}</dt><dd>${s.how}</dd></div>`).join("")}</dl>
      </section>
      <section class="card">
        <h2 class="h2">💥 Kamikaze</h2>
        <p>Sure you know who the impostor is? During any round, tap <b>Kamikaze</b>, pick yourself and point at your suspect. You're betting your life:</p>
        <ul class="bullets">
          <li><b>Right:</b> the impostor is out on the spot. They get one last guess at the civilians' word, typed on the phone or said out loud. A correct guess steals the win.</li>
          <li><b>Wrong:</b> the suspect was a Civilian, so <b>you</b> are out instead.</li>
          <li>Works in every mode. In Spy (one vote) games, a successful kamikaze ends the game just like catching the Spy in the vote.</li>
        </ul>
      </section>
      <section class="card">
        <h2 class="h2">Who wins?</h2>
        <ul class="bullets">
          <li><b>Civilians</b> win when every Infiltrator and Mr. White is out.</li>
          <li><b>Impostors</b> win when they equal or outnumber the civilians still in the game.</li>
          <li><b>Mr. White</b> wins alone by guessing the civilians' word after being voted out.</li>
          <li>In <b>one vote decides</b> games: catch an impostor and civilians win; vote out a civilian and impostors win.</li>
        </ul>
      </section>
      <section class="card">
        <h2 class="h2">Tips</h2>
        <ul class="bullets">
          <li><b>Civilians:</b> go for clues that only make sense with your exact word. “Bitter” fits coffee and tea; “Barista” fits only one.</li>
          <li><b>Infiltrators:</b> if your word seems slightly off, give vague clues and quietly agree with the majority.</li>
          <li><b>Mr. White:</b> wait, listen, then give a clue that matches the last two you heard.</li>
          <li><b>Everyone:</b> nobody may say their word, spell it or translate it. Say “pass” only if the group allows it.</li>
          <li><b>Fair turns:</b> whoever was an impostor last game won't be one in the next, so everyone gets a go.</li>
          <li><b>New players or a mixed group?</b> Pick <b>Everyday words</b> in the Words step so nobody gets a word they've never heard of.</li>
        </ul>
      </section>
      <section class="card">
        <h2 class="h2">Make it your own</h2>
        <p>Open <b>Word packs</b> to add categories, paste word lists, or generate a whole category with AI on any topic: inside jokes, your office, a TV show you all love. Save your friends as a <b>group</b> so you can start in two taps and keep a leaderboard.</p>
      </section>
    </main>`;

  /* ================================================================
   * Overlay: modal, peek, toast
   * ================================================================ */
  let modalHandlers = [];
  function modal(title, body, actions) { ui.modal = { title, body, actions }; renderOverlay(); }
  function confirmBox(title, body, okLabel, onOk, danger) {
    modal(title, body, [{ label: "Cancel", cls: "btn-ghost" }, { label: okLabel, cls: danger ? "btn-danger" : "btn-primary", fn: onOk }]);
  }
  function toast(msg) {
    ui.toast = msg; renderOverlay();
    clearTimeout(toast.t); toast.t = setTimeout(() => { ui.toast = null; renderOverlay(); }, 2400);
  }

  function renderOverlay() {
    let html = "";
    modalHandlers = [];
    if (ui.peek) {
      const g = G();
      if (ui.peek.stage === "pick") {
        html += `<div class="scrim"><div class="sheet" role="dialog" aria-modal="true" aria-label="Peek at your word">
          <h2 class="h2">Who needs to peek?</h2><p class="muted small">Everyone else, look away.</p>
          <div class="vote-list">${g.players.map((p) => `<button class="vote-btn" data-act="peekPick" data-id="${p.id}">${esc(p.name)}</button>`).join("")}</div>
          <button class="btn btn-ghost" data-act="peekClose">Cancel</button></div></div>`;
      } else {
        const p = playerById(ui.peek.id);
        html += `<div class="scrim"><div class="sheet" role="dialog" aria-modal="true" aria-label="Your card">
          <p class="eyebrow center">Only ${esc(p.name)} looks</p>
          ${revealCard(p, g)}
          <button class="btn btn-primary" data-act="peekClose">Done, hide it</button></div></div>`;
      }
    }
    if (ui.modal) {
      const m = ui.modal;
      html += `<div class="scrim"><div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(m.title)}">
        <h2 class="h2">${esc(m.title)}</h2>${m.body ? `<p>${m.body}</p>` : ""}
        <div class="dock-row">${m.actions.map((a, i) => { modalHandlers.push(a.fn); return `<button class="btn ${a.cls || "btn-ghost"}" data-act="modalBtn" data-i="${i}">${esc(a.label)}</button>`; }).join("")}</div>
      </div></div>`;
    }
    if (ui.toast) html += `<div class="toast" role="status">${esc(ui.toast)}</div>`;
    $overlay.innerHTML = html;
  }

  /* ================================================================
   * Render
   * ================================================================ */
  function applyTheme() {
    const t = data.settings.theme;
    if (t === "auto") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", t);
  }

  function render() {
    applyTheme();
    const fn = SCREENS[ui.screen] || SCREENS.home;
    const active = document.activeElement;
    const focusId = active && active.id && $app.contains(active) ? active.id : null;
    const selStart = focusId && active.selectionStart;
    $app.innerHTML = fn();
    const key = ui.screen + "|" + ui.step + "|" + (data.game ? data.game.phase + data.game.dealIdx + (data.game.vote ? data.game.vote.idx + data.game.vote.stage : "") : "");
    if (key !== lastScreenKey) { window.scrollTo(0, 0); lastScreenKey = key; }
    else if (focusId) {
      const el = document.getElementById(focusId);
      if (el) { el.focus(); try { if (selStart != null) el.setSelectionRange(selStart, selStart); } catch (e) { /* not a text input */ } }
    }
    if (ui.screen === "game" && data.game && data.game.phase === "guess") { const gi = document.getElementById("guess-input"); if (gi) gi.focus(); }
    renderOverlay();
  }

  function go(screen) { ui.screen = screen; render(); }

  /* ================================================================
   * Actions
   * ================================================================ */
  const ACT = {
    go: (el) => {
      const to = el.dataset.to;
      if (["home", "setup", "game"].includes(ui.screen)) ui.from[to] = ui.screen;
      go(to);
    },
    back: () => {
      if (ui.screen === "pack" || ui.screen === "transfer") return go("packs");
      const from = ui.from[ui.screen];
      if (from === "game" && !(data.game && data.game.phase !== "end")) return go("home");
      go(from || "home");
    },
    home: () => { data.game = data.game && data.game.phase === "end" ? null : data.game; save(); go("home"); },
    help: (el) => { ui.help[el.dataset.id] = !ui.help[el.dataset.id]; render(); },

    resume: () => { ui.revealed = false; ui.seen = false; go("game"); requestWakeLock(); },
    newSetup: () => {
      const start = () => { data.game = null; save(); ui.step = 0; go("setup"); };
      if (data.game && data.game.phase !== "end") confirmBox("Start a new game?", "The game in progress will be abandoned.", "Start new", start, true);
      else start();
    },
    quickStart: () => { if (!validateSetup()) newGame(); },

    /* setup navigation */
    step: (el) => { ui.step = Number(el.dataset.i); render(); },
    setupNext: () => { ui.step = Math.min(3, ui.step + 1); render(); },
    setupBack: () => { if (ui.step === 0) go("home"); else { ui.step--; render(); } },
    start: () => { const err = validateSetup(); if (err) return toast(err); data.lastPlayed = Date.now(); newGame(); },

    /* players */
    toggleNames: () => { data.useNames = !data.useNames; save(); render(); },
    count: (el) => { data.playerCount = Math.max(3, Math.min(24, data.playerCount + Number(el.dataset.d))); save(); render(); },
    addPlayer: () => {
      if (data.players.length >= 24) return toast("24 players is the maximum.");
      const p = { id: uid(), name: "" }; data.players.push(p); save(); render();
      const el = document.getElementById("name-" + p.id); if (el) el.focus();
    },
    removePlayer: (el) => { if (data.players.length <= 3) return toast("You need at least 3 players."); data.players = data.players.filter((p) => p.id !== el.dataset.id); save(); render(); },
    moveUp: (el) => { const i = data.players.findIndex((p) => p.id === el.dataset.id); if (i > 0) { [data.players[i - 1], data.players[i]] = [data.players[i], data.players[i - 1]]; save(); render(); } },
    shufflePlayers: () => { data.players = shuffle(data.players); save(); render(); },
    loadGroup: (el) => {
      const g = data.groups.find((x) => x.id === el.dataset.id); if (!g) return;
      data.players = g.players.map((name) => ({ id: uid(), name })); data.useNames = true; data.activeGroup = g.id; save(); render();
    },
    clearGroup: () => { data.activeGroup = null; save(); render(); },
    saveGroup: () => {
      const name = ui.newGroupName.trim();
      if (!name) return toast("Give the group a name first.");
      const g = { id: uid(), name, players: data.players.map((p, i) => p.name.trim() || `Player ${i + 1}`) };
      data.groups.push(g); data.activeGroup = g.id; ui.newGroupName = ""; save(); render(); toast(`Saved “${name}”`);
    },
    updateGroup: () => { const g = data.groups.find((x) => x.id === data.activeGroup); if (!g) return; g.players = data.players.map((p, i) => p.name.trim() || `Player ${i + 1}`); save(); render(); toast("Group updated"); },

    /* mode & roles */
    mode: (el) => {
      const m = el.dataset.val; const s = data.settings;
      Object.assign(s, MODES[m].preset, { mode: m });
      if (s.countMode === "exact") s.countMode = "auto";
      save(); render();
    },
    countMode: (el) => {
      const s = data.settings; const v = el.dataset.val; const c = roleCounts(); const n = Math.max(1, currentPlayers().length);
      const toPct = (k) => (k > 0 ? Math.max(5, Math.min(45, Math.round(((k / n) * 100) / 5) * 5)) : 0);
      if (v === "percent" && s.countMode !== "percent") { s.infPct = toPct(c.inf); s.blankPct = toPct(c.blank); }
      if (v === "exact" && s.countMode !== "exact") { s.inf = c.inf; s.blank = c.blank; }
      s.countMode = v; save(); render();
    },
    roleCount: (el) => {
      const s = data.settings;
      s.countMode = "exact";
      s[el.dataset.key] = Math.max(0, Math.min(10, s[el.dataset.key] + Number(el.dataset.d)));
      save(); render();
    },
    pct: (el) => {
      const s = data.settings; const k = el.dataset.key;
      s[k] = Math.max(0, Math.min(45, (Number(s[k]) || 0) + Number(el.dataset.d)));
      save(); render();
    },
    autoCounts: () => { data.settings.countMode = "auto"; save(); render(); },

    /* settings */
    set: (el) => {
      const k = el.dataset.key; let v = el.dataset.val;
      if (typeof DEFAULT_SETTINGS[k] === "number") v = Number(v);
      data.settings[k] = v; save(); render();
    },

    /* categories */
    toggleCat: (el) => { const c = getCategory(el.dataset.id); data.enabled[c.id] = !isEnabled(c); save(); render(); },
    allCats: (el) => { allCategories().forEach((c) => (data.enabled[c.id] = el.dataset.val === "1")); save(); render(); },

    /* deal */
    flip: () => { ui.revealed = !ui.revealed; if (ui.revealed) { markSeen(); sfx("reveal"); } const d = document.getElementById("dossier"); if (d) d.classList.toggle("is-open", ui.revealed); },
    dealNext: () => {
      const g = G(); if (!ui.seen) return;
      ui.revealed = false; ui.seen = false;
      if (g.dealIdx < g.players.length - 1) g.dealIdx++;
      else { g.phase = "play"; ui.timer = null; }
      save(); render();
    },

    /* play */
    question: () => { ui.question = pick(window.QUESTION_IDEAS.filter((q) => q !== ui.question)); render(); },
    timerToggle: () => { ensureTimer(); if (ui.timer.running) stopTimer(); else startTimer(); updateTimerDom(); },
    timerAdd: () => { ensureTimer(); ui.timer.left += 30; ui.timer.total = Math.max(ui.timer.total, ui.timer.left); updateTimerDom(); },
    peek: () => { ui.peek = { stage: "pick" }; ui.revealed = false; renderOverlay(); },
    peekPick: (el) => { ui.peek = { stage: "show", id: el.dataset.id }; ui.revealed = false; renderOverlay(); },
    peekClose: () => { ui.peek = null; ui.revealed = false; renderOverlay(); },
    startVote: () => startVote(),
    backToPlay: () => { const g = G(); g.phase = "play"; g.vote = null; save(); render(); },
    quitGame: () => confirmBox("Leave this game?", "You can resume it later from the home screen.", "Leave", () => { stopTimer(); go("home"); }),

    /* voting */
    liveVote: (el) => { const p = playerById(el.dataset.id); confirmBox(`Vote out ${p.name}?`, "Make sure the group agrees.", "Vote out", () => eliminate(p.id), true); },
    liveTie: () => confirmBox("Nobody goes out?", G().settings.length === "single" ? "In a one-vote game this means the impostors win." : "You'll go straight to the next round.", "Confirm", noElimination),
    voteReady: () => { G().vote.stage = "choose"; save(); render(); },
    castVote: (el) => { const v = G().vote; v.ballots[v.voters[v.idx]] = el.dataset.id; v.stage = "locked"; vibrate(40); save(); render(); },
    voteNext: () => {
      const g = G(); const v = g.vote;
      v.idx++; v.stage = "pass";
      if (v.idx >= v.voters.length) g.phase = "tally";
      save(); render();
    },
    eliminate: (el) => eliminate(el.dataset.id),
    revote: () => {
      const g = G(); const { top } = tally();
      g.vote = { mode: "anon", candidates: top, voters: alivePlayers().map((p) => p.id), idx: 0, ballots: {}, stage: "pass" };
      g.phase = "vote"; save(); render();
    },
    randomTie: () => { const { top } = tally(); eliminate(pick(top)); },
    noElim: () => noElimination(),
    toGuess: () => { G().phase = "guess"; save(); render(); },
    guessIrl: (el) => {
      const g = G(); const ok = el.dataset.ok === "1";
      g.guess = { text: "said out loud", correct: ok };
      if (ok) return finish("mrwhite", g.lastOut);
      g.phase = "guessResult"; save(); render(); sfx("civilianOut");
    },
    kamikaze: () => { const g = G(); stopTimer(); g.kami = { stage: "who", by: null, target: null }; g.phase = "kamikaze"; save(); render(); },
    kamiCancel: () => { const g = G(); g.kami = null; g.phase = "play"; save(); render(); },
    kamiBack: () => { const g = G(); g.kami.stage = "who"; g.kami.by = null; save(); render(); },
    kamiBy: (el) => { const g = G(); g.kami.by = el.dataset.id; g.kami.stage = "target"; save(); render(); },
    kamiTarget: (el) => {
      const g = G(); const by = playerById(g.kami.by), t = playerById(el.dataset.id);
      confirmBox(`${by.name} goes kamikaze on ${t.name}?`, `If ${esc(t.name)} is an impostor, they're out. If ${esc(t.name)} is a Civilian, <b>${esc(by.name)}</b> is out instead. No take-backs.`, "💥 Do it", () => resolveKamikaze(by.id, t.id), true);
    },
    afterElim: () => afterElimination(),
    blankWins: () => finish("mrwhite", G().lastOut),

    /* end */
    playAgain: () => { if (validateSetup()) { ui.step = 0; return go("setup"); } newGame(); },
    changeSetup: () => { data.game = null; save(); ui.step = 1; go("setup"); },

    /* packs */
    openPack: (el) => { ui.packId = el.dataset.id; go("pack"); },
    newPack: () => {
      const id = "c_" + uid();
      data.packs[id] = { id, name: "My category", icon: "⭐", words: [] }; data.enabled[id] = true;
      save(); ui.packId = id; go("pack");
      const el = document.getElementById("pack-name"); if (el) { el.focus(); el.select(); }
    },
    addWords: () => {
      const ta = document.getElementById("add-words");
      const lines = ta.value.split(/\r?\n/).map((l) => parseEntry(l.replace(/,/g, "|")).join("|")).filter(Boolean);
      if (!lines.length) return toast("Type at least one word.");
      const c = getCategory(ui.packId);
      const existing = new Set(c.words.map((e) => parseEntry(e)[0].toLowerCase()));
      const fresh = lines.filter((l) => !existing.has(parseEntry(l)[0].toLowerCase()));
      if (c.custom) data.packs[c.id].words.push(...fresh);
      else data.extras[c.id] = (data.extras[c.id] || []).concat(fresh);
      save(); render(); toast(`Added ${plural(fresh.length, "word")}`);
    },
    removeWord: (el) => {
      const c = getCategory(ui.packId); const w = el.dataset.w;
      if (c.custom) data.packs[c.id].words = data.packs[c.id].words.filter((e) => e !== w);
      else data.extras[c.id] = (data.extras[c.id] || []).filter((e) => e !== w);
      save(); render();
    },
    deletePack: () => { const c = getCategory(ui.packId); confirmBox(`Delete “${c.name}”?`, `Its ${plural(c.words.length, "word")} will be removed from this device.`, "Delete", () => { delete data.packs[c.id]; delete data.enabled[c.id]; save(); go("packs"); }, true); },
    shareGame: () => {
      // Share the game itself, never this round's words.
      const url = location.origin + location.pathname.replace(/index\.html$/, "");
      const text = "Infiltrator: a free pass-the-phone party game of secret words and bluffing. One phone, 3–24 players, no app.";
      if (navigator.share) {
        navigator.share({ title: "Infiltrator", text, url }).catch((e) => { if (e && e.name !== "AbortError") copyText(url, "Link copied. Send it to your friends."); });
      } else copyText(url, "Link copied. Send it to your friends.");
    },
    sharePack: () => { const c = getCategory(ui.packId); copyText(exportJSON([c]), "Copied. Paste it to a friend; they import it under Word packs."); },

    /* AI */
    aiOpen: (el) => {
      const target = el.dataset.target || null;
      ui.ai = { target, topic: target ? (getCategory(target) || {}).name || "" : "", count: 30, difficulty: "medium", audience: "all", language: "English", reply: "", result: null, busy: false, error: "", from: ui.screen, server: "checking" };
      go("ai");
      const mine = ui.ai;
      AI.builtInStatus().then((st) => { mine.server = st; if (ui.ai === mine && ui.screen === "ai") render(); });
    },
    aiBack: () => go(ui.ai && ui.ai.from === "pack" ? "pack" : "packs"),
    aiTopic: (el) => { ui.ai.topic = el.dataset.val; render(); },
    aiSet: (el) => { const k = el.dataset.key; ui.ai[k] = k === "count" ? Number(el.dataset.val) : el.dataset.val; render(); },
    aiCopy: () => copyText(AI.buildPrompt(aiOpts()), "Prompt copied. Paste it into your AI chat."),
    aiParse: () => {
      try { ui.ai.result = AI.parseAIReply(ui.ai.reply); ui.ai.error = ""; if (!ui.ai.result.category) ui.ai.result.category = ui.ai.topic; }
      catch (e) { ui.ai.error = e.message; ui.ai.result = null; }
      render(); scrollToResult();
    },
    aiGenerate: async () => {
      ui.ai.busy = true; ui.ai.error = ""; render();
      try {
        const r = await AI.generateWithClaude(aiOpts(), data.ai.key, data.ai.model);
        if (!r.category) r.category = ui.ai.topic;
        ui.ai.result = r;
      } catch (e) { ui.ai.error = e.message; }
      ui.ai.busy = false;
      if (ui.screen === "ai") { render(); scrollToResult(); }
    },
    aiBuiltIn: async () => {
      if (!ui.ai.topic.trim()) { ui.ai.error = "Type a topic first, or tap one of the suggestions."; return render(); }
      ui.ai.busy = true; ui.ai.error = ""; ui.ai.result = null; render();
      try {
        const r = await AI.generateBuiltIn(aiOpts());
        if (!r.category) r.category = ui.ai.topic;
        ui.ai.result = r;
      } catch (e) {
        ui.ai.error = e.message;
        if (e.code === "daily_limit") ui.ai.server = "limit";
      }
      ui.ai.busy = false;
      if (ui.screen === "ai") { render(); scrollToResult(); }
    },
    aiForget: () => { data.ai.key = ""; save(); render(); toast("Key removed from this device"); },
    aiDrop: (el) => { ui.ai.result.entries.splice(Number(el.dataset.i), 1); render(); },
    aiSave: () => {
      const a = ui.ai; const r = a.result;
      if (!r.entries.length) return toast("No words left to save.");
      if (a.target) {
        const c = getCategory(a.target);
        const existing = new Set(c.words.map((e) => parseEntry(e)[0].toLowerCase()));
        const fresh = r.entries.filter((e) => !existing.has(parseEntry(e)[0].toLowerCase()));
        if (c.custom) { data.packs[c.id].words.push(...fresh); data.packs[c.id].hints = Object.assign(data.packs[c.id].hints || {}, r.hints || {}); }
        else { data.extras[c.id] = (data.extras[c.id] || []).concat(fresh); Object.assign(data.extraHints, r.hints || {}); }
        save(); ui.packId = c.id; go("pack"); toast(`Added ${plural(fresh.length, "word")}`);
      } else {
        const id = "c_" + uid();
        data.packs[id] = { id, name: (r.category || a.topic || "AI category").slice(0, 30), icon: r.icon || "✨", words: r.entries, hints: r.hints || {} };
        data.enabled[id] = true; save(); ui.packId = id; go("pack"); toast(`Created “${data.packs[id].name}”`);
      }
    },

    /* transfer */
    exportCopy: () => copyText(exportJSON(Object.values(data.packs)), "Export copied"),
    exportFile: () => {
      try {
        const blob = new Blob([exportJSON(Object.values(data.packs))], { type: "application/json" });
        const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "infiltrator-words.json";
        document.body.appendChild(a); a.click(); a.remove();
      } catch (e) { toast("Download isn't available here. Use Copy export instead."); }
    },
    importText: () => importAny(ui.transfer),

    /* scores */
    scoreScope: (el) => { ui.scoreScope = el.dataset.id; render(); },
    resetScores: (el) => confirmBox("Reset these scores?", "Everyone goes back to zero.", "Reset", () => { delete data.scores[el.dataset.id]; save(); render(); }, true),
    deleteGroup: (el) => {
      const g = data.groups.find((x) => x.id === el.dataset.id);
      confirmBox(`Delete “${g.name}”?`, "The group and its scores will be removed.", "Delete", () => {
        data.groups = data.groups.filter((x) => x.id !== g.id); delete data.scores[g.id];
        if (data.activeGroup === g.id) data.activeGroup = null; ui.scoreScope = null; save(); render();
      }, true);
    },
    playGroup: (el) => { ACT.loadGroup(el); ui.step = 0; go("setup"); },

    modalBtn: (el) => { const fn = modalHandlers[Number(el.dataset.i)]; ui.modal = null; renderOverlay(); if (fn) fn(); }
  };

  function markSeen() {
    if (ui.seen) return;
    ui.seen = true;
    const b = document.getElementById("deal-next"); if (b) b.disabled = false;
  }
  function scrollToResult() { const el = document.getElementById("ai-result") || document.querySelector(".error"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }

  function exportJSON(cats) {
    return JSON.stringify({ app: "infiltrator", version: 1, categories: cats.map((c) => ({ name: c.name, icon: c.icon, words: c.words, hints: c.hints || {} })) }, null, 1);
  }
  function importAny(text) {
    let added = 0;
    try {
      const j = JSON.parse(text);
      if (j && Array.isArray(j.categories)) {
        j.categories.forEach((c) => {
          const words = (c.words || []).map((w) => (typeof w === "string" ? parseEntry(w).join("|") : [w.word].concat(w.similar || []).join("|"))).filter(Boolean);
          if (!words.length) return;
          const id = "c_" + uid();
          const hints = {};
          if (c.hints && typeof c.hints === "object") for (const [k, v] of Object.entries(c.hints)) if (typeof v === "string") hints[String(k).slice(0, 60)] = v.slice(0, 120);
          data.packs[id] = { id, name: String(c.name || "Imported").slice(0, 30), icon: String(c.icon || "📦").slice(0, 4), words, hints };
          data.enabled[id] = true; added++;
        });
      }
    } catch (e) { /* not an export file; try AI/plain formats below */ }
    if (!added) {
      try {
        const r = AI.parseAIReply(text);
        const id = "c_" + uid();
        data.packs[id] = { id, name: (r.category || "Imported").slice(0, 30), icon: r.icon || "📦", words: r.entries, hints: r.hints || {} };
        data.enabled[id] = true; added = 1;
      } catch (e) { return toast(e.message || "Couldn't read that."); }
    }
    ui.transfer = ""; save(); go("packs"); toast(`Imported ${plural(added, "category", "categories")}`);
  }

  function copyText(text, msg) {
    const done = () => toast(msg || "Copied");
    try {
      navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
    } catch (e) { fallbackCopy(text, done); }
  }
  function fallbackCopy(text, done) {
    const ta = document.createElement("textarea");
    ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    let ok = false; try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    ta.remove();
    if (ok) done();
    else modal("Copy this text", `<textarea class="input" rows="8" readonly>${esc(text)}</textarea>`, [{ label: "Close", cls: "btn-primary" }]);
  }

  /* ================================================================
   * Inputs
   * ================================================================ */
  const INPUT = {
    name: (el) => { const p = data.players.find((x) => x.id === el.dataset.id); if (p) { p.name = el.value; save(); } },
    newGroupName: (el) => { ui.newGroupName = el.value; },
    packName: (el) => { const c = data.packs[ui.packId]; if (c) { c.name = el.value.slice(0, 30); save(); const t = document.querySelector(".bar-title"); if (t) t.textContent = c.name; } },
    packIcon: (el) => { const c = data.packs[ui.packId]; if (c) { c.icon = el.value.trim().slice(0, 4); save(); } },
    guessText: (el) => { ui.guessText = el.value; },
    aiTopic: (el) => { ui.ai.topic = el.value; refreshPrompt(); },
    aiLang: (el) => { ui.ai.language = el.value; refreshPrompt(); },
    aiReply: (el) => { ui.ai.reply = el.value; },
    aiKey: (el) => { data.ai.key = el.value.trim(); save(); },
    aiModel: (el) => { data.ai.model = el.value.trim(); save(); },
    aiResName: (el) => { ui.ai.result.category = el.value; },
    aiResIcon: (el) => { ui.ai.result.icon = el.value; },
    transfer: (el) => { ui.transfer = el.value; }
  };
  function refreshPrompt() { const pre = document.getElementById("ai-prompt"); if (pre) pre.textContent = AI.buildPrompt(aiOpts()); }

  /* ================================================================
   * Events
   * ================================================================ */
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-act]");
    if (!t || t.disabled) return;
    const fn = ACT[t.dataset.act];
    if (fn) { if (t.tagName === "A") e.preventDefault(); fn(t, e); }
  });
  document.addEventListener("input", (e) => { const t = e.target; if (t.dataset && t.dataset.input && INPUT[t.dataset.input]) INPUT[t.dataset.input](t); });
  document.addEventListener("change", (e) => {
    const t = e.target;
    if (t.dataset && t.dataset.change === "importFile" && t.files && t.files[0]) {
      const r = new FileReader(); r.onload = () => importAny(String(r.result)); r.readAsText(t.files[0]);
    }
  });
  document.addEventListener("submit", (e) => {
    const f = e.target; if (!f.dataset || f.dataset.form !== "guess") return;
    e.preventDefault();
    const g = G(); const text = ui.guessText.trim();
    if (!text) return toast("Type a guess first.");
    g.guess = { text, correct: norm(text) === norm(g.words.civ) };
    g.phase = "guessResult"; save(); render();
    sfx(g.guess.correct ? "win" : "civilianOut");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.dataset && e.target.dataset.input === "name") {
      const inputs = [...document.querySelectorAll('[data-input="name"]')];
      const i = inputs.indexOf(e.target);
      if (i === inputs.length - 1) ACT.addPlayer(); else inputs[i + 1].focus();
      e.preventDefault();
    }
    if (e.key === "Escape" && (ui.modal || ui.peek)) { ui.modal = null; ui.peek = null; renderOverlay(); }
  });

  // Hold-to-reveal
  const holdOn = (e) => {
    const d = e.target.closest("[data-hold]"); if (!d) return;
    e.preventDefault();
    ui.revealed = true; d.classList.add("is-open"); markSeen(); sfx("reveal"); vibrate(20);
  };
  const holdOff = () => {
    if (!ui.revealed) return;
    const d = document.querySelector("[data-hold].is-open");
    if (d) { ui.revealed = false; d.classList.remove("is-open"); }
  };
  document.addEventListener("pointerdown", holdOn);
  document.addEventListener("pointerup", holdOff);
  document.addEventListener("pointercancel", holdOff);
  document.addEventListener("contextmenu", (e) => { if (e.target.closest("[data-hold]")) e.preventDefault(); });
  document.addEventListener("keydown", (e) => { if ((e.key === " " || e.key === "Enter") && e.target.matches && e.target.matches("[data-hold]") && !e.repeat) holdOn(e); });
  document.addEventListener("keyup", (e) => { if ((e.key === " " || e.key === "Enter") && e.target.matches && e.target.matches("[data-hold]")) holdOff(); });
  document.addEventListener("visibilitychange", () => { if (document.hidden) holdOff(); });

  /* ================================================================
   * Boot
   * ================================================================ */
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    try { navigator.serviceWorker.register("sw.js").catch(() => {}); } catch (e) { /* not available */ }
  }
  render();
})();
