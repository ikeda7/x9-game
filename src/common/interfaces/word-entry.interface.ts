export interface WordEntry {
  category: string
  word: string
  /** Emoji ilustrativo da palavra, exibido no card de revelação dos Civis. */
  emoji: string
  /** Palavra parecida mostrada ao impostor no modo avançado (hintMode). */
  hint?: string
}