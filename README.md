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

- **866 word sets in 26 categories** built in, each with similar words for Infiltrators (places, food, movies, brands, Desi life, Bollywood, kids, party night and more).
- **Your own categories**: create them, paste lists (`Coffee | Tea` adds a similar word), or add words to the built-in ones.
- **AI-generated categories** on any topic, two ways:
  - **Free**: copy a ready-made prompt into ChatGPT, Claude or Gemini and paste the reply back.
  - **Instant**: use your own Claude API key. The key is stored only in your browser and sent only to Anthropic's API.
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

**GitHub Pages:** in the repository go to *Settings → Pages*, choose *Deploy from a branch*, pick `main` and `/ (root)`, and save. The game will be live at `https://<your-username>.github.io/<repo>/` within a minute.

Netlify, Vercel or Cloudflare Pages work too: point them at this folder with no build command.

## Files

```
index.html            App shell
css/style.css         All styles (dark "night ops" and light "manila folder" themes)
js/words.js           Built-in word packs and question ideas
js/ai.js              AI prompt builder, reply parser, Claude API call
js/app.js             Game engine, screens and storage
sw.js                 Offline cache
manifest.webmanifest  Install-as-app metadata
```

All player data (names, groups, scores, custom words, API key) is saved in the browser's `localStorage` on the device.
