import './status-pill.css';

import { Icon } from '../icon/icon.tsx';
import type { StatusPillProps } from './status-pill.interface.ts';

export type { StatusPillProps } from './status-pill.interface.ts';

export function StatusPill({
  icon,
  label,
  active,
  activeColor = 'var(--neon-purple-soft)',
  inactiveColor = 'var(--text-low)',
}: StatusPillProps) {
  const color = active ? activeColor : inactiveColor;
  return (
    <div
      className={`status-pill ${active ? 'status-pill--active' : 'status-pill--inactive'}`}
    >
      <Icon name={icon} size={15} color={color} />
      <span className='x9-label status-pill__label' style={{ color }}>
        {label}
      </span>
    </div>
  );
}
