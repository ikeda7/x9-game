import { VoteMode } from "../enums/vote-mode.enum"

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