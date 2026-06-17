import './status-pill.css';

import { Icon } from '../icon/icon.tsx';
import type { StatusPillProps } from './status-pill.interface.ts';
import { StatusPillVariant } from './status-pill.interface.ts';

export type { StatusPillProps } from './status-pill.interface.ts';
export { StatusPillVariant } from './status-pill.interface.ts';

function getClassName(active: boolean, variant: StatusPillVariant) {
  if (variant === StatusPillVariant.DANGER)
    return 'status-pill status-pill--danger';
  return `status-pill ${active ? 'status-pill--active' : 'status-pill--inactive'}`;
}

export function StatusPill({
  icon,
  label,
  active,
  variant = StatusPillVariant.DEFAULT,
  activeColor = 'var(--neon-purple-soft)',
  inactiveColor = 'var(--text-low)',
}: StatusPillProps) {
  const color = active ? activeColor : inactiveColor;
  return (
    <div className={getClassName(active, variant)}>
      <Icon name={icon} size={15} color={color} />
      <span className='x9-label status-pill__label' style={{ color }}>
        {label}
      </span>
    </div>
  );
}
