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