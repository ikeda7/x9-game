import type { NoElimReason } from '../../common/enums/no-elim-reason.enum.ts';
import type { Player } from '../../common/interfaces/player.interface.ts';
import type { ButtonVariant } from '../../components/button/button.interface.ts';
import type { IconName } from '../../components/icon/icon.interface.ts';

export interface RoundResultScreenProps {
  eliminated: Player | null;
  noElimReason: NoElimReason | null;
  remainingImpostors: number;
  onContinue: () => void;
}

export interface ResultConfig {
  accent: string;
  accentSoft: string;
  glow: string;
  icon: IconName;
  title: string;
  subtitle: string;
  banner: string;
  bannerBg: string;
  buttonVariant: ButtonVariant;
}

export interface ResultCardProps {
  config: ResultConfig;
  onContinue: () => void;
}
