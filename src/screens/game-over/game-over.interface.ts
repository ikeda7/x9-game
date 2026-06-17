import type { Team } from '../../common/enums/team.enum.ts';
import type { Player } from '../../common/interfaces/player.interface.ts';
import type { WordEntry } from '../../common/interfaces/word-entry.interface.ts';

export interface GameOverScreenProps {
  winner: Team;
  players: Player[];
  word: WordEntry;
  onPlayAgain: () => void;
  onNewSetup: () => void;
}

export interface GameOverConfig {
  civsWon: boolean;
  accent: string;
  accentSoft: string;
  glow: string;
  impostors: Player[];
}

export interface VictoryHeaderProps {
  civsWon: boolean;
  accentSoft: string;
  glow: string;
  accent: string;
}

export interface WordRevealProps {
  word: WordEntry;
}

export interface ImpostorListProps {
  impostors: Player[];
}

export interface GameOverActionsProps {
  onPlayAgain: () => void;
  onNewSetup: () => void;
}
