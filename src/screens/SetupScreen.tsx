import { useState } from 'react'
import type { GameConfig } from '../types'
import { Button, Icon, Screen } from '../components/ui'

const MIN_PLAYERS = 3

interface Props {
  onStart: (config: GameConfig) => void
  onBack: () => void
}

/** Máximo de impostores que ainda permite os civis começarem em maioria. */
function maxImpostors(playerCount: number): number {
  return Math.max(1, Math.floor((playerCount - 1) / 2))
}

export default function SetupScreen({ onStart, onBack }: Props) {
  const [players, setPlayers] = useState<string[]>([])
  const [name, setName] = useState('')
  const [impostors, setImpostors] = useState(1)
  const [hintMode, setHintMode] = useState(false)

  const enough = players.length >= MIN_PLAYERS
  const cap = maxImpostors(players.length)

  function add() {
    const v = name.trim()
    if (!v) return
    setPlayers((prev) => [...prev, v])
    setName('')
  }

  function remove(i: number) {
    setPlayers((prev) => {
      const next = prev.filter((_, idx) => idx !== i)
      setImpostors((c) => Math.min(c, maxImpostors(next.length)))
      return next
    })
  }

  function start() {
    if (!enough) return
    onStart({ names: players, impostorCount: Math.min(impostors, cap), hintMode })
  }

  return (
    <Screen>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '30px 22px 6px' }}>
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--line-soft)',
            borderRadius: 12,
            padding: 9,
            cursor: 'pointer',
          }}
        >
          <Icon name="chevron-left" size={20} color="var(--text-mid)" />
        </button>
        <div className="x9-h2" style={{ fontSize: 22 }}>
          Quem vai jogar?
        </div>
      </div>

      {/* counter pill */}
      <div style={{ padding: '14px 22px 0' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 12px',
            borderRadius: 'var(--r-pill)',
            border: `1px solid ${enough ? 'var(--line-neon)' : 'var(--line-danger)'}`,
            background: enough ? 'rgba(176,38,255,0.08)' : 'rgba(255,42,77,0.08)',
          }}
        >
          <Icon
            name={enough ? 'check-circle-2' : 'users'}
            size={15}
            color={enough ? 'var(--neon-green)' : 'var(--neon-red)'}
          />
          <span
            className="x9-label"
            style={{ color: enough ? 'var(--neon-green)' : 'var(--neon-red)', letterSpacing: '0.08em' }}
          >
            {enough ? `${players.length} jogadores prontos` : `Mínimo de ${MIN_PLAYERS} jogadores`}
          </span>
        </div>
      </div>

      {/* player list */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 22px 8px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {players.map((p, i) => (
          <div
            key={i}
            className="animate-fade-in"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '13px 14px',
              borderRadius: 'var(--r-md)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--line-soft)',
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
            <span style={{ flex: 1, color: 'var(--text-hi)', fontFamily: 'var(--font-body)', fontSize: 16 }}>{p}</span>
            <button
              onClick={() => remove(i)}
              style={{ display: 'inline-flex', background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, color: 'var(--text-low)' }}
            >
              <Icon name="x" size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* add input */}
      <div style={{ padding: '4px 22px 0' }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && add()}
            placeholder="Nome do jogador"
            maxLength={16}
            style={{
              flex: 1,
              padding: '14px 16px',
              borderRadius: 'var(--r-md)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--line-soft)',
              color: 'var(--text-hi)',
              fontFamily: 'var(--font-body)',
              fontSize: 16,
              outline: 'none',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--line-neon)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line-soft)')}
          />
          <button
            onClick={add}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 52,
              borderRadius: 'var(--r-md)',
              border: '1px solid var(--line-neon)',
              background: 'rgba(176,38,255,0.12)',
              color: 'var(--neon-purple-soft)',
              cursor: 'pointer',
              boxShadow: 'var(--glow-purple-sm)',
            }}
          >
            <Icon name="plus" size={22} />
          </button>
        </div>
      </div>

      {/* impostor stepper */}
      <div style={{ padding: '16px 22px 0' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 14px 12px 16px',
            borderRadius: 'var(--r-md)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--line-soft)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icon name="venetian-mask" size={18} color="var(--neon-red)" />
            <span style={{ color: 'var(--text-hi)', fontFamily: 'var(--font-body)', fontSize: 15 }}>Quantidade de X9s</span>
          </div>
          <Stepper value={Math.min(impostors, cap)} min={1} max={cap} onChange={setImpostors} />
        </div>
      </div>

      {/* hint mode toggle */}
      <div style={{ padding: '12px 22px 0' }}>
        <button
          onClick={() => setHintMode((v) => !v)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            gap: 12,
            padding: '12px 16px',
            borderRadius: 'var(--r-md)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--line-soft)',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <div>
            <div style={{ color: 'var(--text-hi)', fontFamily: 'var(--font-body)', fontSize: 15 }}>Modo avançado</div>
            <div className="x9-small" style={{ color: 'var(--text-low)', fontSize: 12 }}>
              O X9 recebe uma palavra parecida no lugar de "X9".
            </div>
          </div>
          <span
            style={{
              position: 'relative',
              flexShrink: 0,
              width: 46,
              height: 26,
              borderRadius: 'var(--r-pill)',
              background: hintMode ? 'var(--neon-purple)' : 'rgba(255,255,255,0.12)',
              boxShadow: hintMode ? 'var(--glow-purple-sm)' : 'none',
              transition: 'background .2s ease',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: 3,
                left: hintMode ? 23 : 3,
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: '#fff',
                transition: 'left .2s ease',
              }}
            />
          </span>
        </button>
      </div>

      {/* start */}
      <div style={{ padding: '16px 22px 26px' }}>
        <Button variant="primary" icon="zap" disabled={!enough} onClick={start}>
          Iniciar Jogo
        </Button>
      </div>
    </Screen>
  )
}

function Stepper({ value, min, max, onChange }: { value: number; min: number; max: number; onChange: (n: number) => void }) {
  const btn = (disabled: boolean) => ({
    width: 34,
    height: 34,
    display: 'inline-flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderRadius: 10,
    border: '1px solid var(--line-soft)',
    background: disabled ? 'transparent' : 'var(--bg-elevated)',
    color: disabled ? 'var(--text-low)' : 'var(--neon-purple-soft)',
    cursor: disabled ? 'not-allowed' : 'pointer',
  })
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <button style={btn(value <= min)} onClick={() => value > min && onChange(value - 1)}>
        <Icon name="minus" size={16} />
      </button>
      <span style={{ minWidth: 22, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 20, color: 'var(--text-hi)' }}>
        {value}
      </span>
      <button style={btn(value >= max)} onClick={() => value < max && onChange(value + 1)}>
        <Icon name="plus" size={16} />
      </button>
    </div>
  )
}
