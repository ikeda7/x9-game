import { type CSSProperties, type ReactNode, useState } from 'react';

import { Icon, type IconName } from '../icon/icon.tsx';

// ============================================================
// X9 — Botão
// ============================================================
type Variant = 'primary' | 'danger' | 'ghost' | 'quiet';
type Size = 'lg' | 'md' | 'sm';

const SIZES: Record<Size, CSSProperties> = {
  lg: { padding: '18px 22px', fontSize: 17 },
  md: { padding: '13px 18px', fontSize: 14 },
  sm: { padding: '9px 14px', fontSize: 12 },
};

export function Button({
  children,
  variant = 'primary',
  size = 'lg',
  icon,
  disabled,
  onClick,
  style,
}: {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  disabled?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
}) {
  const [press, setPress] = useState(false);

  const variants: Record<Variant, CSSProperties> = {
    primary: {
      background: disabled
        ? '#241b33'
        : 'linear-gradient(180deg, #C95CFF 0%, #B026FF 55%, #8E12E0 100%)',
      color: disabled ? 'var(--text-low)' : 'var(--text-on-neon)',
      boxShadow: disabled
        ? 'none'
        : 'var(--glow-purple), inset 0 1px 0 rgba(255,255,255,0.35)',
      borderColor: disabled ? 'var(--line-soft)' : 'transparent',
    },
    danger: {
      background: disabled
        ? '#2a1620'
        : 'linear-gradient(180deg, #FF4D68 0%, #FF2A4D 55%, #C1121F 100%)',
      color: '#fff',
      boxShadow: disabled
        ? 'none'
        : 'var(--glow-red), inset 0 1px 0 rgba(255,255,255,0.25)',
      borderColor: 'transparent',
    },
    ghost: {
      background: 'rgba(176,38,255,0.06)',
      color: 'var(--neon-purple-soft)',
      borderColor: 'var(--line-neon)',
      boxShadow: 'inset 0 0 18px -8px rgba(176,38,255,0.6)',
    },
    quiet: {
      background: 'transparent',
      color: 'var(--text-mid)',
      borderColor: 'var(--line-soft)',
    },
  };

  return (
    <button
      type='button'
      onClick={disabled ? undefined : onClick}
      onPointerDown={() => setPress(true)}
      onPointerUp={() => setPress(false)}
      onPointerLeave={() => setPress(false)}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        width: '100%',
        border: '1px solid transparent',
        borderRadius: 'var(--r-md)',
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition:
          'transform .12s ease, box-shadow .2s ease, background .2s ease, opacity .2s',
        transform: press && !disabled ? 'scale(0.975)' : 'scale(1)',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        opacity: disabled ? 0.6 : 1,
        ...SIZES[size],
        ...variants[variant],
        ...style,
      }}
    >
      {icon && <Icon name={icon} size={size === 'lg' ? 20 : 16} />}
      {children}
    </button>
  );
}
