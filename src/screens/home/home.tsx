import { useState } from 'react';

import { Button } from '../../components/button/button.tsx';
import { Icon, type IconName } from '../../components/icon/icon.tsx';
import { Logo } from '../../components/logo/logo.tsx';
import { Screen } from '../../components/screen/screen.tsx';

interface Props {
  onNew: () => void;
}

/** Tela inicial: marca X9 + entrada para a partida. */
export default function HomeScreen({ onNew }: Props) {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <Screen>
      <div
        className='animate-fade-in'
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 28px 36px',
        }}
      >
        {/* eyebrow */}
        <div
          style={{
            marginTop: 72,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            style={{ width: 28, height: 1, background: 'var(--line-neon)' }}
          />
          <span
            className='x9-label'
            style={{ color: 'var(--neon-purple-soft)' }}
          >
            Party Game
          </span>
          <span
            style={{ width: 28, height: 1, background: 'var(--line-neon)' }}
          />
        </div>

        <div style={{ marginTop: 54 }}>
          <Logo size={108} />
        </div>
        <div
          className='x9-label'
          style={{ marginTop: 14, color: 'var(--text-low)' }}
        >
          Jogo do Impostor
        </div>

        <p
          className='x9-body'
          style={{
            marginTop: 24,
            textAlign: 'center',
            maxWidth: 270,
            color: 'var(--text-mid)',
          }}
        >
          Um de vocês é o X9. Descubra quem antes que seja tarde.
        </p>

        <div style={{ flex: 1 }} />

        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          <Button variant='primary' icon='play' onClick={onNew}>
            Nova Partida
          </Button>
          <Button
            variant='ghost'
            size='md'
            icon='help-circle'
            onClick={() => setShowHelp(true)}
          >
            Como Jogar
          </Button>
        </div>

        <div
          className='x9-small'
          style={{
            marginTop: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: 'var(--text-low)',
          }}
        >
          <Icon name='smartphone' size={15} color='var(--text-low)' />
          Jogue com amigos em um único celular
        </div>
      </div>

      {showHelp && <HowToPlay onClose={() => setShowHelp(false)} />}
    </Screen>
  );
}

function HowToPlay({ onClose }: { onClose: () => void }) {
  const steps: { icon: IconName; text: string }[] = [
    {
      icon: 'smartphone',
      text: 'Distribuição: passem o celular e cada um segura para ver seu papel em segredo.',
    },
    {
      icon: 'play',
      text: 'Discussão: o app sorteia quem começa e a ordem; cada um fala 1 palavra ligada ao tema.',
    },
    {
      icon: 'gavel',
      text: 'Votação: o grupo aponta o suspeito. Empate no topo, ninguém é eliminado.',
    },
    {
      icon: 'venetian-mask',
      text: 'Revelação: o papel do eliminado aparece. O jogo segue até alguém vencer.',
    },
  ];
  return (
    <button
      type='button'
      aria-label='Fechar'
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 100,
        background: 'var(--bg-overlay)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 22,
        border: 'none',
        width: '100%',
        cursor: 'default',
      }}
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
    >
      <div
        role='dialog'
        aria-modal='true'
        aria-label='Como Jogar'
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 390,
          maxHeight: '86dvh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 'var(--r-xl)',
          background:
            'linear-gradient(180deg, rgba(20,20,31,0.98), rgba(10,10,16,0.98))',
          border: '1.5px solid var(--neon-purple)',
          boxShadow: 'var(--glow-purple)',
        }}
      >
        {/* corpo rolável */}
        <div style={{ overflowY: 'auto', padding: '26px 24px 8px' }}>
          <div className='x9-h2' style={{ fontSize: 22 }}>
            Como Jogar
          </div>
          <p
            className='x9-small'
            style={{ marginTop: 8, color: 'var(--text-mid)' }}
          >
            Um celular passado de mão em mão. Todos compartilham uma palavra
            secreta — menos o <strong style={{ color: '#FF8095' }}>X9</strong>,
            que blefa para não ser descoberto.
          </p>

          {/* papéis */}
          <div style={{ marginTop: 18, display: 'flex', gap: 10 }}>
            <RoleCard
              icon='shield-check'
              color='var(--neon-purple)'
              soft='var(--neon-purple-soft)'
              title='Civil'
              text='Sabe a palavra. Dê dicas sutis sem entregá-la de graça ao X9.'
            />
            <RoleCard
              icon='venetian-mask'
              color='var(--neon-red)'
              soft='#FF8095'
              title='X9'
              text='Não sabe a palavra. Finja que sabe e tente sobreviver à votação.'
            />
          </div>

          {/* fluxo */}
          <div
            className='x9-label'
            style={{ marginTop: 22, color: 'var(--text-low)' }}
          >
            A partida
          </div>
          <div
            style={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            {steps.map((s, i) => (
              <div
                key={s.icon}
                style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 30,
                    height: 30,
                    flexShrink: 0,
                    borderRadius: 9,
                    background: 'rgba(176,38,255,0.12)',
                    color: 'var(--neon-purple-soft)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p
                  className='x9-small'
                  style={{ color: 'var(--text-mid)', paddingTop: 3 }}
                >
                  {s.text}
                </p>
              </div>
            ))}
          </div>

          {/* vitória */}
          <div
            className='x9-label'
            style={{ marginTop: 22, color: 'var(--text-low)' }}
          >
            Quem vence
          </div>
          <div
            style={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'column',
              gap: 9,
            }}
          >
            <WinRow
              color='var(--neon-purple-soft)'
              label='Civis'
              text='quando todos os X9 são eliminados.'
            />
            <WinRow
              color='#FF8095'
              label='X9'
              text='quando ficam em número igual ou maior que os Civis.'
            />
          </div>

          <p
            className='x9-small'
            style={{
              marginTop: 18,
              color: 'var(--text-low)',
              fontStyle: 'italic',
            }}
          >
            💡 Dica: dicas óbvias entregam a palavra ao X9; dicas vagas fazem
            você parecer suspeito.
          </p>
        </div>

        {/* rodapé fixo */}
        <div style={{ padding: '12px 24px 22px' }}>
          <Button variant='primary' icon='check' onClick={onClose}>
            Entendi
          </Button>
        </div>
      </div>
    </button>
  );
}

function RoleCard({
  icon,
  color,
  soft,
  title,
  text,
}: {
  icon: IconName;
  color: string;
  soft: string;
  title: string;
  text: string;
}) {
  return (
    <div
      style={{
        flex: 1,
        padding: '14px 14px 16px',
        borderRadius: 'var(--r-md)',
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid ${color}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Icon name={icon} size={18} color={soft} />
        <span
          className='x9-label'
          style={{ color: soft, letterSpacing: '0.1em' }}
        >
          {title}
        </span>
      </div>
      <p
        className='x9-small'
        style={{ marginTop: 8, color: 'var(--text-mid)', fontSize: 13 }}
      >
        {text}
      </p>
    </div>
  );
}

function WinRow({
  color,
  label,
  text,
}: {
  color: string;
  label: string;
  text: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
      <span className='x9-label' style={{ color, minWidth: 38 }}>
        {label}
      </span>
      <span className='x9-small' style={{ color: 'var(--text-mid)' }}>
        {text}
      </span>
    </div>
  );
}
