# X9: O Infiltrado — Design System

**X9: O Infiltrado** is a mobile-first, pass-and-play **party game** (a social deduction game in the "Spyfall / Impostor" family). Players gather around a *single phone*: most are **Civis** (Civilians) who share a secret word, while one or more **X9** (the infiltrator/impostor) must bluff their way through discussion without knowing it. The phone is passed hand to hand to reveal roles in secret, the group debates, then votes to eliminate a suspect.

The product is a **single web app** designed entirely for **touch on one phone**. Its visual identity is **"Noir Cibernético" (Cyber Noir)**: a very dark graphite-black canvas with subtle film-grain + scanline texture, lit by **vibrant neon purple** accents and **dark/neon red** alerts. The mood is mysterious, tense, and modern — a digital interrogation room.

> **Language:** all product copy is **Brazilian Portuguese (pt-BR)**.

## Sources
This system was built **from scratch** to a written brief (no prior codebase, Figma, or screenshots were provided). The brief specified:
- Brand: *X9 - Jogo do Impostor* / *"X9: O Infiltrado"*
- Aesthetic: *Noir Cibernético* — graphite/black background with subtle texture, vibrant neon-purple borders/details, dark-red alerts.
- Five screen flows: **Home**, **Setup**, **Role Reveal (Wait → Civil → X9)**, **Discussion/Gameplay (timer)**, **Voting + Result**.

There is **no external source of truth** to diverge from — this repo *is* the canonical definition.

---

## CONTENT FUNDAMENTALS

**Language & voice.** All copy is Brazilian Portuguese, written in a **playful, conspiratorial, second-person** voice that speaks *to the player or the group*. It alternates between addressing the individual (`Você é um Civil`) and commanding the group (`Discutam!`, `Quem vai jogar?`). The tone is **tense and theatrical** — it sells suspense and mischief, never corporate friendliness.

**Tone:** mysterious, gamey, a little ominous. Short imperative sentences. Light dramatic flair (`O X9 continua à solta…`, `Era o X9, desmascarado.`).

**Casing:**
- **Buttons & labels:** UPPERCASE with wide letter-spacing (`NOVA PARTIDA`, `INICIAR JOGO`, `CONFIRMAR ELIMINAÇÃO`). Applied via CSS `text-transform`, so source strings stay in natural case (`Confirmar Eliminação`).
- **Headings:** Sentence case (`Quem vai jogar?`, `Quem é o X9?`).
- **Body & instructions:** Sentence case.

**Person:** "você"/"você é" for the individual reveal; the **imperative plural** ("Discutam!", "Fale palavras…") to rally the room.

**Punctuation:** Ellipses build suspense (`continua à solta…`). Exclamations rally (`Blefe!`, `Discutam!`). Question headings frame each decision (`Quem vai jogar?`, `Quem é o X9?`).

**Emoji:** Used **sparingly and only diegetically** — i.e. as the secret *word's* illustration on the reveal card (`🍕 PIZZA`) and the X9's unknown marker (`❓`). Emoji are **not** used as decorative UI chrome, list bullets, or in buttons. UI iconography is handled by a line-icon set (see ICONOGRAPHY), not emoji.

**Sample strings (canonical):**
| Context | String |
|---|---|
| Tagline | `Jogue com amigos em um único celular` |
| Home subhead | `Um de vocês é o infiltrado. Descubra quem antes que seja tarde.` |
| Setup title | `Quem vai jogar?` |
| Setup min-rule | `Mínimo de 3 jogadores` |
| Setup option | `Quantidade de X9s` |
| Reveal wait | `Passe o celular para: [Nome]` |
| Reveal CTA | `Toque para ver sua palavra` |
| Civil role | `Você é um Civil` · `Fale palavras relacionadas, mas não revele a palavra!` |
| X9 role | `Você é o X9` · `Blefe! Tente descobrir a palavra dos Civis e sobreviva.` |
| Reveal dismiss | `Pronto, já vi` |
| Gameplay | `Discutam! O X9 está entre vocês.` |
| Voting | `Quem é o X9?` |
| Result (civis win) | `[Nome] foi eliminado… Era o X9! VITÓRIA DOS CIVIS` |
| Result (continue) | `[Nome] era um Civil! O X9 continua à solta…` |

---

## VISUAL FOUNDATIONS

### Color
A **graphite-black surface stack** lit by two signature neons.
- **Surfaces** climb from `--bg-void` `#07070B` (privacy/reveal screens) → `--bg-base` `#0C0C13` (app) → `--bg-surface` `#14141F` (cards) → `--bg-elevated` `#1C1C2A` (inputs/raised).
- **Neon purple** `#B026FF` is the **primary** brand accent: CTAs, active borders, glows, the Civil team color. Brighter `#C95CFF` for hover/highlights, soft `#D9A8FF` for tinted text on dark.
- **Neon red** `#FF2A4D` (+ deep `#B00020`) is the **X9 / danger / alert** color: impostor cards, the eliminate button, warning timer.
- **Neon green** `#2BFF88` signals **victory / alive / success**.
- **Amber** `#FFC53D` is reserved for timer caution states.
Color is **functional**, never decorative: purple = us/civis/safe-action, red = them/impostor/danger, green = win/alive. Never introduce hues outside this set.

### Typography
- **Display / UI:** **Chakra Petch** — an angular, techy, slightly squared sans. Used for the logo, headings, buttons, and all uppercase labels. This carries the "cyber" half of the identity.
- **Body:** **Space Grotesk** — a clean, readable geometric sans for instructions, player names, body copy.
- **Mono / numeric:** **Share Tech Mono** — a digital-terminal monospace for the **timer**, counters, and index numbers (e.g. `03:00`, `01/04`). This carries the "noir interrogation / countdown" tension.
- **Scale:** display 64px (logo numerals) → h1 34 → h2 26 → h3 20 → body 16 → small 14 → micro 12. Labels are 12px UPPERCASE with `0.14em` tracking.
- *(All three are Google Fonts; if you need offline TTFs, download from Google Fonts — no substitution was required.)*

### Texture & background
Backgrounds are **never flat**. Every screen layers:
1. a **radial wash** of faint purple from the top (and red from the bottom on some screens),
2. a **fractal-noise film grain** at ~4–5% opacity (`overlay` blend),
3. faint **scanlines** (1px purple lines every 3px) at low opacity,
4. a **vignette** darkening the edges.
Reveal/privacy screens drop to near-black (`--bg-void`) with the wash removed, for drama and to hide the screen from onlookers.

### Glow & elevation
Elevation is expressed through **neon glow**, not soft grey shadows.
- `--glow-purple` / `--glow-red` / `--glow-green`: a 1px colored ring + two outer colored blurs. Applied to primary buttons, active cards, the timer, selected items.
- Cards also use a deep ambient drop shadow (`--shadow-card`) plus a 1px inner top highlight for a glassy edge.
- Reveal cards are bordered in **1.5px solid neon** (purple for Civil, red for X9) with a matching inner radial glow at the top.

### Shape & radius
Rounded but not soft: `--r-xs 6` · `sm 10` · `md 14` (default control radius) · `lg 20` · `xl 28` (reveal/result cards) · `pill 999`. Buttons use `md`. Pills are used for counters, role chips, and the flow nav.

### Borders
Hairlines are **low-opacity white** (`--line-soft` 8%) for neutral separation, or **low-opacity neon** (`--line-neon` purple 55% / `--line-danger` red 55%) when an element is active, focused, or important. Inputs shift their border from soft → neon on focus.

### Spacing
8pt base scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64. Screens use 22–28px horizontal padding (thumb-safe). List rows are ~13px vertical padding. Primary CTAs are large (18px vertical padding) for confident touch targets — **all interactive targets ≥ 44px**.

### Motion
Restrained and purposeful. **Press states shrink** (`scale 0.96–0.975`) — the press is the primary feedback. Transitions are short (120–200ms, ease). The role-reveal uses a **press-and-hold** gesture (~650ms) that scales + intensifies the glow before revealing — building tension. The timer counts in 1s ticks and turns **red + glows harder under 30s**. No bouncy/playful easing, no infinite decorative loops on content.

### Hover / press / focus
- **Hover** (where a pointer exists): brighter neon / slightly raised glow.
- **Press:** scale-down + (for buttons) the gradient stays, glow tightens.
- **Focus** (inputs): border soft → neon.
- **Selected** (voting, stepper): filled neon background, ring, and a check.

### Cards
Dark glassy panels: `--bg-surface` fill, 1px soft border (or neon when active), `md`–`xl` radius, deep ambient shadow, optional inner top highlight. Reveal/result cards escalate to a solid neon border + colored glow + top radial tint.

### Transparency & blur
Modal scrims use `--bg-overlay` (near-black 78%) **+ `backdrop-filter: blur(6px)`**. The flow-nav bar and other floating chrome use translucent surfaces with blur. Blur is reserved for **overlay/floating** layers, not base content.

### Imagery
The game uses **no photography**. "Imagery" is the secret-word **emoji** on reveal cards and the **texture/glow system** itself. Avatars are line-icon glyphs in neon-tinted circles, not photos. Keep it cool-toned, dark, and grainy.

---

## ICONOGRAPHY

- **Icon set:** **[Lucide](https://lucide.dev)** (loaded via CDN UMD `lucide.min.js`), rendered through a small `<Icon>` React wrapper (`ui_kits/game/Primitives.jsx`). Lucide's clean **2px-stroke, rounded line** style fits the cyber-noir look. **This is a substitution** — no bespoke icon set was provided in the brief; Lucide is the closest high-quality match. *Flagging for the user: if X9 has (or wants) a custom icon set, swap the `<Icon>` source.*
- **Key glyphs in use:** `play`, `help-circle`, `smartphone`, `chevron-left`, `plus`/`minus`/`x`, `users`, `check-circle-2`, `venetian-mask` (the X9/impostor motif), `shield-check` (Civil), `fingerprint` (the hold-to-reveal gesture), `user`/`user-x`/`skull` (alive/eliminate/dead), `gavel`, `zap`, `eye-off`, `pause`, `flag`, `party-popper`, signal/wifi/battery (status bar).
- **Recurring motifs:** the **venetian mask** = X9/impostor everywhere; **shield-check** = Civil; **fingerprint** = the secret reveal action; **skull / strikethrough** = eliminated players.
- **Emoji:** only as the secret word's illustration on reveal cards (`🍕`, `❓`) — never as UI chrome.
- **Logo:** the "X9" wordmark is rendered in Chakra Petch with a layered neon-purple text-glow and a faint offset **red glitch ghost**, plus an `O INFILTRADO` tracked sub-label. See `Primitives.jsx → Logo`. There is no separate raster logo asset; it is type-driven and lives in code so it scales crisply.

---

## INDEX — what's in this system

| Path | What it is |
|---|---|
| `README.md` | This file — context, content, visual foundations, iconography. |
| `colors_and_type.css` | All design tokens: colors, surfaces, glows, radii, spacing, type families + scale, semantic `.x9-*` text classes, texture helpers. **Import this everywhere.** |
| `SKILL.md` | Agent-Skill manifest so this system can be used as a Claude Skill. |
| `preview/` | Small HTML cards for the Design System tab (type, colors, spacing, components, brand). |
| `ui_kits/game/` | The **X9 game UI kit** — the real product, as an interactive click-through. |
| `ui_kits/game/index.html` | Entry point: full flow Home → Setup → Reveal → Discussion → Voting → Result. |
| `ui_kits/game/Primitives.jsx` | Shared: `Icon`, `Texture`, `Logo`, `Button`, `PhoneFrame`, `StatusBar`. |
| `ui_kits/game/HomeSetup.jsx` | `Screen`, `HomeScreen`, `SetupScreen` (player list, stepper). |
| `ui_kits/game/Reveal.jsx` | `RevealWait` (pass-the-phone), `RevealCard` (Civil / X9). |
| `ui_kits/game/Gameplay.jsx` | `GameplayScreen` (timer), `VotingScreen`, `ResultModal`. |
| `screenshots/` | Reference captures of each screen. |

### Fonts
Loaded from Google Fonts CDN: **Chakra Petch**, **Space Grotesk**, **Share Tech Mono**. No local TTFs are bundled — add them to a `fonts/` folder if you need an offline build.
