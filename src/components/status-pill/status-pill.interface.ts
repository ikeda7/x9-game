import type { IconName } from '../icon/icon.interface.ts';

export interface StatusPillProps {
  icon: IconName;
  label: string;
  active: boolean;
  activeColor?: string;
  inactiveColor?: string;
}
