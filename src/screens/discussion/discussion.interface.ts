import type { Player } from '../../common/interfaces/player.interface.ts';

export interface DiscussionScreenProps {
  players: Player[];
  starterId: number | null;
  durationSeconds: number;
  onVote: () => void;
}

export interface UseDiscussionTimerResult {
  mm: string;
  ss: string;
  done: boolean;
  warn: boolean;
  running: boolean;
  toggle: () => void;
}

export type TimerPanelProps = UseDiscussionTimerResult;

export interface StarterBadgeProps {
  name: string | undefined;
}

export interface PlayerOrderListProps {
  order: Player[];
  eliminated: Player[];
}
