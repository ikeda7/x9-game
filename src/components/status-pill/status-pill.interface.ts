import type { IconName } from '../icon/icon.interface.ts';

export enum StatusPillVariant {
  DEFAULT = 'default',
  DANGER = 'danger',
}

export interface StatusPillProps {
  icon: IconName;
  label: string;
  active: boolean;
  variant?: StatusPillVariant;
  activeColor?: string;
  inactiveColor?: string;
}
