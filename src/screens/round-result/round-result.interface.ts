import type { Player } from '../../common/interfaces/player.interface.ts';
import type { NoElimReason } from '../../common/types/no-elim-reason.type.ts';
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
  buttonVariant: 'primary' | 'danger';
}

export interface ResultCardProps {
  config: ResultConfig;
  onContinue: () => void;
}
