import type { VoteMode } from '../../common/enums/vote-mode.enum.ts';
import type { Player } from '../../common/interfaces/player.interface.ts';

export interface VotingScreenProps {
  mode: VoteMode;
  players: Player[];
  onEliminate: (playerId: number) => void;
  onTie: () => void;
  onSkip: () => void;
}

export interface UseOpenVotingResult {
  alive: Player[];
  votes: Record<number, number>;
  total: number;
  remaining: number;
  inc: (id: number) => void;
  dec: (id: number) => void;
  apurar: () => void;
}

export interface UseSecretVotingResult {
  alive: Player[];
  voter: Player;
  isLast: boolean;
  suspects: Player[];
  step: 'pass' | 'ballot';
  selected: number | null;
  setSelected: (id: number) => void;
  openBallot: () => void;
  commit: (choice: number | null) => void;
}

export interface OpenPlayerRowProps {
  player: Player;
  voteCount: number;
  canVote: boolean;
  onInc: () => void;
  onDec: () => void;
}

export interface SecretPassViewProps {
  voterName: string;
  voterIndex: number;
  totalVoters: number;
  onOpen: () => void;
}

export interface SecretBallotViewProps {
  voterName: string;
  suspects: Player[];
  selected: number | null;
  isLast: boolean;
  onSelect: (id: number) => void;
  onCommit: (choice: number | null) => void;
}
