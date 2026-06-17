import type { CSSProperties, ReactNode } from 'react';

import type { IconName } from '../icon/icon.interface.ts';

export type ButtonVariant = 'primary' | 'danger' | 'ghost' | 'quiet';
export type ButtonSize = 'lg' | 'md' | 'sm';

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  disabled?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
}
