import { useState } from 'react'
import type { Player } from '../types'
import { Button, Icon, Screen } from '../components/ui'

interface Props {
  players: Player[]
  onEliminate: (playerId: number) => void
  onSkip: () => void
}

/** Fase de votação: o grupo escolhe quem eliminar. */
export default function VotingScreen({ players, onEliminate, onSkip }: Props) {
  const [selected, setSelected] = useState<number | null>(null)
  const alive = players.filter((p) => p.alive)

  return (
    <Screen>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '40px 22px 24px' }}>
        <div className="x9-h1" style={{ textAlign: 'center' }}>
          Quem é o X9?
        </div>
        <p className="x9-small" style={{ textAlign: 'center', color: 'var(--text-low)', marginTop: 6 }}>
          Toque no suspeito e confirme a eliminação.
        </p>

        <div style={{ marginTop: 22, flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 11 }}>
          {alive.map((p) => {
            const on = selected === p.id
            return (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 13,
                  padding: '15px 16px',
                  borderRadius: 'var(--r-md)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  background: on ? 'rgba(176,38,255,0.12)' : 'var(--bg-surface)',
                  border: `1.5px solid ${on ? 'var(--neon-purple)' : 'var(--line-soft)'}`,
                  boxShadow: on ? 'var(--glow-purple-sm)' : 'none',
                  transition: 'all .15s ease',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: on ? 'var(--neon-purple)' : 'rgba(255,255,255,0.05)',
                    color: on ? 'var(--text-on-neon)' : 'var(--text-mid)',
                  }}
                >
                  <Icon name="user" size={17} />
                </span>
                <span style={{ flex: 1, fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--text-hi)' }}>{p.name}</span>
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    border: `2px solid ${on ? 'var(--neon-purple)' : 'var(--line-soft)'}`,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: on ? 'var(--neon-purple)' : 'transparent',
                  }}
                >
                  {on && <Icon name="check" size={13} color="var(--text-on-neon)" />}
                </span>
              </button>
            )
          })}
        </div>

        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button
            variant="danger"
            icon="user-x"
            disabled={selected === null}
            onClick={() => selected !== null && onEliminate(selected)}
          >
            Confirmar Eliminação
          </Button>
          <Button variant="quiet" size="md" onClick={onSkip}>
            Pular votação
          </Button>
        </div>
      </div>
    </Screen>
  )
}
