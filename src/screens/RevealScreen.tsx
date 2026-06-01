import { useRef, useState } from 'react'
import type { Player, WordEntry } from '../types'
import { Button, Icon, Screen } from '../components/ui'
import { emojiForCategory } from '../data/words'

interface Props {
  players: Player[]
  word: WordEntry
  hintMode: boolean
  onDone: () => void
}

/** Fase de distribuição: cada jogador vê seu papel em segredo. */
export default function RevealScreen({ players, word, hintMode, onDone }: Props) {
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)

  const player = players[index]
  const isLast = index === players.length - 1

  function next() {
    setRevealed(false)
    if (isLast) onDone()
    else setIndex((i) => i + 1)
  }

  if (!revealed) {
    return (
      <RevealWait
        playerName={player.name}
        index={index}
        total={players.length}
        onReveal={() => setRevealed(true)}
      />
    )
  }

  return (
    <RevealCard
      player={player}
      word={word}
      hintMode={hintMode}
      index={index}
      total={players.length}
      last={isLast}
      onNext={next}
    />
  )
}

// ---- A. Passe o celular / segure para revelar ----------------
function RevealWait({
  playerName,
  index,
  total,
  onReveal,
}: {
  playerName: string
  index: number
  total: number
  onReveal: () => void
}) {
  const [holding, setHolding] = useState(false)
  const timer = useRef<number | null>(null)

  const start = () => {
    setHolding(true)
    timer.current = window.setTimeout(() => {
      setHolding(false)
      onReveal()
    }, 650)
  }
  const cancel = () => {
    setHolding(false)
    if (timer.current) window.clearTimeout(timer.current)
  }

  return (
    <Screen dark>
      <div
        className="animate-fade-in"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 30px',
          textAlign: 'center',
        }}
      >
        <div className="x9-mono" style={{ color: 'var(--text-low)', fontSize: 13 }}>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>

        <div className="x9-label" style={{ marginTop: 26, color: 'var(--text-low)' }}>
          Passe o celular para
        </div>

        <div
          style={{
            marginTop: 14,
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 44,
            lineHeight: 1.05,
            color: 'var(--text-hi)',
            textShadow: '0 0 26px rgba(176,38,255,0.45)',
          }}
        >
          {playerName}
        </div>

        <p className="x9-small" style={{ marginTop: 16, color: 'var(--text-low)', maxWidth: 250 }}>
          Que ninguém mais veja a tela. Segure o botão para revelar seu papel.
        </p>

        <button
          onPointerDown={start}
          onPointerUp={cancel}
          onPointerLeave={cancel}
          style={{
            marginTop: 48,
            position: 'relative',
            width: 188,
            height: 188,
            borderRadius: '50%',
            border: '1px solid var(--line-neon)',
            background: 'radial-gradient(circle at 50% 40%, rgba(176,38,255,0.22), rgba(176,38,255,0.04) 70%)',
            boxShadow: holding
              ? '0 0 0 2px var(--neon-purple), 0 0 60px -4px rgba(176,38,255,0.85)'
              : 'var(--glow-purple)',
            color: 'var(--neon-purple-soft)',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            transform: holding ? 'scale(0.96)' : 'scale(1)',
            transition: 'transform .2s ease, box-shadow .2s ease',
          }}
        >
          <Icon name="fingerprint" size={54} color="var(--neon-purple-soft)" />
          <span className="x9-label" style={{ color: 'var(--neon-purple-soft)', letterSpacing: '0.1em' }}>
            {holding ? 'Revelando…' : 'Segure para ver'}
          </span>
        </button>
      </div>
    </Screen>
  )
}

// ---- B/C. Card de revelação (Civil / X9) ---------------------
function RevealCard({
  player,
  word,
  hintMode,
  index,
  total,
  last,
  onNext,
}: {
  player: Player
  word: WordEntry
  hintMode: boolean
  index: number
  total: number
  last: boolean
  onNext: () => void
}) {
  const isImpostor = player.isImpostor
  const accent = isImpostor ? 'var(--neon-red)' : 'var(--neon-purple)'
  const accentSoft = isImpostor ? '#FF8095' : 'var(--neon-purple-soft)'
  const glow = isImpostor ? 'var(--glow-red)' : 'var(--glow-purple)'

  const emoji = isImpostor ? '❓' : emojiForCategory(word.category)
  const bigText = isImpostor ? (hintMode && word.hint ? word.hint : '???') : word.word
  const overline = isImpostor ? (hintMode && word.hint ? 'Sua dica secreta' : null) : word.category

  return (
    <Screen dark>
      <div
        className="animate-pop-in"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 26px',
        }}
      >
        <div className="x9-label" style={{ color: 'var(--text-low)' }}>
          {player.name} · {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
        </div>

        <div
          style={{
            marginTop: 18,
            width: '100%',
            borderRadius: 'var(--r-xl)',
            padding: '34px 26px 30px',
            background: 'linear-gradient(180deg, rgba(20,20,31,0.95), rgba(10,10,16,0.95))',
            border: `1.5px solid ${accent}`,
            boxShadow: glow,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: isImpostor
                ? 'radial-gradient(80% 50% at 50% 0%, rgba(255,42,77,0.18), transparent 60%)'
                : 'radial-gradient(80% 50% at 50% 0%, rgba(176,38,255,0.18), transparent 60%)',
              pointerEvents: 'none',
            }}
          />

          {/* role chip */}
          <div
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '7px 14px',
              borderRadius: 'var(--r-pill)',
              border: `1px solid ${accent}`,
              background: isImpostor ? 'rgba(255,42,77,0.10)' : 'rgba(176,38,255,0.10)',
            }}
          >
            <Icon name={isImpostor ? 'venetian-mask' : 'shield-check'} size={16} color={accentSoft} />
            <span className="x9-label" style={{ color: accentSoft, letterSpacing: '0.12em' }}>
              {isImpostor ? 'Você é o X9' : 'Você é um Civil'}
            </span>
          </div>

          {/* word / emoji */}
          <div style={{ position: 'relative', marginTop: 30, marginBottom: 8 }}>
            <div style={{ fontSize: 60, lineHeight: 1 }}>{emoji}</div>
            {overline && (
              <div className="x9-label" style={{ marginTop: 14, color: accentSoft }}>
                {overline}
              </div>
            )}
            <div
              style={{
                marginTop: overline ? 6 : 14,
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: isImpostor ? 36 : 44,
                letterSpacing: '0.04em',
                color: isImpostor ? accentSoft : 'var(--text-hi)',
                textShadow: isImpostor ? '0 0 24px rgba(255,42,77,0.5)' : '0 0 24px rgba(176,38,255,0.5)',
              }}
            >
              {bigText}
            </div>
          </div>

          <div
            style={{
              height: 1,
              background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
              margin: '22px 0 18px',
              position: 'relative',
            }}
          />

          <p className="x9-body" style={{ position: 'relative', color: 'var(--text-mid)', fontSize: 15 }}>
            {isImpostor
              ? 'Blefe! Tente descobrir a palavra dos Civis e sobreviva.'
              : 'Fale palavras relacionadas, mas não revele a palavra!'}
          </p>
        </div>

        <div style={{ marginTop: 28, width: '100%' }}>
          <Button variant={isImpostor ? 'danger' : 'primary'} icon={last ? 'flag' : 'eye-off'} onClick={onNext}>
            {last ? 'Começar Discussão' : 'Pronto, já vi'}
          </Button>
        </div>
        <p className="x9-small" style={{ marginTop: 14, color: 'var(--text-low)', textAlign: 'center', maxWidth: 240 }}>
          Esconda a tela e passe o celular adiante.
        </p>
      </div>
    </Screen>
  )
}
