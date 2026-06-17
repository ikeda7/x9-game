import { Team } from '../../common/enums/team.enum.ts';
import type { Player } from '../../common/interfaces/player.interface.ts';
import type { GameOverConfig } from './game-over.interface.ts';

export function computeGameOverConfig(
  winner: Team,
  players: Player[],
): GameOverConfig {
  const civsWon = winner === Team.CIVILIANS;
  const impostors = players.filter((p) => p.isImpostor);

  return {
    civsWon,
    accent: civsWon ? 'var(--neon-green)' : 'var(--neon-red)',
    accentSoft: civsWon ? '#9CFFC8' : '#FF8095',
    glow: civsWon ? 'var(--glow-green)' : 'var(--glow-red)',
    impostors,
  };
}
