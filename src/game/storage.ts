import type { GameConfig } from '../types'

/**
 * Persistência local (conveniência, não é "backend") da última configuração
 * de partida, para não redigitar tudo a cada jogo. Falha em silêncio se o
 * localStorage não estiver disponível (ex.: modo privado).
 */
const KEY = 'x9.setup.v1'

export function loadSetup(): Partial<GameConfig> | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    return typeof data === 'object' && data ? (data as Partial<GameConfig>) : null
  } catch {
    return null
  }
}

export function saveSetup(cfg: GameConfig): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(cfg))
  } catch {
    /* ignore */
  }
}
