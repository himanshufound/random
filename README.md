# Infiltrator

A free, pass-the-phone party game of secret words and bluffing, in the style of Undercover, Mr. White and Spyfall. One phone, 3–24 players, no accounts, no server. Works offline once loaded.

## How it plays

1. **Deal.** Pass the phone around. Each player presses and holds their card to see their secret word.
2. **Talk.** Take turns describing your word without saying it (one-word clues, a sentence, questions, mime or drawing).
3. **Vote.** Either secretly on the phone or by pointing in real life. The player with the most votes is out.
4. **Repeat** until the civilians catch every impostor or the impostors take over.

### Roles

| Role | Gets | Goal |
|---|---|---|
| Civilian | The main word (e.g. *Coffee*) | Find the impostors |
| Infiltrator (Undercover) | A similar word (e.g. *Tea*) | Blend in and survive |
| Mr. White / Spy | No word (optional category hint) | Bluff, or guess the word when caught to steal the win |

### Modes

- **Undercover**: civilians against Infiltrators who have a similar word.
- **Mr. White**: one player gets no word at all.
- **Undercover + Mr. White**: both at once.
- **Spy**: Spyfall-style questions and a single deciding vote.

Every rule can be changed after picking a mode, and each setting has a **?** that explains it:

- Anonymous (pass the phone) or real-life voting
- Who can be an impostor: anyone / not the first player / not the first two
- Whether Infiltrators know they're Infiltrators
- Hint for Mr. White: none / category / category + letter count
- Mr. White's last-chance guess
- Round style: one-word clues, one sentence, questions, free talk, act it out, draw it
- Laps before each vote, discussion timer (30 s to 8 min)
- Play until a team wins, or one vote decides
- Reveal or hide roles when someone is voted out
- Random or fixed first speaker
- Surprise twists (sometimes no impostor at all, sometimes an extra one)
- Hold-to-reveal or tap-to-flip cards, scoring, sound/vibration, repeat-word avoidance, light/dark theme

### Extras

- **1,053 word sets in 30 categories** built in, each with similar words for Infiltrators (places, food, movies, brands, Desi life, Bollywood, life in China as a foreigner, Shenzhen · HK · Macau, brainrot, pop culture now, kids, party night and more).
- **Your own categories**: create them, paste lists (`Coffee | Tea` adds a similar word), or add words to the built-in ones.
- **AI-generated categories** on any topic:
  - **Built in (free for players)**: one tap. The site calls Google Gemini through a small server function that keeps the site owner's key secret. Needs Vercel hosting (see below).
  - **Any chatbot**: copy a ready-made prompt into ChatGPT, Claude or Gemini and paste the reply back. Works everywhere, no key.
  - **Own Claude key** (advanced): stored only in the player's browser and sent only to Anthropic's API.
- **Import / export** categories to share with friends.
- **Groups**: save your regular crew and start in two taps.
- **Scores and leaderboards** per group.
- **Peek again** if someone forgets their word, a question-idea generator for the Questions style, a timer with buzzer, confetti for the winners.
- Installable as an app (PWA) and playable offline.

## Run it

It's a static site, so no build step is needed.

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

### Put it online for free

**Vercel (recommended, enables the built-in AI generator):**

1. Import this repository at [vercel.com/new](https://vercel.com/new). No build settings are needed.
2. Get a free Gemini key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey).
3. In the Vercel project go to *Settings → Environment Variables* and add `GEMINI_API_KEY` with that key (Production and Preview).
4. Redeploy. The "Generate words" button now appears for everyone.

Optional variables: `GEMINI_MODEL` (default `gemini-flash-latest`), `RATE_LIMIT` (generations per visitor per 10 minutes, default 12), `ALLOWED_ORIGINS` (extra sites allowed to call the generator).

The key never reaches the browser. The server builds the prompt itself from a few checked options (topic, count, difficulty, audience, language), so the endpoint can only make word lists and can't be used as a free general chatbot.

**GitHub Pages:** in the repository go to *Settings → Pages*, choose *Deploy from a branch*, pick `main` and `/ (root)`, and save. The game will be live at `https://<your-username>.github.io/<repo>/` within a minute.

On GitHub Pages, Netlify or Cloudflare Pages everything works except the built-in generator (players still have the copy-and-paste option).

## Files

```
index.html            App shell
css/style.css         All styles (dark "night ops" and light "manila folder" themes)
js/words.js           Built-in word packs and question ideas
js/ai.js              AI prompt builder and reply parser (shared with the server), API calls
api/generate.js       Vercel function: Gemini word generation with the key kept server-side
vercel.json           Function settings
js/app.js             Game engine, screens and storage
sw.js                 Offline cache
manifest.webmanifest  Install-as-app metadata
```

All player data (names, groups, scores, custom words, API key) is saved in the browser's `localStorage` on the device.
