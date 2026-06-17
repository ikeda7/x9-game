import type { CSSProperties, ReactNode } from 'react';

import type { IconName } from '../icon/icon.interface.ts';

export enum ButtonVariant {
  PRIMARY = 'primary',
  DANGER = 'danger',
  GHOST = 'ghost',
  QUIET = 'quiet',
}

export enum ButtonSize {
  LG = 'lg',
  MD = 'md',
  SM = 'sm',
}

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  disabled?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
}
