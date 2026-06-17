import type { ReactNode } from 'react';

export interface PassPhoneViewProps {
  index: number;
  total: number;
  label: string;
  playerName: string;
  hint: string;
  children: ReactNode;
}
