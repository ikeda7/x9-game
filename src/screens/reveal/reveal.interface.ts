import type { Player } from '../../common/interfaces/player.interface.ts';
import type { WordEntry } from '../../common/interfaces/word-entry.interface.ts';

export interface RevealScreenProps {
  players: Player[];
  word: WordEntry;
  hintMode: boolean;
  onDone: () => void;
}

export interface UseRevealFlowResult {
  player: Player;
  isLast: boolean;
  revealed: boolean;
  index: number;
  total: number;
  reveal: () => void;
  next: () => void;
}

export interface UseHoldToRevealResult {
  holding: boolean;
  start: () => void;
  cancel: () => void;
}

export interface RevealWaitProps {
  playerName: string;
  index: number;
  total: number;
  onReveal: () => void;
}

export interface RevealCardProps {
  player: Player;
  word: WordEntry;
  hintMode: boolean;
  index: number;
  total: number;
  last: boolean;
  onNext: () => void;
}
