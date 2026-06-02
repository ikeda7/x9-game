/* global React, Icon, Texture, Logo, Button, StatusBar */
// ============================================================
// X9 — HomeScreen + SetupScreen
// ============================================================

const { useState: useStateScreens } = React;

// ---- Screen shell ------------------------------------------
function Screen({ children, dark = false, style }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: dark
          ? "radial-gradient(120% 70% at 50% 0%, #0d0a14 0%, #07070b 70%)"
          : "radial-gradient(130% 80% at 50% -5%, #16101f 0%, #0c0c13 55%)",
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      <Texture vignette={!dark} scanlines />
      {children}
    </div>
  );
}

// ============================================================
// HOME
// ============================================================
function HomeScreen({ onNew, onHow }) {
  return (
    <Screen>
      <StatusBar />
      <div
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 28px 36px",
        }}
      >
        {/* eyebrow */}
        <div style={{ marginTop: 64, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 28, height: 1, background: "var(--line-neon)" }} />
          <span className="x9-label" style={{ color: "var(--neon-purple-soft)" }}>
            Party Game
          </span>
          <span style={{ width: 28, height: 1, background: "var(--line-neon)" }} />
        </div>

        <div style={{ marginTop: 54 }}>
          <Logo size={108} tagline />
        </div>

        <div
          className="x9-body"
          style={{ marginTop: 26, textAlign: "center", maxWidth: 270, color: "var(--text-mid)" }}
        >
          Um de vocês é o X9. Descubra quem antes que seja tarde.
        </div>

        <div style={{ flex: 1 }} />

        {/* CTAs */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 14 }}>
          <Button variant="primary" icon="play" onClick={onNew}>
            Nova Partida
          </Button>
          <Button variant="ghost" size="md" icon="help-circle" onClick={onHow}>
            Como Jogar
          </Button>
        </div>

        <div
          className="x9-small"
          style={{
            marginTop: 24,
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "var(--text-low)",
          }}
        >
          <Icon name="smartphone" size={15} color="var(--text-low)" />
          Jogue com amigos em um único celular
        </div>
      </div>
    </Screen>
  );
}

// ============================================================
// SETUP
// ============================================================
function SetupScreen({ players, setPlayers, impostors, setImpostors, onStart, onBack }) {
  const [name, setName] = useStateScreens("");
  const min = 3;
  const enough = players.length >= min;
  const maxImpostors = Math.max(1, Math.floor((players.length - 1) / 2) || 1);

  const add = () => {
    const v = name.trim();
    if (!v) return;
    setPlayers([...players, v]);
    setName("");
  };
  const remove = (i) => {
    const next = players.filter((_, idx) => idx !== i);
    setPlayers(next);
    if (impostors > Math.max(1, Math.floor((next.length - 1) / 2) || 1)) setImpostors(1);
  };

  return (
    <Screen>
      <StatusBar />
      {/* header */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "18px 22px 6px",
        }}
      >
        <button
          onClick={onBack}
          style={{
            display: "inline-flex",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--line-soft)",
            borderRadius: 12,
            padding: 9,
            cursor: "pointer",
          }}
        >
          <Icon name="chevron-left" size={20} color="var(--text-mid)" />
        </button>
        <div>
          <div className="x9-h2" style={{ fontSize: 22, whiteSpace: "nowrap" }}>Quem vai jogar?</div>
        </div>
      </div>

      {/* counter pill */}
      <div style={{ position: "relative", zIndex: 10, padding: "14px 22px 0" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 12px",
            borderRadius: "var(--r-pill)",
            border: `1px solid ${enough ? "var(--line-neon)" : "var(--line-danger)"}`,
            background: enough ? "rgba(176,38,255,0.08)" : "rgba(255,42,77,0.08)",
          }}
        >
          <Icon
            name={enough ? "check-circle-2" : "users"}
            size={15}
            color={enough ? "var(--neon-green)" : "var(--neon-red)"}
          />
          <span
            className="x9-label"
            style={{ color: enough ? "var(--neon-green)" : "var(--neon-red)", letterSpacing: "0.08em", whiteSpace: "nowrap" }}
          >
            {enough ? `${players.length} jogadores prontos` : `Mínimo de 3 jogadores`}
          </span>
        </div>
      </div>

      {/* player list */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          overflowY: "auto",
          padding: "16px 22px 8px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {players.map((p, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "13px 14px",
              borderRadius: "var(--r-md)",
              background: "var(--bg-surface)",
              border: "1px solid var(--line-soft)",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 30,
                height: 30,
                borderRadius: 9,
                background: "rgba(176,38,255,0.12)",
                color: "var(--neon-purple-soft)",
                fontFamily: "var(--font-mono)",
                fontSize: 13,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ flex: 1, color: "var(--text-hi)", fontFamily: "var(--font-body)", fontSize: 16 }}>
              {p}
            </span>
            <button
              onClick={() => remove(i)}
              style={{
                display: "inline-flex",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 4,
                color: "var(--text-low)",
              }}
            >
              <Icon name="x" size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* add input */}
      <div style={{ position: "relative", zIndex: 10, padding: "4px 22px 0" }}>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="Nome do jogador"
            style={{
              flex: 1,
              padding: "14px 16px",
              borderRadius: "var(--r-md)",
              background: "var(--bg-elevated)",
              border: "1px solid var(--line-soft)",
              color: "var(--text-hi)",
              fontFamily: "var(--font-body)",
              fontSize: 16,
              outline: "none",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--line-neon)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--line-soft)")}
          />
          <button
            onClick={add}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              borderRadius: "var(--r-md)",
              border: "1px solid var(--line-neon)",
              background: "rgba(176,38,255,0.12)",
              color: "var(--neon-purple-soft)",
              cursor: "pointer",
              boxShadow: "var(--glow-purple-sm)",
            }}
          >
            <Icon name="plus" size={22} />
          </button>
        </div>
      </div>

      {/* impostor stepper */}
      <div style={{ position: "relative", zIndex: 10, padding: "16px 22px 0" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 14px 12px 16px",
            borderRadius: "var(--r-md)",
            background: "var(--bg-surface)",
            border: "1px solid var(--line-soft)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Icon name="venetian-mask" size={18} color="var(--neon-red)" />
            <span style={{ color: "var(--text-hi)", fontFamily: "var(--font-body)", fontSize: 15 }}>
              Quantidade de X9s
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Stepper
              value={impostors}
              min={1}
              max={maxImpostors}
              onChange={setImpostors}
            />
          </div>
        </div>
      </div>

      {/* start */}
      <div style={{ position: "relative", zIndex: 10, padding: "16px 22px 26px" }}>
        <Button variant="primary" icon="zap" disabled={!enough} onClick={onStart}>
          Iniciar Jogo
        </Button>
      </div>
    </Screen>
  );
}

function Stepper({ value, min, max, onChange }) {
  const btn = (disabled) => ({
    width: 34,
    height: 34,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    border: "1px solid var(--line-soft)",
    background: disabled ? "transparent" : "var(--bg-elevated)",
    color: disabled ? "var(--text-low)" : "var(--neon-purple-soft)",
    cursor: disabled ? "not-allowed" : "pointer",
  });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <button style={btn(value <= min)} onClick={() => value > min && onChange(value - 1)}>
        <Icon name="minus" size={16} />
      </button>
      <span
        style={{
          minWidth: 22,
          textAlign: "center",
          fontFamily: "var(--font-mono)",
          fontSize: 20,
          color: "var(--text-hi)",
        }}
      >
        {value}
      </span>
      <button style={btn(value >= max)} onClick={() => value < max && onChange(value + 1)}>
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}

Object.assign(window, { Screen, HomeScreen, SetupScreen });
