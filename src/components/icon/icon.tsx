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
  type LucideIcon,
  Minus,
  PartyPopper,
  Pause,
  Play,
  Plus,
  ShieldCheck,
  Skull,
  Smartphone,
  User,
  Users,
  UserX,
  VenetianMask,
  X,
  Zap,
} from 'lucide-react';

import type { IconName, IconProps } from './icon.interface.ts';

export type { IconName, IconProps } from './icon.interface.ts';

const ICONS: Record<IconName, LucideIcon> = {
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
};

export function Icon({
  name,
  size = 20,
  strokeWidth = 2,
  color = 'currentColor',
  style,
}: IconProps) {
  const Glyph = ICONS[name];
  if (!Glyph) return null;
  return (
    <span style={{ display: 'inline-flex', lineHeight: 0, color, ...style }}>
      <Glyph size={size} strokeWidth={strokeWidth} />
    </span>
  );
}
