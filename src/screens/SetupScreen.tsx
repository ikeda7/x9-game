import { useState } from 'react'
import type { ReactNode } from 'react'
import type { GameConfig, VoteMode } from '../types'
import { Button, Icon, Screen } from '../components/ui'
import { CATEGORIES, emojiForCategory } from '../data/words'
import { loadSetup } from '../game/storage'

const MIN_PLAYERS = 3

const DURATIONS = [
  { secs: 60, label: '1 min' },
  { secs: 120, label: '2 min' },
  { secs: 180, label: '3 min' },
]

interface Props {
  onStart: (config: GameConfig) => void
  onBack: () => void
}

/** Máximo de impostores que ainda permite os civis começarem em maioria. */
function maxImpostors(playerCount: number): number {
  return Math.max(1, Math.floor((playerCount - 1) / 2))
}

export default function SetupScreen({ onStart, onBack }: Props) {
  const [saved] = useState(loadSetup)
  const savedCategories = (saved?.categories ?? []).filter((c) => CATEGORIES.includes(c))

  const [players, setPlayers] = useState<string[]>(saved?.names ?? [])
  const [name, setName] = useState('')
  const [impostors, setImpostors] = useState(saved?.impostorCount ?? 1)
  const [hintMode, setHintMode] = useState(saved?.hintMode ?? false)
  const [duration, setDuration] = useState(saved?.discussionSeconds ?? 120)
  const [categories, setCategories] = useState<string[]>(
    savedCategories.length ? savedCategories : CATEGORIES,
  )
  const [voteMode, setVoteMode] = useState<VoteMode>(saved?.voteMode ?? 'open')

  const enough = players.length >= MIN_PLAYERS
  const cap = maxImpostors(players.length)
  const canStart = enough && categories.length > 0

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

  function toggleCategory(cat: string) {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    )
  }

  function start() {
    if (!canStart) return
    onStart({
      names: players,
      impostorCount: Math.min(impostors, cap),
      hintMode,
      discussionSeconds: duration,
      categories,
      voteMode,
    })
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

      {/* scroll: jogadores + configurações */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 22px 8px' }}>
        {/* counter pill */}
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

        {/* player list */}
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
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
        <div style={{ marginTop: 10, display: 'flex', gap: 10 }}>
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

        {/* ---- Configurações ---- */}
        <SectionLabel>Configurações</SectionLabel>

        {/* X9 stepper */}
        <Row>
          <RowLeft icon="venetian-mask" iconColor="var(--neon-red)" label="Quantidade de X9s" />
          <Stepper value={Math.min(impostors, cap)} min={1} max={cap} onChange={setImpostors} />
        </Row>

        {/* duração */}
        <Row>
          <RowLeft icon="pause" iconColor="var(--neon-purple-soft)" label="Tempo de discussão" />
          <div style={{ display: 'flex', gap: 6 }}>
            {DURATIONS.map((d) => {
              const on = duration === d.secs
              return (
                <button
                  key={d.secs}
                  onClick={() => setDuration(d.secs)}
                  style={{
                    padding: '7px 11px',
                    borderRadius: 'var(--r-sm)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-display)',
                    fontSize: 12,
                    letterSpacing: '0.04em',
                    color: on ? 'var(--text-on-neon)' : 'var(--text-mid)',
                    background: on ? 'var(--neon-purple)' : 'var(--bg-elevated)',
                    border: `1px solid ${on ? 'var(--neon-purple)' : 'var(--line-soft)'}`,
                    boxShadow: on ? 'var(--glow-purple-sm)' : 'none',
                  }}
                >
                  {d.label}
                </button>
              )
            })}
          </div>
        </Row>

        {/* modo de votação */}
        <Row>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icon name="gavel" size={18} color="var(--neon-purple-soft)" />
            <span style={{ color: 'var(--text-hi)', fontFamily: 'var(--font-body)', fontSize: 15 }}>Votação</span>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {([
              { v: 'open', label: 'Aberta' },
              { v: 'secret', label: 'Secreta' },
            ] as const).map((o) => {
              const on = voteMode === o.v
              return (
                <button
                  key={o.v}
                  onClick={() => setVoteMode(o.v)}
                  style={{
                    padding: '7px 12px',
                    borderRadius: 'var(--r-sm)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-display)',
                    fontSize: 12,
                    letterSpacing: '0.04em',
                    color: on ? 'var(--text-on-neon)' : 'var(--text-mid)',
                    background: on ? 'var(--neon-purple)' : 'var(--bg-elevated)',
                    border: `1px solid ${on ? 'var(--neon-purple)' : 'var(--line-soft)'}`,
                    boxShadow: on ? 'var(--glow-purple-sm)' : 'none',
                  }}
                >
                  {o.label}
                </button>
              )
            })}
          </div>
        </Row>
        <div className="x9-small" style={{ marginTop: 6, color: 'var(--text-low)', fontSize: 12, paddingLeft: 2 }}>
          {voteMode === 'open'
            ? 'Aberta: o grupo declara e soma os votos juntos.'
            : 'Secreta: cada um vota escondido passando o celular.'}
        </div>

        {/* categorias */}
        <div
          style={{
            marginTop: 12,
            padding: '14px 16px',
            borderRadius: 'var(--r-md)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--line-soft)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon name="flag" size={18} color="var(--neon-purple-soft)" />
              <span style={{ color: 'var(--text-hi)', fontFamily: 'var(--font-body)', fontSize: 15 }}>Categorias</span>
            </div>
            <span className="x9-label" style={{ color: categories.length ? 'var(--text-low)' : 'var(--neon-red)' }}>
              {categories.length ? `${categories.length}/${CATEGORIES.length}` : 'escolha 1'}
            </span>
          </div>
          <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {CATEGORIES.map((cat) => {
              const on = categories.includes(cat)
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '7px 12px',
                    borderRadius: 'var(--r-pill)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    fontSize: 13,
                    color: on ? 'var(--neon-purple-soft)' : 'var(--text-low)',
                    background: on ? 'rgba(176,38,255,0.12)' : 'transparent',
                    border: `1px solid ${on ? 'var(--line-neon)' : 'var(--line-soft)'}`,
                  }}
                >
                  <span>{emojiForCategory(cat)}</span>
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* modo avançado */}
        <button
          onClick={() => setHintMode((v) => !v)}
          style={{
            marginTop: 12,
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
              O X9 recebe uma palavra parecida no lugar de "???".
            </div>
          </div>
          <Toggle on={hintMode} />
        </button>
      </div>

      {/* start */}
      <div style={{ padding: '14px 22px 26px' }}>
        <Button variant="primary" icon="zap" disabled={!canStart} onClick={start}>
          Iniciar Jogo
        </Button>
      </div>
    </Screen>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="x9-label" style={{ marginTop: 22, marginBottom: 4, color: 'var(--text-low)' }}>
      {children}
    </div>
  )
}

function Row({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        marginTop: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: '12px 14px 12px 16px',
        borderRadius: 'var(--r-md)',
        background: 'var(--bg-surface)',
        border: '1px solid var(--line-soft)',
      }}
    >
      {children}
    </div>
  )
}

function RowLeft({ icon, iconColor, label }: { icon: 'venetian-mask' | 'pause'; iconColor: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <Icon name={icon} size={18} color={iconColor} />
      <span style={{ color: 'var(--text-hi)', fontFamily: 'var(--font-body)', fontSize: 15 }}>{label}</span>
    </div>
  )
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      style={{
        position: 'relative',
        flexShrink: 0,
        width: 46,
        height: 26,
        borderRadius: 'var(--r-pill)',
        background: on ? 'var(--neon-purple)' : 'rgba(255,255,255,0.12)',
        boxShadow: on ? 'var(--glow-purple-sm)' : 'none',
        transition: 'background .2s ease',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 3,
          left: on ? 23 : 3,
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: '#fff',
          transition: 'left .2s ease',
        }}
      />
    </span>
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
