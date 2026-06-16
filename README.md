# X9 — Jogo do Impostor

> **Um de vocês é o X9.** Descubra quem antes que seja tarde.

[![▶ Jogar agora](https://img.shields.io/badge/▶_jogar_agora-x9--game.vercel.app-B026FF?style=for-the-badge&labelColor=0C0C13)](https://x9-game.vercel.app)
&nbsp;
[![React](https://img.shields.io/badge/React-18-149ECA?style=flat-square&logo=react&logoColor=white&labelColor=0C0C13)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white&labelColor=0C0C13)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white&labelColor=0C0C13)](https://vite.dev)

**🎮 Jogue agora: [x9-game.vercel.app](https://x9-game.vercel.app)**

Jogo de festa (dedução social, família _Spyfall / Impostor_) jogado em **um
único celular**, passado de mão em mão. A maioria são **Civis** que compartilham
uma palavra secreta; um ou mais jogadores são o **X9**, que não conhece a
palavra e precisa blefar sem se entregar.

Sem servidor, sem rede, sem persistência — todo o estado vive em memória e some
ao recarregar. Feito em **React + TypeScript + Vite**, com estética **"Noir
Cibernético"** (grafite, neon roxo, alertas vermelhos). Toda a interface é em
**português do Brasil**.

## Como rodar

```bash
npm install
npm run dev      # servidor de desenvolvimento (HMR)
npm run build    # type-check (tsc -b) + build de produção
npm run preview  # serve o build de produção localmente
```

Abra no navegador do celular (ou use o modo mobile das DevTools).

## Fluxo do jogo

```
home → setup → reveal → discussion → voting → roundResult → (discussion | gameover)
```

- **Home:** marca + entrada da partida.
- **Setup:** adiciona jogadores (mín. 3), define a quantidade de X9s e o modo
  avançado.
- **Reveal:** cada jogador segura o botão para ver seu papel em segredo e passa
  o celular.
- **Discussion:** cronômetro regressivo enquanto o grupo debate.
- **Voting:** o grupo escolhe um suspeito para eliminar.
- **RoundResult / GameOver:** revela o papel do eliminado e o vencedor.

### Regras

- **Modo avançado:** o X9 recebe uma palavra _parecida_ em vez de "???".
- **Civis vencem** quando todos os X9 são eliminados.
- **X9 vence** quando o nº de X9 vivos ≥ civis vivos (inclui o clássico de 2
  jogadores restantes).

## Arquitetura

`src/App.tsx` é uma máquina de estados (`switch (phase)`) que detém **todo** o
estado do jogo e as transições. As telas são apresentacionais: recebem dados +
callbacks por props e nunca guardam estado de jogo.

```
src/
  App.tsx                 # máquina de estados (fases) — a espinha do app
  main.tsx                # bootstrap React
  types.ts                # tipos compartilhados (Phase, Player, WordEntry, ...)
  index.css               # tokens de design "Noir Cibernético" + classes .x9-*
  components/
    ui.tsx                # primitivas: Icon, Texture, Logo, Button, Screen
  data/
    words.ts              # banco de palavras por categoria + emoji por categoria
  game/
    logic.ts              # sorteio de X9 (Fisher–Yates) e condição de vitória
  screens/
    HomeScreen.tsx
    SetupScreen.tsx
    RevealScreen.tsx
    DiscussionScreen.tsx
    VotingScreen.tsx
    RoundResultScreen.tsx
    GameOverScreen.tsx

public/                   # assets servidos na raiz "/": favicon (svg/ico/png),
                          # ícones PWA, manifest.webmanifest, og-image, splash
```

### Design system

A identidade visual ("Noir Cibernético") está documentada em
[.claude/skills/](.claude/skills/) — tokens de cor/tipografia, iconografia
(Lucide) e um UI kit de referência. Os tokens em [src/index.css](src/index.css)
são portados de lá; reutilize as primitivas de
[src/components/ui.tsx](src/components/ui.tsx) e as classes `.x9-*` em vez de
re-estilizar do zero.

Para adicionar palavras, edite [src/data/words.ts](src/data/words.ts).

## Instalar no celular

O app traz um Web App Manifest e ícones, então dá pra usar **"Adicionar à tela
inicial"** e rodar em tela cheia, como um app. Por opção de projeto **não há
service worker** (sem cache offline) — para evitar que um SW desatualizado sirva
uma versão antiga; o [src/main.tsx](src/main.tsx) inclusive desregistra SWs
órfãos da origem ao carregar. As metatags de favicon, manifest e Open Graph
estão no [index.html](index.html); o `og:image` aponta para a URL do deploy.

## Stack

React 18 · TypeScript · Vite 6 · Tailwind CSS v4 (`@tailwindcss/vite`) ·
[lucide-react](https://lucide.dev) · Fontes Google (Chakra Petch, Space Grotesk,
Share Tech Mono).
