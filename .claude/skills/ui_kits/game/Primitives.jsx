/* global React */
// ============================================================
// X9 — Shared primitives: Texture, Logo, Buttons, Icon, PhoneFrame
// ============================================================

const { useRef, useEffect, useState } = React;

// ---- Lucide icon wrapper (CDN UMD `lucide`) ----------------
function Icon({ name, size = 20, strokeWidth = 2, color, style, className }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const i = document.createElement("i");
    i.setAttribute("data-lucide", name);
    i.setAttribute("width", size);
    i.setAttribute("height", size);
    i.setAttribute("stroke-width", strokeWidth);
    ref.current.innerHTML = "";
    ref.current.appendChild(i);
    if (window.lucide) window.lucide.createIcons();
  });
  return (
    <span
      ref={ref}
      className={className}
      style={{ display: "inline-flex", lineHeight: 0, color, ...style }}
    />
  );
}

// ---- Animated texture layer (noise + scanlines + vignette) -
function Texture({ scanlines = true, vignette = true }) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {scanlines && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.4,
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(176,38,255,0.05) 0px, rgba(176,38,255,0.05) 1px, transparent 1px, transparent 3px)",
          }}
        />
      )}
      {vignette && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(120% 80% at 50% -10%, rgba(176,38,255,0.12), transparent 55%), radial-gradient(120% 90% at 50% 110%, rgba(0,0,0,0.6), transparent 60%)",
          }}
        />
      )}
    </div>
  );
}

// ---- X9 Logo -----------------------------------------------
function Logo({ size = 72, tagline = false }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ position: "relative", lineHeight: 1 }}>
        {/* glitch ghosts */}
        <span
          style={{
            position: "absolute",
            left: -2,
            top: 1,
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: size,
            letterSpacing: "0.02em",
            color: "var(--neon-red)",
            opacity: 0.55,
            filter: "blur(0.5px)",
          }}
        >
          X9
        </span>
        <span
          style={{
            position: "relative",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: size,
            letterSpacing: "0.02em",
            color: "var(--text-hi)",
            textShadow:
              "0 0 8px rgba(176,38,255,0.9), 0 0 28px rgba(176,38,255,0.6), 0 0 60px rgba(176,38,255,0.35)",
          }}
        >
          X9
        </span>
      </div>
      {tagline && (
        <div
          className="x9-label"
          style={{ color: "var(--neon-purple-soft)", letterSpacing: "0.28em", fontSize: 11, paddingLeft: "0.28em" }}
        >
          JOGO&nbsp;DO&nbsp;IMPOSTOR
        </div>
      )}
    </div>
  );
}

// ---- Buttons -----------------------------------------------
function Button({ children, variant = "primary", size = "lg", icon, disabled, onClick, style }) {
  const [press, setPress] = useState(false);
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "100%",
    border: "1px solid transparent",
    borderRadius: "var(--r-md)",
    fontFamily: "var(--font-display)",
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "transform .12s ease, box-shadow .2s ease, background .2s ease, opacity .2s",
    transform: press && !disabled ? "scale(0.975)" : "scale(1)",
    userSelect: "none",
    whiteSpace: "nowrap",
  };
  const sizes = {
    lg: { padding: "18px 22px", fontSize: 17 },
    md: { padding: "13px 18px", fontSize: 14 },
    sm: { padding: "9px 14px", fontSize: 12 },
  };
  const variants = {
    primary: {
      background: disabled ? "#241b33" : "linear-gradient(180deg, #C95CFF 0%, #B026FF 55%, #8E12E0 100%)",
      color: disabled ? "var(--text-low)" : "var(--text-on-neon)",
      boxShadow: disabled ? "none" : "var(--glow-purple), inset 0 1px 0 rgba(255,255,255,0.35)",
      borderColor: disabled ? "var(--line-soft)" : "transparent",
    },
    danger: {
      background: disabled ? "#2a1620" : "linear-gradient(180deg, #FF4D68 0%, #FF2A4D 55%, #C1121F 100%)",
      color: "#fff",
      boxShadow: disabled ? "none" : "var(--glow-red), inset 0 1px 0 rgba(255,255,255,0.25)",
    },
    ghost: {
      background: "rgba(176,38,255,0.06)",
      color: "var(--neon-purple-soft)",
      borderColor: "var(--line-neon)",
      boxShadow: "inset 0 0 18px -8px rgba(176,38,255,0.6)",
    },
    quiet: {
      background: "transparent",
      color: "var(--text-mid)",
      borderColor: "var(--line-soft)",
    },
  };
  return (
    <button
      onClick={disabled ? undefined : onClick}
      onPointerDown={() => setPress(true)}
      onPointerUp={() => setPress(false)}
      onPointerLeave={() => setPress(false)}
      disabled={disabled}
      style={{ ...base, ...sizes[size], ...variants[variant], opacity: disabled ? 0.6 : 1, ...style }}
    >
      {icon && <Icon name={icon} size={size === "lg" ? 20 : 16} />}
      {children}
    </button>
  );
}

// ---- Phone frame -------------------------------------------
function PhoneFrame({ children, label }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div
        style={{
          width: 390,
          height: 844,
          borderRadius: 46,
          padding: 12,
          background: "linear-gradient(160deg, #232330, #0c0c12 60%)",
          boxShadow: "0 40px 90px -30px rgba(0,0,0,0.9), 0 0 0 1px rgba(176,38,255,0.18), 0 0 60px -20px rgba(176,38,255,0.3)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: 36,
            overflow: "hidden",
            background: "var(--bg-base)",
          }}
        >
          {/* notch */}
          <div
            style={{
              position: "absolute",
              top: 10,
              left: "50%",
              transform: "translateX(-50%)",
              width: 120,
              height: 26,
              borderRadius: 14,
              background: "#05050a",
              zIndex: 50,
            }}
          />
          {children}
        </div>
      </div>
      {label && (
        <div className="x9-label" style={{ color: "var(--text-low)" }}>
          {label}
        </div>
      )}
    </div>
  );
}

// ---- Status bar (fake) -------------------------------------
function StatusBar({ light = true }) {
  const c = light ? "var(--text-hi)" : "var(--text-low)";
  return (
    <div
      style={{
        position: "relative",
        zIndex: 40,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 26px 0",
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        color: c,
      }}
    >
      <span>21:09</span>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <Icon name="signal" size={15} color={c} />
        <Icon name="wifi" size={15} color={c} />
        <Icon name="battery-full" size={17} color={c} />
      </div>
    </div>
  );
}

Object.assign(window, { Icon, Texture, Logo, Button, PhoneFrame, StatusBar });
