# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Commands

```bash
npm run dev      # Vite dev server (HMR)
npm run build    # tsc -b (type-check) THEN vite build — build fails on any type error
npm run preview  # serve the production build locally
```

There is no test runner, linter, or formatter configured. `npm run build` is the
only correctness gate — run it to verify changes type-check and bundle.

## Architecture

Single-page, client-only party game (**"X9 — Jogo do Impostor"**) designed for
**one phone passed around** — there is no networking, no backend, and no
persistence. All game state lives in React `useState` and is lost on refresh.

> The brand is **X9** (Brazilian slang for an informant/snitch). Do **not** use
> the subtitle "O Infiltrado" — a separate game already owns "Infiltrado".

**Stack:** React 18 + TypeScript + Vite. Tailwind CSS v4 is wired via
`@tailwindcss/vite`, but the actual styling follows the **"Noir Cibernético"**
design system: CSS custom-property tokens + `.x9-*` classes in
[src/index.css](src/index.css), applied through inline styles in the
primitives/screens. Icons are [lucide-react](https://lucide.dev).

### State machine is the spine

[src/App.tsx](src/App.tsx) is a single `switch (phase)` state machine holding
_all_ game state and every transition handler. Screens are presentational: they
receive data + callbacks as props and never own game state. To change game flow,
edit `App.tsx`; to change a screen's look, edit the screen.

Phase flow (`Phase` in [src/types.ts](src/types.ts)):

```
home → setup → reveal → discussion → voting → roundResult → (discussion | gameover)
```

`roundResult` branches back to `discussion` or to `gameover` based on `winner`,
which is computed at elimination time and stored.

### Game rules live in one place

[src/game/logic.ts](src/game/logic.ts) owns the two rule-bearing functions:

- `createPlayers` — Fisher–Yates shuffle assigns impostor roles.
- `checkWinner` — civilians win when all impostors are out; impostors win when
  `aliveImpostors >= aliveCivilians` (this single condition also covers the
  classic "2 players left, impostor alive" case).

The impostor-count cap in [SetupScreen](src/screens/SetupScreen.tsx)
(`maxImpostors`) is deliberately tied to `checkWinner`: it limits impostors to
`floor((n-1)/2)` so a game can't be won the instant it starts. Changing the win
condition means revisiting that cap.

### Conventions

- **UI primitives** (`Icon`, `Texture`, `Logo`, `Button`, `Screen`) are in
  [src/components/ui.tsx](src/components/ui.tsx). `Screen` enforces the
  centered, max-width phone layout + textured background every screen uses;
  `Icon` wraps lucide-react with the design kit's kebab-case names. Reuse these
  rather than re-styling.
- **Design tokens** live in `:root` of [src/index.css](src/index.css), ported
  from the design system in [.claude/skills/](.claude/skills/)
  (`colors_and_type.css`). Colors are functional: **purple = civis / safe
  action**, **red = X9 / danger**, **green = victory**. Use the `--neon-*`,
  `--bg-*`, `--glow-*`, `--r-*` vars and `.x9-*` text classes; add new tokens
  here, not ad-hoc hex values.
- **Word bank**: edit [src/data/words.ts](src/data/words.ts). Each `WordEntry`
  has a `hint` (a _similar_ word) shown to the X9 only in "advanced mode"
  (`hintMode`); normal mode shows "???". `emojiForCategory` maps a category to
  its reveal-card emoji.
- All user-facing copy is in **Brazilian Portuguese**.
