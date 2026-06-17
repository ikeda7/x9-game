import type { CSSProperties } from 'react';

export type IconName =
  | 'arrow-right'
  | 'check'
  | 'check-circle-2'
  | 'chevron-left'
  | 'eye-off'
  | 'fingerprint'
  | 'flag'
  | 'gavel'
  | 'help-circle'
  | 'minus'
  | 'party-popper'
  | 'pause'
  | 'play'
  | 'plus'
  | 'shield-check'
  | 'skull'
  | 'smartphone'
  | 'user'
  | 'user-x'
  | 'users'
  | 'venetian-mask'
  | 'x'
  | 'zap';

export interface IconProps {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  color?: string;
  style?: CSSProperties;
}
