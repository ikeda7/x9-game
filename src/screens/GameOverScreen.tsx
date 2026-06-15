import { Team } from '../common/enums/team.enum'
import { Player } from '../common/interfaces/player.interface'
import { WordEntry } from '../common/interfaces/word-entry.interface'
import { Button, Icon, Screen } from '../components/ui'

interface Props {
  winner: Team
  players: Player[]
  word: WordEntry
  onPlayAgain: () => void
  onNewSetup: () => void
}

export default function GameOverScreen({ winner, players, word, onPlayAgain, onNewSetup }: Props) {
  const civsWon = winner === 'civilians'
  const impostors = players.filter((p) => p.isImpostor)

  const accent = civsWon ? 'var(--neon-green)' : 'var(--neon-red)'
  const accentSoft = civsWon ? '#9CFFC8' : '#FF8095'
  const glow = civsWon ? 'var(--glow-green)' : 'var(--glow-red)'

  return (
    <Screen dark>
      <div
        className="animate-pop-in"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 26px 28px' }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 88,
              height: 88,
              margin: '0 auto',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.04)',
              border: `1.5px solid ${accent}`,
              boxShadow: `0 0 30px -6px ${accent}`,
            }}
          >
            <Icon name={civsWon ? 'shield-check' : 'venetian-mask'} size={42} color={accentSoft} />
          </div>

          <div className="x9-label" style={{ marginTop: 18, color: 'var(--text-low)' }}>
            Fim de jogo
          </div>
          <div
            style={{
              marginTop: 8,
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 30,
              letterSpacing: '0.02em',
              color: accentSoft,
              textShadow: glow,
            }}
          >
            {civsWon ? 'Vitória dos Civis' : 'O X9 venceu'}
          </div>
          <p className="x9-body" style={{ marginTop: 10, color: 'var(--text-mid)', fontSize: 15 }}>
            {civsWon ? 'Todos os X9 foram desmascarados.' : 'O X9 sobreviveu até o fim.'}
          </p>
        </div>

        {/* word reveal */}
        <div
          style={{
            marginTop: 26,
            padding: '18px 18px',
            borderRadius: 'var(--r-lg)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--line-soft)',
            textAlign: 'center',
          }}
        >
          <div className="x9-label" style={{ color: 'var(--text-low)' }}>A palavra era</div>
          <div style={{ marginTop: 8, fontSize: 40, lineHeight: 1 }}>{word.emoji}</div>
          <div
            style={{
              marginTop: 8,
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 26,
              color: 'var(--text-hi)',
            }}
          >
            {word.word}
          </div>
          <div className="x9-small" style={{ color: 'var(--text-low)', fontSize: 12 }}>{word.category}</div>
        </div>

        {/* impostors */}
        <div
          style={{
            marginTop: 12,
            padding: '14px 16px',
            borderRadius: 'var(--r-md)',
            background: 'rgba(255,42,77,0.07)',
            border: '1px solid var(--line-danger)',
          }}
        >
          <div className="x9-label" style={{ color: '#FF8095' }}>
            {impostors.length > 1 ? 'Os X9 eram' : 'O X9 era'}
          </div>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {impostors.map((p) => (
              <span
                key={p.id}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '5px 10px',
                  borderRadius: 'var(--r-pill)',
                  border: '1px solid var(--line-danger)',
                  background: 'rgba(255,42,77,0.10)',
                  color: '#FF8095',
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                }}
              >
                <Icon name="venetian-mask" size={14} />
                {p.name}
              </span>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, minHeight: 16 }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button variant="primary" icon="party-popper" onClick={onPlayAgain}>
            Jogar de Novo
          </Button>
          <Button variant="quiet" size="md" icon="users" onClick={onNewSetup}>
            Novos Jogadores
          </Button>
        </div>
      </div>
    </Screen>
  )
}
