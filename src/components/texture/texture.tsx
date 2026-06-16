// ============================================================
// X9 — Camada de textura (ruído + scanlines + vinheta)
// ============================================================
export function Texture({
  scanlines = true,
  vignette = true,
}: {
  scanlines?: boolean;
  vignette?: boolean;
}) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
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
  );
}
