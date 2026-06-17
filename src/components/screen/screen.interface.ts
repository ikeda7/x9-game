import type { CSSProperties, ReactNode } from 'react';

export interface ScreenProps {
  children: ReactNode;
  dark?: boolean;
  style?: CSSProperties;
}
