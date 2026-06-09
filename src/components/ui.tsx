import type { CSSProperties, ReactNode } from 'react'
import { useState } from 'react'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  EyeOff,
  Fingerprint,
  Flag,
  Gavel,
  HelpCircle,
  Minus,
  PartyPopper,
  Pause,
  Play,
  Plus,
  ShieldCheck,
  Skull,
  Smartphone,
  User,
  UserX,
  Users,
  VenetianMask,
  X,
  Zap,
  type LucideIcon,
} from 'lucide-react'

// ============================================================
// X9 — Iconografia (Lucide)
// `<Icon name="venetian-mask" />` mantém a API kebab-case do design kit.
// ============================================================
const ICONS: Record<string, LucideIcon> = {
  'arrow-right': ArrowRight,
  check: Check,
  'check-circle-2': CheckCircle2,
  'chevron-left': ChevronLeft,
  'eye-off': EyeOff,
  fingerprint: Fingerprint,
  flag: Flag,
  gavel: Gavel,
  'help-circle': HelpCircle,
  minus: Minus,
  'party-popper': PartyPopper,
  pause: Pause,
  play: Play,
  plus: Plus,
  'shield-check': ShieldCheck,
  skull: Skull,
  smartphone: Smartphone,
  user: User,
  'user-x': UserX,
  users: Users,
  'venetian-mask': VenetianMask,
  x: X,
  zap: Zap,
}

export type IconName = keyof typeof ICONS

export function Icon({
  name,
  size = 20,
  strokeWidth = 2,
  color = 'currentColor',
  style,
}: {
  name: IconName
  size?: number
  strokeWidth?: number
  color?: string
  style?: CSSProperties
}) {
  const Glyph = ICONS[name]
  if (!Glyph) return null
  return (
    <span style={{ display: 'inline-flex', lineHeight: 0, color, ...style }}>
      <Glyph size={size} strokeWidth={strokeWidth} />
    </span>
  )
}

// ============================================================
// X9 — Camada de textura (ruído + scanlines + vinheta)
// ============================================================
export function Texture({ scanlines = true, vignette = true }: { scanlines?: boolean; vignette?: boolean }) {
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.05,
          mixBlendMode: 'overlay',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {scanlines && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.4,
            backgroundImage:
              'repeating-linear-gradient(to bottom, rgba(176,38,255,0.05) 0px, rgba(176,38,255,0.05) 1px, transparent 1px, transparent 3px)',
          }}
        />
      )}
      {vignette && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(120% 80% at 50% -10%, rgba(176,38,255,0.12), transparent 55%), radial-gradient(120% 90% at 50% 110%, rgba(0,0,0,0.6), transparent 60%)',
          }}
        />
      )}
    </div>
  )
}

// ============================================================
// X9 — Shell de tela: fundo + textura + coluna centralizada (largura de celular)
// ============================================================
export function Screen({
  children,
  dark = false,
  style,
}: {
  children: ReactNode
  dark?: boolean
  style?: CSSProperties
}) {
  return (
    <div
      style={{
        minHeight: '100dvh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        background: dark
          ? 'radial-gradient(120% 70% at 50% 0%, #0d0a14 0%, #07070b 70%)'
          : 'radial-gradient(130% 80% at 50% -5%, #16101f 0%, #0c0c13 55%)',
      }}
    >
      <Texture vignette={!dark} scanlines />
      <div
        className="animate-screen-in"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: 440,
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  )
}

// ============================================================
// X9 — Logo (wordmark com glow neon + ghost glitch vermelho)
// `tagline` opcional exibe um sub-rótulo abaixo da marca.
// ============================================================
export function Logo({ size = 72, tagline }: { size?: number; tagline?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ position: 'relative', lineHeight: 1 }}>
        <span
          style={{
            position: 'absolute',
            left: -2,
            top: 1,
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: size,
            letterSpacing: '0.02em',
            color: 'var(--neon-red)',
            opacity: 0.55,
            filter: 'blur(0.5px)',
          }}
        >
          X9
        </span>
        <span
          style={{
            position: 'relative',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: size,
            letterSpacing: '0.02em',
            color: 'var(--text-hi)',
            textShadow:
              '0 0 8px rgba(176,38,255,0.9), 0 0 28px rgba(176,38,255,0.6), 0 0 60px rgba(176,38,255,0.35)',
          }}
        >
          X9
        </span>
      </div>
      {tagline && (
        <div
          className="x9-label"
          style={{ color: 'var(--neon-purple-soft)', letterSpacing: '0.34em', fontSize: 11, paddingLeft: '0.34em' }}
        >
          {tagline}
        </div>
      )}
    </div>
  )
}

// ============================================================
// X9 — Botão
// ============================================================
type Variant = 'primary' | 'danger' | 'ghost' | 'quiet'
type Size = 'lg' | 'md' | 'sm'

const SIZES: Record<Size, CSSProperties> = {
  lg: { padding: '18px 22px', fontSize: 17 },
  md: { padding: '13px 18px', fontSize: 14 },
  sm: { padding: '9px 14px', fontSize: 12 },
}

export function Button({
  children,
  variant = 'primary',
  size = 'lg',
  icon,
  disabled,
  onClick,
  style,
}: {
  children: ReactNode
  variant?: Variant
  size?: Size
  icon?: IconName
  disabled?: boolean
  onClick?: () => void
  style?: CSSProperties
}) {
  const [press, setPress] = useState(false)

  const variants: Record<Variant, CSSProperties> = {
    primary: {
      background: disabled ? '#241b33' : 'linear-gradient(180deg, #C95CFF 0%, #B026FF 55%, #8E12E0 100%)',
      color: disabled ? 'var(--text-low)' : 'var(--text-on-neon)',
      boxShadow: disabled ? 'none' : 'var(--glow-purple), inset 0 1px 0 rgba(255,255,255,0.35)',
      borderColor: disabled ? 'var(--line-soft)' : 'transparent',
    },
    danger: {
      background: disabled ? '#2a1620' : 'linear-gradient(180deg, #FF4D68 0%, #FF2A4D 55%, #C1121F 100%)',
      color: '#fff',
      boxShadow: disabled ? 'none' : 'var(--glow-red), inset 0 1px 0 rgba(255,255,255,0.25)',
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
  }

  return (
    <button
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
        transition: 'transform .12s ease, box-shadow .2s ease, background .2s ease, opacity .2s',
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
  )
}
