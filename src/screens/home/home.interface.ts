import type { IconName } from '../../components/icon/icon.interface.ts';

export interface HomeScreenProps {
  onNew: () => void;
}

export interface UseHelpResult {
  showHelp: boolean;
  openHelp: () => void;
  closeHelp: () => void;
}

export interface HowToPlayProps {
  onClose: () => void;
}

export interface RoleCardProps {
  icon: IconName;
  color: string;
  soft: string;
  title: string;
  text: string;
}

export interface StepRowProps {
  index: number;
  text: string;
}

export interface WinRowProps {
  color: string;
  label: string;
  text: string;
}
