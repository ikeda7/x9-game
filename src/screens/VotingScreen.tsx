import { useState } from 'react'
import type { Player } from '../types'
import { Button, Icon, Screen } from '../components/ui'

interface Props {
  players: Player[]
  onEliminate: (playerId: number) => void
  onTie: () => void
  onSkip: () => void
}

/**
 * Votação por contagem: o grupo soma os votos em cada suspeito.
 * Apurar elimina o mais votado; empate no topo = ninguém sai.
 */
export default function VotingScreen({ players, onEliminate, onTie, onSkip }: Props) {
  const alive = players.filter((p) => p.alive)
  const [votes, setVotes] = useState<Record<number, number>>({})

  const total = Object.values(votes).reduce((a, b) => a + b, 0)
  const remaining = alive.length - total

  function inc(id: number) {
    if (remaining <= 0) return
    setVotes((v) => ({ ...v, [id]: (v[id] ?? 0) + 1 }))
  }
  function dec(id: number) {
    setVotes((v) => {
      const n = (v[id] ?? 0) - 1
      return { ...v, [id]: Math.max(0, n) }
    })
  }

  function apurar() {
    const max = Math.max(0, ...alive.map((p) => votes[p.id] ?? 0))
    if (max === 0) return onSkip()
    const leaders = alive.filter((p) => (votes[p.id] ?? 0) === max)
    if (leaders.length === 1) onEliminate(leaders[0].id)
    else onTie()
  }

  return (
    <Screen>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '34px 22px 24px' }}>
        <div className="x9-h1" style={{ textAlign: 'center' }}>
          Quem é o X9?
        </div>
        <p className="x9-small" style={{ textAlign: 'center', color: 'var(--text-low)', marginTop: 6 }}>
          Toquem no nome pra somar cada voto do grupo.
        </p>

        {/* contador de votos restantes */}
        <div style={{ marginTop: 14, display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              borderRadius: 'var(--r-pill)',
              border: `1px solid ${remaining > 0 ? 'var(--line-neon)' : 'var(--line-soft)'}`,
              background: remaining > 0 ? 'rgba(176,38,255,0.08)' : 'transparent',
            }}
          >
            <Icon name="gavel" size={14} color={remaining > 0 ? 'var(--neon-purple-soft)' : 'var(--text-low)'} />
            <span className="x9-label" style={{ color: remaining > 0 ? 'var(--neon-purple-soft)' : 'var(--text-low)' }}>
              {remaining > 0 ? `${remaining} voto${remaining > 1 ? 's' : ''} restante${remaining > 1 ? 's' : ''}` : 'Todos votaram'}
            </span>
          </div>
        </div>

        <div style={{ marginTop: 18, flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {alive.map((p) => {
            const n = votes[p.id] ?? 0
            const on = n > 0
            return (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 12px 10px 14px',
                  borderRadius: 'var(--r-md)',
                  background: on ? 'rgba(176,38,255,0.10)' : 'var(--bg-surface)',
                  border: `1px solid ${on ? 'var(--line-neon)' : 'var(--line-soft)'}`,
                }}
              >
                {/* tap-to-vote (nome) */}
                <button
                  onClick={() => inc(p.id)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    background: 'transparent',
                    border: 'none',
                    cursor: remaining > 0 ? 'pointer' : 'not-allowed',
                    textAlign: 'left',
                    padding: '4px 0',
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
                </button>

                {/* stepper de votos */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    onClick={() => dec(p.id)}
                    disabled={n === 0}
                    style={{
                      width: 30,
                      height: 30,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 9,
                      border: '1px solid var(--line-soft)',
                      background: n === 0 ? 'transparent' : 'var(--bg-elevated)',
                      color: n === 0 ? 'var(--text-low)' : 'var(--neon-purple-soft)',
                      cursor: n === 0 ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <Icon name="minus" size={14} />
                  </button>
                  <span
                    style={{
                      minWidth: 20,
                      textAlign: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 20,
                      color: on ? 'var(--neon-purple-soft)' : 'var(--text-low)',
                    }}
                  >
                    {n}
                  </span>
                  <button
                    onClick={() => inc(p.id)}
                    disabled={remaining <= 0}
                    style={{
                      width: 30,
                      height: 30,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 9,
                      border: `1px solid ${remaining <= 0 ? 'var(--line-soft)' : 'var(--line-neon)'}`,
                      background: remaining <= 0 ? 'transparent' : 'rgba(176,38,255,0.12)',
                      color: remaining <= 0 ? 'var(--text-low)' : 'var(--neon-purple-soft)',
                      cursor: remaining <= 0 ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <Icon name="plus" size={14} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button variant="danger" icon="gavel" disabled={total === 0} onClick={apurar}>
            Apurar Votos
          </Button>
          <Button variant="quiet" size="md" onClick={onSkip}>
            Pular votação (ninguém sai)
          </Button>
        </div>
      </div>
    </Screen>
  )
}
