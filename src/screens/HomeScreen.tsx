import { useState } from 'react'
import { Button, Icon, Logo, Screen } from '../components/ui'

interface Props {
  onNew: () => void
}

/** Tela inicial: marca X9 + entrada para a partida. */
export default function HomeScreen({ onNew }: Props) {
  const [showHelp, setShowHelp] = useState(false)

  return (
    <Screen>
      <div
        className="animate-fade-in"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 28px 36px',
        }}
      >
        {/* eyebrow */}
        <div style={{ marginTop: 72, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 28, height: 1, background: 'var(--line-neon)' }} />
          <span className="x9-label" style={{ color: 'var(--neon-purple-soft)' }}>
            Party Game
          </span>
          <span style={{ width: 28, height: 1, background: 'var(--line-neon)' }} />
        </div>

        <div style={{ marginTop: 54 }}>
          <Logo size={108} />
        </div>
        <div className="x9-label" style={{ marginTop: 14, color: 'var(--text-low)' }}>
          Jogo do Impostor
        </div>

        <p className="x9-body" style={{ marginTop: 24, textAlign: 'center', maxWidth: 270, color: 'var(--text-mid)' }}>
          Um de vocês é o X9. Descubra quem antes que seja tarde.
        </p>

        <div style={{ flex: 1 }} />

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Button variant="primary" icon="play" onClick={onNew}>
            Nova Partida
          </Button>
          <Button variant="ghost" size="md" icon="help-circle" onClick={() => setShowHelp(true)}>
            Como Jogar
          </Button>
        </div>

        <div
          className="x9-small"
          style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-low)' }}
        >
          <Icon name="smartphone" size={15} color="var(--text-low)" />
          Jogue com amigos em um único celular
        </div>
      </div>

      {showHelp && <HowToPlay onClose={() => setShowHelp(false)} />}
    </Screen>
  )
}

function HowToPlay({ onClose }: { onClose: () => void }) {
  const steps: { icon: Parameters<typeof Icon>[0]['name']; text: string }[] = [
    { icon: 'smartphone', text: 'Passem um único celular de mão em mão para ver os papéis em segredo.' },
    { icon: 'shield-check', text: 'Os Civis recebem a mesma palavra secreta. Deem dicas sem entregá-la.' },
    { icon: 'venetian-mask', text: 'O X9 não conhece a palavra. Ele blefa e tenta descobri-la.' },
    { icon: 'gavel', text: 'Após discutir, votem em quem eliminar. Os Civis vencem ao desmascarar o X9.' },
  ]
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 100,
        background: 'var(--bg-overlay)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 26,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 380,
          borderRadius: 'var(--r-xl)',
          padding: '28px 24px 24px',
          background: 'linear-gradient(180deg, rgba(20,20,31,0.97), rgba(10,10,16,0.97))',
          border: '1.5px solid var(--neon-purple)',
          boxShadow: 'var(--glow-purple)',
        }}
      >
        <div className="x9-h2" style={{ fontSize: 22, marginBottom: 18 }}>
          Como Jogar
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 34,
                  height: 34,
                  flexShrink: 0,
                  borderRadius: 10,
                  background: 'rgba(176,38,255,0.12)',
                  color: 'var(--neon-purple-soft)',
                }}
              >
                <Icon name={s.icon} size={17} />
              </span>
              <p className="x9-small" style={{ color: 'var(--text-mid)', paddingTop: 4 }}>
                {s.text}
              </p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24 }}>
          <Button variant="primary" icon="check" onClick={onClose}>
            Entendi
          </Button>
        </div>
      </div>
    </div>
  )
}
