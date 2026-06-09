import type { Player } from '../types'
import { Button, Icon, Screen, type IconName } from '../components/ui'

interface Props {
  eliminated: Player | null
  noElimReason: 'tie' | 'skip' | null
  remainingImpostors: number
  onContinue: () => void
}

/** Resultado da rodada: eliminação (X9/Civil), empate ou votação pulada. */
export default function RoundResultScreen({ eliminated, noElimReason, remainingImpostors, onContinue }: Props) {
  // Configuração visual por desfecho.
  let accent = 'var(--neon-purple)'
  let accentSoft = 'var(--neon-purple-soft)'
  let glow = 'var(--glow-purple)'
  let icon: IconName = 'user'
  let title: string
  let subtitle: string
  let banner: string
  let bannerBg = 'rgba(176,38,255,0.08)'

  if (eliminated) {
    const wasImpostor = eliminated.isImpostor
    accent = wasImpostor ? 'var(--neon-red)' : 'var(--neon-purple)'
    accentSoft = wasImpostor ? '#FF8095' : 'var(--neon-purple-soft)'
    glow = wasImpostor ? 'var(--glow-red)' : 'var(--glow-purple)'
    icon = wasImpostor ? 'venetian-mask' : 'user'
    bannerBg = wasImpostor ? 'rgba(255,42,77,0.08)' : 'rgba(176,38,255,0.08)'
    title = `${eliminated.name} foi eliminado`
    subtitle = wasImpostor ? 'Era o X9, desmascarado.' : 'Era um Civil inocente. O X9 continua à solta…'
    banner = wasImpostor
      ? remainingImpostors > 0
        ? `Ainda restam ${remainingImpostors} X9`
        : 'Último X9 caiu'
      : 'O X9 continua à solta'
  } else {
    // empate ou pulado — caução âmbar
    accent = 'var(--neon-amber)'
    accentSoft = 'var(--neon-amber)'
    glow = '0 0 0 1px rgba(255,197,61,0.4), 0 0 22px -4px rgba(255,197,61,0.5)'
    icon = 'gavel'
    bannerBg = 'rgba(255,197,61,0.08)'
    title = noElimReason === 'tie' ? 'Deu empate' : 'Votação pulada'
    subtitle =
      noElimReason === 'tie'
        ? 'Os votos empataram no topo — ninguém foi eliminado.'
        : 'O grupo decidiu não eliminar ninguém desta vez.'
    banner = 'Ninguém foi eliminado'
  }

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
            boxShadow: glow,
            textAlign: 'center',
          }}
        >
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
            <Icon name={icon} size={40} color={accentSoft} />
          </div>

          <div style={{ marginTop: 18, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, color: 'var(--text-hi)' }}>
            {title}
          </div>

          <p className="x9-body" style={{ marginTop: 8, color: 'var(--text-mid)', fontSize: 15 }}>
            {subtitle}
          </p>

          <div
            style={{
              marginTop: 20,
              padding: 14,
              borderRadius: 'var(--r-md)',
              border: `1px solid ${accent}`,
              background: bannerBg,
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
              {banner}
            </div>
          </div>

          <div style={{ marginTop: 22 }}>
            <Button variant={eliminated?.isImpostor ? 'danger' : 'primary'} icon="arrow-right" onClick={onContinue}>
              Continuar
            </Button>
          </div>
        </div>
      </div>
    </Screen>
  )
}
