export type Phase =
  | 'home'
  | 'setup'
  | 'reveal'
  | 'discussion'
  | 'voting'
  | 'roundResult'
  | 'gameover'

export interface Player {
  id: number
  name: string
  isImpostor: boolean
  alive: boolean
}

export interface WordEntry {
  category: string
  word: string
  /** Emoji ilustrativo da palavra, exibido no card de revelação dos Civis. */
  emoji: string
  /** Palavra parecida mostrada ao impostor no modo avançado (hintMode). */
  hint?: string
}

export type Winner = 'civilians' | 'impostors'

export interface GameConfig {
  names: string[]
  impostorCount: number
  /** Modo avançado: impostor recebe uma dica parecida em vez de "???". */
  hintMode: boolean
  /** Duração da fase de discussão, em segundos. */
  discussionSeconds: number
  /** Categorias habilitadas no sorteio. Vazio = todas. */
  categories: string[]
  /** Votação: 'open' = contagem aberta; 'secret' = passa o celular. */
  voteMode: VoteMode
}

export type VoteMode = 'open' | 'secret'

/** Resultado de uma rodada de votação. */
export type RoundOutcome =
  | { kind: 'eliminated'; player: Player }
  | { kind: 'tie' }
  | { kind: 'skipped' }
