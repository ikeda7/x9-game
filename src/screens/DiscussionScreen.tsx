import { useEffect, useRef, useState } from 'react'
import type { Player } from '../types'
import { Button, Icon, Screen } from '../components/ui'

interface Props {
  players: Player[]
  onVote: () => void
}

const START_SECONDS = 180

/** Fase de debate: cronômetro regressivo + lista de jogadores. */
export default function DiscussionScreen({ players, onVote }: Props) {
  const [secs, setSecs] = useState(START_SECONDS)
  const [running, setRunning] = useState(true)
  const ref = useRef<number | null>(null)

  useEffect(() => {
    if (!running) return
    ref.current = window.setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => {
      if (ref.current) window.clearInterval(ref.current)
    }
  }, [running])

  useEffect(() => {
    if (secs === 0) setRunning(false)
  }, [secs])

  const mm = String(Math.floor(secs / 60)).padStart(2, '0')
  const ss = String(secs % 60).padStart(2, '0')
  const warn = secs <= 30
  const tcolor = warn ? 'var(--neon-red)' : 'var(--neon-purple-soft)'
  const tglow = warn ? '0 0 30px rgba(255,42,77,0.6)' : '0 0 30px rgba(176,38,255,0.55)'

  return (
    <Screen>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '34px 22px 24px' }}>
        <div className="x9-label" style={{ textAlign: 'center', color: 'var(--text-low)' }}>
          Fase de Discussão
        </div>

        {/* timer */}
        <div
          style={{
            marginTop: 14,
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            padding: '20px 38px',
            borderRadius: 'var(--r-lg)',
            border: `1px solid ${warn ? 'var(--line-danger)' : 'var(--line-neon)'}`,
            background: warn ? 'rgba(255,42,77,0.06)' : 'rgba(176,38,255,0.05)',
            boxShadow: warn ? 'var(--glow-red)' : 'var(--glow-purple-sm)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 64,
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
              if (secs === 0) setSecs(START_SECONDS)
              setRunning((r) => !r)
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
            <Icon name={running ? 'pause' : 'play'} size={13} color="var(--text-low)" />
            {secs === 0 ? 'Reiniciar' : running ? 'Pausar' : 'Retomar'}
          </button>
        </div>

        <div
          className="x9-body"
          style={{
            marginTop: 18,
            textAlign: 'center',
            color: 'var(--text-mid)',
            display: 'flex',
            gap: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon name="venetian-mask" size={17} color="var(--neon-red)" />
          Discutam! O X9 está entre vocês.
        </div>

        {/* player list */}
        <div style={{ marginTop: 18, flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 9 }}>
          {players.map((p) => {
            const dead = !p.alive
            return (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '13px 15px',
                  borderRadius: 'var(--r-md)',
                  background: dead ? 'rgba(255,255,255,0.015)' : 'var(--bg-surface)',
                  border: `1px solid ${dead ? 'transparent' : 'var(--line-soft)'}`,
                  opacity: dead ? 0.45 : 1,
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: dead ? 'transparent' : 'rgba(176,38,255,0.12)',
                    border: dead ? '1px solid var(--line-soft)' : 'none',
                    color: dead ? 'var(--text-low)' : 'var(--neon-purple-soft)',
                  }}
                >
                  <Icon name={dead ? 'skull' : 'user'} size={16} />
                </span>
                <span
                  style={{
                    flex: 1,
                    fontFamily: 'var(--font-body)',
                    fontSize: 16,
                    color: dead ? 'var(--text-low)' : 'var(--text-hi)',
                    textDecoration: dead ? 'line-through' : 'none',
                  }}
                >
                  {p.name}
                </span>
                {dead ? (
                  <span className="x9-label" style={{ color: 'var(--text-low)' }}>
                    Eliminado
                  </span>
                ) : (
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--neon-green)', boxShadow: '0 0 8px var(--neon-green)' }} />
                )}
              </div>
            )
          })}
        </div>

        <div style={{ marginTop: 16 }}>
          <Button variant="primary" icon="gavel" onClick={onVote}>
            Ir para Votação
          </Button>
        </div>
      </div>
    </Screen>
  )
}
