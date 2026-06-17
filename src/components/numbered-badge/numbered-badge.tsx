import './numbered-badge.css';

import type { NumberedBadgeProps } from './numbered-badge.interface.ts';

export type { NumberedBadgeProps } from './numbered-badge.interface.ts';

export function NumberedBadge({ index }: NumberedBadgeProps) {
  return (
    <span className='numbered-badge'>{String(index + 1).padStart(2, '0')}</span>
  );
}
