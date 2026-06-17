import type { VoteMode } from '../../common/enums/vote-mode.enum.ts';
import type { GameConfig } from '../../common/interfaces/game-config.ts';

export interface SetupScreenProps {
  onStart: (config: GameConfig) => void;
  onBack: () => void;
}

export interface UseSetupFormResult {
  players: string[];
  name: string;
  setName: (v: string) => void;
  impostors: number;
  hintMode: boolean;
  duration: number;
  categories: string[];
  voteMode: VoteMode;
  enough: boolean;
  cap: number;
  canStart: boolean;
  add: () => void;
  remove: (i: number) => void;
  setImpostors: (n: number) => void;
  setDuration: (s: number) => void;
  setVoteMode: (m: VoteMode) => void;
  toggleCategory: (cat: string) => void;
  toggleHintMode: () => void;
  start: () => void;
}

export interface SetupHeaderProps {
  onBack: () => void;
}

export interface PlayerCountPillProps {
  enough: boolean;
  count: number;
  min: number;
}

export interface PlayerRowProps {
  name: string;
  index: number;
  onRemove: () => void;
}

export interface PlayerInputProps {
  name: string;
  onNameChange: (v: string) => void;
  onAdd: () => void;
}

export interface StepperProps {
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}

export interface ToggleProps {
  on: boolean;
}

export interface DurationPickerProps {
  duration: number;
  onSelect: (s: number) => void;
}

export interface VoteModePickerProps {
  voteMode: VoteMode;
  onSelect: (m: VoteMode) => void;
}

export interface CategoryPickerProps {
  categories: string[];
  allCategories: string[];
  onToggle: (cat: string) => void;
}
