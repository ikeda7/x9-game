import { Button } from '../../components/button/button.tsx';
import { Icon } from '../../components/icon/icon.tsx';
import { IconCircle } from '../../components/icon-circle/icon-circle.tsx';
import type {
  GameOverActionsProps,
  ImpostorListProps,
  VictoryHeaderProps,
  WordRevealProps,
} from './game-over.interface.ts';

export function VictoryHeader({
  civsWon,
  accentSoft,
  glow,
  accent,
}: VictoryHeaderProps) {
  return (
    <div style={{ textAlign: 'center' }}>
      <IconCircle
        icon={civsWon ? 'shield-check' : 'venetian-mask'}
        size={88}
        iconSize={42}
        accent={accent}
        accentSoft={accentSoft}
      />

      <div className='x9-label game-over__overline'>Fim de jogo</div>

      <div
        className='game-over__title'
        style={{ color: accentSoft, textShadow: glow }}
      >
        {civsWon ? 'Vitória dos Civis' : 'O X9 venceu'}
      </div>

      <p className='x9-body game-over__subtitle'>
        {civsWon
          ? 'Todos os X9 foram desmascarados.'
          : 'O X9 sobreviveu até o fim.'}
      </p>
    </div>
  );
}

export function WordReveal({ word }: WordRevealProps) {
  return (
    <div className='game-over__word-box'>
      <div className='x9-label game-over__word-label'>A palavra era</div>
      <div className='game-over__word-emoji'>{word.emoji}</div>
      <div className='game-over__word-text'>{word.word}</div>
      <div className='x9-small game-over__word-category'>{word.category}</div>
    </div>
  );
}

export function ImpostorList({ impostors }: ImpostorListProps) {
  return (
    <div className='game-over__impostors'>
      <div className='x9-label game-over__impostors-label'>
        {impostors.length > 1 ? 'Os X9 eram' : 'O X9 era'}
      </div>
      <div className='game-over__impostors-list'>
        {impostors.map((p) => (
          <span key={p.id} className='game-over__impostor-chip'>
            <Icon name='venetian-mask' size={14} />
            {p.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function GameOverActions({
  onPlayAgain,
  onNewSetup,
}: GameOverActionsProps) {
  return (
    <div className='game-over__actions'>
      <Button variant='primary' icon='party-popper' onClick={onPlayAgain}>
        Jogar de Novo
      </Button>
      <Button variant='quiet' size='md' icon='users' onClick={onNewSetup}>
        Novos Jogadores
      </Button>
    </div>
  );
}
