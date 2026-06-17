import './button.css';

import { useState } from 'react';

import { Icon } from '../icon/icon.tsx';
import type { ButtonProps } from './button.interface.ts';
import { ButtonSize, ButtonVariant } from './button.interface.ts';

export type { ButtonProps } from './button.interface.ts';
export { ButtonSize, ButtonVariant } from './button.interface.ts';

export function Button({
  children,
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize.LG,
  icon,
  disabled,
  onClick,
  style,
}: ButtonProps) {
  const [press, setPress] = useState(false);

  const className = [
    'x9-btn',
    `x9-btn--${size}`,
    `x9-btn--${variant}`,
    press && !disabled ? 'x9-btn--pressed' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type='button'
      className={className}
      onClick={disabled ? undefined : onClick}
      onPointerDown={() => setPress(true)}
      onPointerUp={() => setPress(false)}
      onPointerLeave={() => setPress(false)}
      disabled={disabled}
      style={style}
    >
      {icon && <Icon name={icon} size={size === ButtonSize.LG ? 20 : 16} />}
      {children}
    </button>
  );
}
