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
- How many impostors: suggested for your group size, an exact number, or a **percentage** of players (scales as people join or leave)
- **No repeat impostors**: whoever was an impostor last game won't be one in the next (unless the group is too small)
- Who can be an impostor: anyone / not the first player / not the first two
- Whether Infiltrators know they're Infiltrators
- Hint for Mr. White: none / category / category + letter count
- Mr. White's last-chance guess
- Round style: one-word clues, one sentence, questions, free talk, act it out, draw it
- Laps before each vote, discussion timer (30 s to 8 min)
- Play until a team wins, or one vote decides
- Reveal or hide roles when someone is voted out
- **💥 Kamikaze**: during a round, a player can bet their life on an accusation. Right: the impostor is out and gets one last guess at the word (typed or said out loud). Wrong: the kamikaze player is out instead. Works in every mode; +3 points for a correct kamikaze
- Random or fixed first speaker
- Surprise twists (sometimes no impostor at all, sometimes an extra one)
- Hold-to-reveal or tap-to-flip cards, scoring, sound/vibration, repeat-word avoidance, light/dark theme

### Extras

- **1,154 word sets in 31 categories** built in, each with similar words for Infiltrators (places, food, movies, brands, Desi life, Bollywood, Greek life, life in China as a foreigner, Shenzhen · HK · Macau, brainrot, pop culture now, kids, party night and more). No word repeats inside a category.
- **Word explanations**: every one of the 3,221 built-in words has a one-line description shown under the secret word (e.g. *Malatang: spicy soup where you pick your own skewers*), so nobody is stuck with a word they don't know. AI-generated categories come with explanations too. Can be switched off.
- **Everyday words mode**: 742 hand-picked easy pairs (both words known to almost anyone, like Coffee / Tea) across every category, for mixed groups and first games. Switch between Everyday and All words in the Words step.
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

Optional variables:

| Variable | Default | What it does |
|---|---|---|
| `DAILY_LIMIT` | `200` | Total AI generations per day (UTC) for the whole site. When it's reached the "Generate words" button switches itself off until midnight UTC, and players see the copy-and-paste option instead. `0` turns the cap off. |
| `RATE_LIMIT` | `12` | Generations per visitor every 10 minutes. |
| `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` | not set | An [Upstash Redis](https://upstash.com/) database for the two limits above. Adding Upstash from the Vercel Marketplace (*Storage → Upstash for Redis*) sets these for you. The older Vercel KV names, `KV_REST_API_URL` and `KV_REST_API_TOKEN`, work too. |
| `GEMINI_MODEL` | `gemini-flash-latest` | Gemini model to try first. |
| `ALLOWED_ORIGINS` | not set | Comma-separated extra sites (e.g. `https://example.com`) allowed to call the generator. |

Without Upstash, the limits are counted in each server instance's memory. That still helps, but Vercel can run several instances and restarts them often, so the real totals can go above the limits. With Upstash, every instance shares the same counters. Visitor IP addresses are hashed before they're stored. If Upstash can't be reached, the function falls back to the in-memory counters.

The key never reaches the browser. The server builds the prompt itself from a few checked options (topic, count, difficulty, audience, language), so the endpoint can only make word lists and can't be used as a free general chatbot. It only accepts requests sent from the game's own pages (the browser's `Origin` header must match the site or `ALLOWED_ORIGINS`). Scripts can fake that header, so the daily cap is what actually protects your quota.

To make sure a traffic spike can't cost you money, use a Gemini key from a Google Cloud project without billing turned on (the free tier stops at its quota instead of charging), and keep `DAILY_LIMIT` below your model's free requests per day.

**GitHub Pages:** in the repository go to *Settings → Pages*, choose *Deploy from a branch*, pick `main` and `/ (root)`, and save. The game will be live at `https://<your-username>.github.io/<repo>/` within a minute.

On GitHub Pages, Netlify or Cloudflare Pages everything works except the built-in generator (players still have the copy-and-paste option).

## Files

```
index.html            App shell and link-preview tags (update the URLs there if the site moves)
og-image.png          1200×630 link-preview image
apple-touch-icon.png  Home-screen icon for iPhone and iPad
css/style.css         All styles (dark "night ops" and light "manila folder" themes)
js/words.js           Built-in word packs, easy pairs and question ideas
js/hints.js           One-line explanations for every built-in word
js/ai.js              AI prompt builder and reply parser (shared with the server), API calls
api/generate.js       Vercel function: Gemini word generation with the key kept server-side
vercel.json           Function settings
js/app.js             Game engine, screens and storage
sw.js                 Offline cache
manifest.webmanifest  Install-as-app metadata
```

All player data (names, groups, scores, custom words, API key) is saved in the browser's `localStorage` on the device.
