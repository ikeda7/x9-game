import type { Phase } from '../common/enums/phase.enum.ts';
import type { Team } from '../common/enums/team.enum.ts';
import type { GameConfig } from '../common/interfaces/game-config.ts';
import type { Player } from '../common/interfaces/player.interface.ts';
import type { WordEntry } from '../common/interfaces/word-entry.interface.ts';
import type { NoElimReason } from '../common/types/no-elim-reason.type.ts';

export type { NoElimReason } from '../common/types/no-elim-reason.type.ts';

export interface GameState {
  phase: Phase;
  config: GameConfig | null;
  players: Player[];
  word: WordEntry | null;
  lastEliminated: Player | null;
  noElimReason: NoElimReason | null;
  winner: Team | null;
  starterId: number | null;
  round: number;
}

export interface GameActions {
  goToSetup: () => void;
  startGame: (cfg: GameConfig) => void;
  goToVoting: () => void;
  eliminate: (playerId: number) => void;
  resolveNoElimination: (reason: NoElimReason) => void;
  continueAfterResult: () => void;
  playAgain: () => void;
  newSetup: () => void;
  backToHome: () => void;
  goToDiscussion: (list?: Player[]) => void;
}

export interface UseGameResult {
  state: GameState;
  actions: GameActions;
}
