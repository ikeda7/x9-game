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

O app segue uma arquitetura modular com separação por responsabilidade. Cada
tela e componente é organizado em sua própria pasta com arquivos dedicados
para interfaces, hooks, CSS, sub-componentes de layout e o componente principal.

```
src/
  app/
    App.tsx               # componente raiz — conecta hook ao router
    App.hooks.ts          # useGame() — toda a state machine (fases + transições)
    App.interface.ts      # tipos do estado e ações do jogo
    App.layout.tsx        # PhaseRouter — switch que mapeia fase → tela
  main.tsx                # bootstrap React
  index.css               # tokens de design "Noir Cibernético" + classes .x9-*

  common/
    enums/                # enums compartilhados (Phase, Team, VoteMode, ...)
    interfaces/           # interfaces compartilhadas (Player, GameConfig, ...)
    data/
      words.ts            # banco de palavras por categoria + emoji por categoria

  components/             # primitivas e componentes reutilizáveis
    button/               # Button (variantes: primary, danger, ghost, quiet)
    icon/                 # Icon (wrapper kebab-case para lucide-react)
    icon-circle/          # IconCircle (círculo com ícone, usado em resultados)
    logo/                 # Logo (wordmark X9 com glow neon)
    numbered-badge/       # NumberedBadge (badge numérico 01, 02, ...)
    pass-phone/           # PassPhoneView (layout "passe o celular para X")
    screen/               # Screen (shell de tela: fundo + textura + coluna)
    status-pill/          # StatusPill (pill com ícone + label colorido)
    stepper/              # Stepper (+/- com valor numérico)
    texture/              # Texture (ruído + scanlines + vinheta)
    toggle/               # Toggle (switch on/off)

  screens/                # cada tela em sua pasta com 5 arquivos
    home/                 # tela inicial + modal "Como Jogar"
    setup/                # config de partida (jogadores, X9s, categorias, ...)
    reveal/               # distribuição de papéis (segure para ver)
    discussion/           # debate com cronômetro + ordem de fala
    voting/               # votação aberta ou secreta
    round-result/         # resultado da rodada (eliminação, empate, skip)
    game-over/            # fim de jogo (vitória + revelação da palavra)

  game/
    logic.ts              # sorteio de X9 (Fisher–Yates) e condição de vitória
    feedback.ts           # haptic feedback e sons
    storage.ts            # persistência de config no localStorage

public/                   # assets servidos na raiz "/": favicon (svg/ico/png),
                          # ícones PWA, manifest.webmanifest, og-image, splash
```

### Padrão de arquivos por tela

Cada tela segue um padrão de **5 arquivos**:

| Arquivo            | Responsabilidade                                       |
| ------------------ | ------------------------------------------------------ |
| `*.interface.ts`   | Props, tipos de retorno de hooks, props de sub-componentes |
| `*.hooks.ts`       | Hooks customizados e funções puras de lógica           |
| `*.css`            | Estilos via classes CSS (Tailwind `@apply` + tokens)   |
| `*.layout.tsx`     | Sub-componentes visuais (fragmentos de UI)             |
| `*.tsx`            | Componente principal — importa tudo e orquestra        |

Componentes simples em `src/components/` seguem o mesmo padrão com menos
arquivos (`.interface.ts` + `.css` + `.tsx`).

### Design system

A identidade visual ("Noir Cibernético") está documentada em
[.claude/skills/](.claude/skills/) — tokens de cor/tipografia, iconografia
(Lucide) e um UI kit de referência. Os tokens em [src/index.css](src/index.css)
são portados de lá; reutilize as primitivas de
[src/components/](src/components/) e as classes `.x9-*` em vez de re-estilizar
do zero.

Para adicionar palavras, edite [src/common/data/words.ts](src/common/data/words.ts).

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
