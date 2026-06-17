import {
  Button,
  ButtonSize,
  ButtonVariant,
} from '../../components/button/button.tsx';
import { Icon } from '../../components/icon/icon.tsx';
import { Logo } from '../../components/logo/logo.tsx';
import { NumberedBadge } from '../../components/numbered-badge/numbered-badge.tsx';
import type {
  HowToPlayProps,
  RoleCardProps,
  StepRowProps,
  WinRowProps,
} from './home.interface.ts';

const STEPS = [
  {
    icon: 'smartphone' as const,
    text: 'Distribuição: passem o celular e cada um segura para ver seu papel em segredo.',
  },
  {
    icon: 'play' as const,
    text: 'Discussão: o app sorteia quem começa e a ordem; cada um fala 1 palavra ligada ao tema.',
  },
  {
    icon: 'gavel' as const,
    text: 'Votação: o grupo aponta o suspeito. Empate no topo, ninguém é eliminado.',
  },
  {
    icon: 'venetian-mask' as const,
    text: 'Revelação: o papel do eliminado aparece. O jogo segue até alguém vencer.',
  },
];

export function Eyebrow() {
  return (
    <div className='home__eyebrow'>
      <span className='home__eyebrow-line' />
      <span className='x9-label home__eyebrow-text'>Party Game</span>
      <span className='home__eyebrow-line' />
    </div>
  );
}

export function HeroBrand() {
  return (
    <>
      <div className='home__logo'>
        <Logo size={108} />
      </div>
      <div className='x9-label home__tagline'>Jogo do Impostor</div>
      <p className='x9-body home__description'>
        Um de vocês é o X9. Descubra quem antes que seja tarde.
      </p>
    </>
  );
}

export function HomeActions({
  onNew,
  onHelp,
}: {
  onNew: () => void;
  onHelp: () => void;
}) {
  return (
    <div className='home__actions'>
      <Button variant={ButtonVariant.PRIMARY} icon='play' onClick={onNew}>
        Nova Partida
      </Button>
      <Button
        variant={ButtonVariant.GHOST}
        size={ButtonSize.MD}
        icon='help-circle'
        onClick={onHelp}
      >
        Como Jogar
      </Button>
    </div>
  );
}

export function FooterHint() {
  return (
    <div className='x9-small home__footer'>
      <Icon name='smartphone' size={15} color='var(--text-low)' />
      Jogue com amigos em um único celular
    </div>
  );
}

function RoleCard({ icon, color, soft, title, text }: RoleCardProps) {
  return (
    <div className='howto-role-card' style={{ border: `1px solid ${color}` }}>
      <div className='howto-role-header'>
        <Icon name={icon} size={18} color={soft} />
        <span className='x9-label howto-role-title' style={{ color: soft }}>
          {title}
        </span>
      </div>
      <p className='x9-small howto-role-text'>{text}</p>
    </div>
  );
}

function StepRow({ index, text }: StepRowProps) {
  return (
    <div className='howto-step'>
      <NumberedBadge index={index} />
      <p className='x9-small howto-step-text'>{text}</p>
    </div>
  );
}

function WinRow({ color, label, text }: WinRowProps) {
  return (
    <div className='howto-win-row'>
      <span className='x9-label howto-win-label' style={{ color }}>
        {label}
      </span>
      <span className='x9-small howto-win-text'>{text}</span>
    </div>
  );
}

export function HowToPlay({ onClose }: HowToPlayProps) {
  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: backdrop dismiss overlay, not an interactive control
    <div role='presentation' className='howto-overlay' onClick={onClose}>
      <div
        role='dialog'
        aria-modal='true'
        aria-label='Como Jogar'
        className='howto-dialog'
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <div className='howto-body'>
          <div className='x9-h2 howto-title'>Como Jogar</div>
          <p className='x9-small howto-intro'>
            Um celular passado de mão em mão. Todos compartilham uma palavra
            secreta — menos o <strong>X9</strong>, que blefa para não ser
            descoberto.
          </p>

          <div className='howto-roles'>
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

          <div className='x9-label howto-section-label'>A partida</div>
          <div className='howto-steps'>
            {STEPS.map((s, i) => (
              <StepRow key={s.icon} index={i} text={s.text} />
            ))}
          </div>

          <div className='x9-label howto-section-label'>Quem vence</div>
          <div className='howto-wins'>
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

          <p className='x9-small howto-tip'>
            💡 Dica: dicas óbvias entregam a palavra ao X9; dicas vagas fazem
            você parecer suspeito.
          </p>
        </div>

        <div className='howto-footer'>
          <Button
            variant={ButtonVariant.PRIMARY}
            icon='check'
            onClick={onClose}
          >
            Entendi
          </Button>
        </div>
      </div>
    </div>
  );
}
