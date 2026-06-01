/* global React, Icon, Button, Screen, StatusBar */
// ============================================================
// X9 — Gameplay (discussion + timer) & Voting / Result
// ============================================================

const { useState: useGameState, useEffect: useGameEffect, useRef: useGameRef } = React;

// ---- DISCUSSION / TIMER ------------------------------------
function GameplayScreen({ players, eliminated, onVote }) {
  const [secs, setSecs] = useGameState(180);
  const [running, setRunning] = useGameState(true);
  const ref = useGameRef(null);

  useGameEffect(() => {
    if (!running) return;
    ref.current = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(ref.current);
  }, [running]);

  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  const warn = secs <= 30;
  const tcolor = warn ? "var(--neon-red)" : "var(--neon-purple-soft)";
  const tglow = warn
    ? "0 0 30px rgba(255,42,77,0.6)"
    : "0 0 30px rgba(176,38,255,0.55)";

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
          padding: "8px 22px 24px",
        }}
      >
        <div className="x9-label" style={{ textAlign: "center", marginTop: 8, color: "var(--text-low)" }}>
          Fase de Discussão
        </div>

        {/* timer */}
        <div
          style={{
            marginTop: 14,
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            padding: "20px 38px",
            borderRadius: "var(--r-lg)",
            border: `1px solid ${warn ? "var(--line-danger)" : "var(--line-neon)"}`,
            background: warn ? "rgba(255,42,77,0.06)" : "rgba(176,38,255,0.05)",
            boxShadow: warn ? "var(--glow-red)" : "var(--glow-purple-sm)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 64,
              lineHeight: 1,
              letterSpacing: "0.06em",
              color: tcolor,
              textShadow: tglow,
            }}
          >
            {mm}:{ss}
          </div>
          <button
            onClick={() => setRunning((r) => !r)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "transparent",
              border: "none",
              color: "var(--text-low)",
              cursor: "pointer",
              fontFamily: "var(--font-display)",
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            <Icon name={running ? "pause" : "play"} size={13} color="var(--text-low)" />
            {running ? "Pausar" : "Retomar"}
          </button>
        </div>

        <div
          className="x9-body"
          style={{ marginTop: 18, textAlign: "center", color: "var(--text-mid)", display: "flex", gap: 8, justifyContent: "center", alignItems: "center" }}
        >
          <Icon name="venetian-mask" size={17} color="var(--neon-red)" />
          Discutam! O X9 está entre vocês.
        </div>

        {/* player list */}
        <div style={{ marginTop: 18, flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 9 }}>
          {players.map((p, i) => {
            const dead = eliminated.includes(p);
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "13px 15px",
                  borderRadius: "var(--r-md)",
                  background: dead ? "rgba(255,255,255,0.015)" : "var(--bg-surface)",
                  border: `1px solid ${dead ? "transparent" : "var(--line-soft)"}`,
                  opacity: dead ? 0.45 : 1,
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: dead ? "transparent" : "rgba(176,38,255,0.12)",
                    border: dead ? "1px solid var(--line-soft)" : "none",
                    color: dead ? "var(--text-low)" : "var(--neon-purple-soft)",
                  }}
                >
                  <Icon name={dead ? "skull" : "user"} size={16} />
                </span>
                <span
                  style={{
                    flex: 1,
                    fontFamily: "var(--font-body)",
                    fontSize: 16,
                    color: dead ? "var(--text-low)" : "var(--text-hi)",
                    textDecoration: dead ? "line-through" : "none",
                  }}
                >
                  {p}
                </span>
                {dead ? (
                  <span className="x9-label" style={{ color: "var(--text-low)" }}>Eliminado</span>
                ) : (
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--neon-green)", boxShadow: "0 0 8px var(--neon-green)" }} />
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 16 }}>
          <Button variant="primary" icon="gavel" onClick={onVote}>
            Ir para Votação
          </Button>
        </div>
      </div>
    </Screen>
  );
}

// ---- VOTING ------------------------------------------------
function VotingScreen({ players, eliminated, onConfirm }) {
  const alive = players.filter((p) => !eliminated.includes(p));
  const [sel, setSel] = useGameState(null);

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
          padding: "16px 22px 24px",
        }}
      >
        <div className="x9-h1" style={{ textAlign: "center", marginTop: 8 }}>
          Quem é o X9?
        </div>
        <div className="x9-small" style={{ textAlign: "center", color: "var(--text-low)", marginTop: 6 }}>
          Toque no suspeito e confirme a eliminação.
        </div>

        <div style={{ marginTop: 22, flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 11 }}>
          {alive.map((p, i) => {
            const on = sel === p;
            return (
              <button
                key={i}
                onClick={() => setSel(p)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 13,
                  padding: "15px 16px",
                  borderRadius: "var(--r-md)",
                  textAlign: "left",
                  cursor: "pointer",
                  background: on ? "rgba(176,38,255,0.12)" : "var(--bg-surface)",
                  border: `1.5px solid ${on ? "var(--neon-purple)" : "var(--line-soft)"}`,
                  boxShadow: on ? "var(--glow-purple-sm)" : "none",
                  transition: "all .15s ease",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: on ? "var(--neon-purple)" : "rgba(255,255,255,0.05)",
                    color: on ? "var(--text-on-neon)" : "var(--text-mid)",
                  }}
                >
                  <Icon name="user" size={17} />
                </span>
                <span style={{ flex: 1, fontFamily: "var(--font-body)", fontSize: 16, color: "var(--text-hi)" }}>
                  {p}
                </span>
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    border: `2px solid ${on ? "var(--neon-purple)" : "var(--line-soft)"}`,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: on ? "var(--neon-purple)" : "transparent",
                  }}
                >
                  {on && <Icon name="check" size={13} color="var(--text-on-neon)" />}
                </span>
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 16 }}>
          <Button variant="danger" icon="user-x" disabled={!sel} onClick={() => onConfirm(sel)}>
            Confirmar Eliminação
          </Button>
        </div>
      </div>
    </Screen>
  );
}

// ---- RESULT MODAL ------------------------------------------
function ResultModal({ name, wasImpostor, civicsWin, onContinue }) {
  // wasImpostor: was the eliminated player the X9?
  // civicsWin: true => civis win (game over), else continue
  const accent = civicsWin ? "var(--neon-green)" : "var(--neon-red)";
  const accentSoft = civicsWin ? "#9CFFC8" : "#FF8095";
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 100,
        background: "var(--bg-overlay)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 26,
      }}
    >
      <div
        style={{
          width: "100%",
          borderRadius: "var(--r-xl)",
          padding: "30px 24px 26px",
          background: "linear-gradient(180deg, rgba(20,20,31,0.97), rgba(10,10,16,0.97))",
          border: `1.5px solid ${accent}`,
          boxShadow: civicsWin ? "var(--glow-green)" : "var(--glow-red)",
          textAlign: "center",
        }}
      >
        {/* avatar */}
        <div
          style={{
            width: 84,
            height: 84,
            margin: "0 auto",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.04)",
            border: `1.5px solid ${accent}`,
            boxShadow: `0 0 26px -6px ${accent}`,
          }}
        >
          <Icon name={wasImpostor ? "venetian-mask" : "user"} size={40} color={accentSoft} />
        </div>

        <div style={{ marginTop: 18, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "var(--text-hi)" }}>
          {name} foi eliminado
        </div>

        <div
          className="x9-body"
          style={{ marginTop: 8, color: "var(--text-mid)", fontSize: 15 }}
        >
          {wasImpostor
            ? "Era o X9, desmascarado."
            : "Era um Civil inocente. O X9 continua à solta…"}
        </div>

        {/* verdict banner */}
        <div
          style={{
            marginTop: 20,
            padding: "14px",
            borderRadius: "var(--r-md)",
            border: `1px solid ${accent}`,
            background: civicsWin ? "rgba(43,255,136,0.08)" : "rgba(255,42,77,0.08)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 19,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: accentSoft,
              textShadow: `0 0 18px ${accent}`,
            }}
          >
            {civicsWin ? "Vitória dos Civis" : "O jogo continua"}
          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          <Button variant={civicsWin ? "primary" : "danger"} icon={civicsWin ? "party-popper" : "arrow-right"} onClick={onContinue}>
            {civicsWin ? "Nova Partida" : "Continuar"}
          </Button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { GameplayScreen, VotingScreen, ResultModal });
