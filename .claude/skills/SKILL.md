---
name: x9-design
description: Use this skill to generate well-branded interfaces and assets for "X9: O Infiltrado" (Jogo do Impostor), a mobile pass-and-play party game with a "Noir Cibernético" aesthetic — graphite-black surfaces, vibrant neon-purple accents, dark-red alerts. Use for production UI or throwaway prototypes/mocks. Contains design guidelines, color & type tokens, icon usage, and a full game UI kit.
user-invocable: true
---

Read the `README.md` file within this skill for the full context, content voice, visual foundations, and iconography. Then explore the other files:

- `colors_and_type.css` — all design tokens (colors, surfaces, glows, radii, spacing, type families + scale, `.x9-*` text classes, texture helpers). **Link this in every artifact.**
- `ui_kits/game/` — the real product as an interactive click-through. `Primitives.jsx` (Icon, Texture, Logo, Button, PhoneFrame, StatusBar), `HomeSetup.jsx`, `Reveal.jsx`, `Gameplay.jsx`, and `index.html` wiring the full flow.
- `preview/` — small specimen cards (colors, type, spacing, components, brand).

**Core rules to honor:**
- Language is **Brazilian Portuguese (pt-BR)**. Voice is playful, conspiratorial, second-person; tense and theatrical.
- Color is functional: **purple = civis / primary action / safe**, **red = X9 / danger / eliminate**, **green = victory / alive**. Never add hues outside the token set.
- Fonts: **Chakra Petch** (display/UI/buttons, UPPERCASE labels via CSS), **Space Grotesk** (body), **Share Tech Mono** (timer/numbers). Load from Google Fonts.
- Backgrounds are never flat: graphite + radial wash + noise grain + scanlines + vignette. Elevation = **neon glow**, not grey shadow.
- Icons: **Lucide** (CDN). Recurring motifs: `venetian-mask`=X9, `shield-check`=Civil, `fingerprint`=reveal gesture, `skull`/strikethrough=eliminated. Emoji ONLY as the secret word on reveal cards.
- Touch-first: targets ≥44px, press states shrink (~scale 0.96), short transitions.

If creating visual artifacts (slides, mocks, throwaway prototypes), **copy assets out** of this skill and create static/standalone HTML files for the user to view. If working on production code, copy assets and apply these rules to become an expert in the X9 brand.

If the user invokes this skill without other guidance, ask what they want to build, ask a few focused questions, and act as an expert mobile-game designer who outputs HTML artifacts or production code as needed.
