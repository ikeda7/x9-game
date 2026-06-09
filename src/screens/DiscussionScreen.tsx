import { useEffect, useRef, useState } from 'react'
import type { Player } from '../types'
import { Button, Icon, Screen } from '../components/ui'

interface Props {
  players: Player[]
  starterId: number | null
  durationSeconds: number
  onVote: () => void
}

/** Fase de debate: quem começa + ordem de fala, cronômetro regressivo. */
export default function DiscussionScreen({ players, starterId, durationSeconds, onVote }: Props) {
  const [secs, setSecs] = useState(durationSeconds)
  const [running, setRunning] = useState(true)
  const ref = useRef<number | null>(null)
  const buzzed = useRef(false)

  useEffect(() => {
    if (!running) return
    ref.current = window.setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => {
      if (ref.current) window.clearInterval(ref.current)
    }
  }, [running])

  useEffect(() => {
    if (secs === 0 && !buzzed.current) {
      buzzed.current = true
      setRunning(false)
      navigator.vibrate?.([180, 90, 180])
    }
  }, [secs])

  const mm = String(Math.floor(secs / 60)).padStart(2, '0')
  const ss = String(secs % 60).padStart(2, '0')
  const done = secs === 0
  const warn = secs <= 30
  const tcolor = warn ? 'var(--neon-red)' : 'var(--neon-purple-soft)'
  const tglow = warn ? '0 0 30px rgba(255,42,77,0.6)' : '0 0 30px rgba(176,38,255,0.55)'

  // Ordem de fala: jogadores vivos, começando por quem foi sorteado.
  const alive = players.filter((p) => p.alive)
  const startIdx = Math.max(0, alive.findIndex((p) => p.id === starterId))
  const order = [...alive.slice(startIdx), ...alive.slice(0, startIdx)]
  const eliminated = players.filter((p) => !p.alive)
  const starterName = order[0]?.name

  return (
    <Screen>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '30px 22px 24px' }}>
        <div className="x9-label" style={{ textAlign: 'center', color: 'var(--text-low)' }}>
          Fase de Discussão
        </div>

        {/* timer */}
        <div
          style={{
            marginTop: 12,
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            padding: '16px 36px',
            borderRadius: 'var(--r-lg)',
            border: `1px solid ${warn ? 'var(--line-danger)' : 'var(--line-neon)'}`,
            background: warn ? 'rgba(255,42,77,0.06)' : 'rgba(176,38,255,0.05)',
            boxShadow: warn ? 'var(--glow-red)' : 'var(--glow-purple-sm)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 58,
              lineHeight: 1,
              letterSpacing: '0.06em',
              color: tcolor,
              textShadow: tglow,
            }}
          >
            {mm}:{ss}
          </div>
          <button
            onClick={() => {
              if (done) {
                buzzed.current = false
                setSecs(durationSeconds)
                setRunning(true)
              } else {
                setRunning((r) => !r)
              }
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'transparent',
              border: 'none',
              color: 'var(--text-low)',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              fontSize: 12,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            <Icon name={done ? 'play' : running ? 'pause' : 'play'} size={13} color="var(--text-low)" />
            {done ? 'Reiniciar' : running ? 'Pausar' : 'Retomar'}
          </button>
        </div>

        {/* quem começa */}
        {starterName && (
          <div
            style={{
              marginTop: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '10px 14px',
              borderRadius: 'var(--r-md)',
              background: 'rgba(176,38,255,0.08)',
              border: '1px solid var(--line-neon)',
            }}
          >
            <Icon name="play" size={15} color="var(--neon-purple-soft)" />
            <span className="x9-small" style={{ color: 'var(--text-mid)' }}>
              Começa falando:{' '}
              <span style={{ color: 'var(--text-hi)', fontWeight: 600 }}>{starterName}</span>
            </span>
          </div>
        )}

        <div className="x9-label" style={{ marginTop: 18, color: 'var(--text-low)' }}>
          Ordem de fala
        </div>

        {/* ordem (vivos) */}
        <div style={{ marginTop: 10, flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 9 }}>
          {order.map((p, i) => {
            const isStarter = i === 0
            return (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 15px',
                  borderRadius: 'var(--r-md)',
                  background: isStarter ? 'rgba(176,38,255,0.10)' : 'var(--bg-surface)',
                  border: `1px solid ${isStarter ? 'var(--line-neon)' : 'var(--line-soft)'}`,
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 30,
                    height: 30,
                    borderRadius: 9,
                    background: 'rgba(176,38,255,0.12)',
                    color: 'var(--neon-purple-soft)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ flex: 1, fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--text-hi)' }}>{p.name}</span>
                {isStarter && (
                  <span className="x9-label" style={{ color: 'var(--neon-purple-soft)' }}>
                    Começa
                  </span>
                )}
              </div>
            )
          })}

          {eliminated.length > 0 && (
            <>
              <div className="x9-label" style={{ marginTop: 6, color: 'var(--text-low)' }}>
                Fora ({eliminated.length})
              </div>
              {eliminated.map((p) => (
                <div
                  key={p.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 15px',
                    borderRadius: 'var(--r-md)',
                    opacity: 0.45,
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      border: '1px solid var(--line-soft)',
                      color: 'var(--text-low)',
                    }}
                  >
                    <Icon name="skull" size={15} />
                  </span>
                  <span
                    style={{
                      flex: 1,
                      fontFamily: 'var(--font-body)',
                      fontSize: 15,
                      color: 'var(--text-low)',
                      textDecoration: 'line-through',
                    }}
                  >
                    {p.name}
                  </span>
                </div>
              ))}
            </>
          )}
        </div>

        <div
          className="x9-body"
          style={{
            marginTop: 14,
            marginBottom: 14,
            textAlign: 'center',
            color: 'var(--text-mid)',
            fontSize: 14,
            display: 'flex',
            gap: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon name="venetian-mask" size={16} color="var(--neon-red)" />
          O X9 está entre vocês.
        </div>

        <Button variant="primary" icon="gavel" onClick={onVote}>
          Ir para Votação
        </Button>
      </div>
    </Screen>
  )
}
