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
  /** Palavra parecida mostrada ao impostor no modo avançado (hintMode). */
  hint?: string
}

export type Winner = 'civilians' | 'impostors'

export interface GameConfig {
  names: string[]
  impostorCount: number
  /** Modo avançado: impostor recebe uma dica parecida em vez de "IMPOSTOR". */
  hintMode: boolean
}
