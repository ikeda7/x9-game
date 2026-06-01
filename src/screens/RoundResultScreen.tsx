import type { Player } from '../types'
import { Button, Icon, Screen } from '../components/ui'

interface Props {
  eliminated: Player
  remainingImpostors: number
  onContinue: () => void
}

/** Revela o papel do jogador eliminado antes de seguir a partida. */
export default function RoundResultScreen({ eliminated, remainingImpostors, onContinue }: Props) {
  const wasImpostor = eliminated.isImpostor
  const accent = wasImpostor ? 'var(--neon-red)' : 'var(--neon-purple)'
  const accentSoft = wasImpostor ? '#FF8095' : 'var(--neon-purple-soft)'

  return (
    <Screen>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 26 }}>
        <div
          className="animate-pop-in"
          style={{
            width: '100%',
            borderRadius: 'var(--r-xl)',
            padding: '30px 24px 26px',
            background: 'linear-gradient(180deg, rgba(20,20,31,0.97), rgba(10,10,16,0.97))',
            border: `1.5px solid ${accent}`,
            boxShadow: wasImpostor ? 'var(--glow-red)' : 'var(--glow-purple)',
            textAlign: 'center',
          }}
        >
          {/* avatar */}
          <div
            style={{
              width: 84,
              height: 84,
              margin: '0 auto',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.04)',
              border: `1.5px solid ${accent}`,
              boxShadow: `0 0 26px -6px ${accent}`,
            }}
          >
            <Icon name={wasImpostor ? 'venetian-mask' : 'user'} size={40} color={accentSoft} />
          </div>

          <div style={{ marginTop: 18, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, color: 'var(--text-hi)' }}>
            {eliminated.name} foi eliminado
          </div>

          <p className="x9-body" style={{ marginTop: 8, color: 'var(--text-mid)', fontSize: 15 }}>
            {wasImpostor ? 'Era o X9, desmascarado.' : 'Era um Civil inocente. O X9 continua à solta…'}
          </p>

          {/* banner */}
          <div
            style={{
              marginTop: 20,
              padding: 14,
              borderRadius: 'var(--r-md)',
              border: `1px solid ${accent}`,
              background: wasImpostor ? 'rgba(255,42,77,0.08)' : 'rgba(176,38,255,0.08)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: accentSoft,
                textShadow: `0 0 18px ${accent}`,
              }}
            >
              {wasImpostor
                ? remainingImpostors > 0
                  ? `Ainda restam ${remainingImpostors} X9`
                  : 'Último X9 caiu'
                : 'O X9 continua à solta'}
            </div>
          </div>

          <div style={{ marginTop: 22 }}>
            <Button variant={wasImpostor ? 'danger' : 'primary'} icon="arrow-right" onClick={onContinue}>
              Continuar
            </Button>
          </div>
        </div>
      </div>
    </Screen>
  )
}
