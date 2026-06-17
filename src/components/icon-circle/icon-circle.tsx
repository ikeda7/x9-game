import './icon-circle.css';

import { Icon } from '../icon/icon.tsx';
import type { IconCircleProps } from './icon-circle.interface.ts';

export type { IconCircleProps } from './icon-circle.interface.ts';

export function IconCircle({
  icon,
  size = 84,
  iconSize = 40,
  accent,
  accentSoft,
}: IconCircleProps) {
  return (
    <div
      className='icon-circle'
      style={{
        width: size,
        height: size,
        border: `1.5px solid ${accent}`,
        boxShadow: `0 0 26px -6px ${accent}`,
      }}
    >
      <Icon name={icon} size={iconSize} color={accentSoft} />
    </div>
  );
}
