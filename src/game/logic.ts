import { Team } from '../common/enums/team.enum.ts';
import type { Player } from '../common/interfaces/player.interface.ts';

/** Sorteia quais jogadores serão impostores e monta a lista inicial. */
export function createPlayers(
  names: string[],
  impostorCount: number,
): Player[] {
  const indices = names.map((_, i) => i);
  // Embaralha (Fisher–Yates) e pega os primeiros N como impostores.
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const impostorIds = new Set(indices.slice(0, impostorCount));

  return names.map((name, i) => ({
    id: i,
    name: name.trim() || `Jogador ${i + 1}`,
    isImpostor: impostorIds.has(i),
    alive: true,
  }));
}

/**
 * Verifica o vencedor após uma eliminação.
 * - Civis vencem quando todos os impostores são eliminados.
 * - Impostores vencem quando o número de impostores vivos >= civis vivos
 *   (incl. o clássico: sobram 2 jogadores e o impostor está vivo).
 * - `null` significa que o jogo continua.
 */
export function checkWinner(players: Player[]): Team | null {
  const alive = players.filter((p) => p.alive);
  const impostors = alive.filter((p) => p.isImpostor).length;
  const civilians = alive.length - impostors;

  if (impostors === 0) return Team.CIVILIANS;
  if (impostors >= civilians) return Team.IMPOSTORS;
  return null;
}
