import { Button } from '../../components/button/button.tsx';
import { Icon } from '../../components/icon/icon.tsx';
import type {
  OpenPlayerRowProps,
  SecretBallotViewProps,
  SecretPassViewProps,
} from './voting.interface.ts';

export function VotingHeader() {
  return (
    <>
      <div className='x9-h1 voting__title'>Quem é o X9?</div>
      <p className='x9-small voting__subtitle'>
        Toquem no nome pra somar cada voto do grupo.
      </p>
    </>
  );
}

export function VoteCountPill({ remaining }: { remaining: number }) {
  const active = remaining > 0;
  return (
    <div className='voting__pill-wrapper'>
      <div
        className={`voting__pill ${active ? 'voting__pill--active' : 'voting__pill--done'}`}
      >
        <Icon
          name='gavel'
          size={14}
          color={active ? 'var(--neon-purple-soft)' : 'var(--text-low)'}
        />
        <span
          className='x9-label'
          style={{
            color: active ? 'var(--neon-purple-soft)' : 'var(--text-low)',
          }}
        >
          {active
            ? `${remaining} voto${remaining > 1 ? 's' : ''} restante${remaining > 1 ? 's' : ''}`
            : 'Todos votaram'}
        </span>
      </div>
    </div>
  );
}

export function OpenPlayerRow({
  player,
  voteCount,
  canVote,
  onInc,
  onDec,
}: OpenPlayerRowProps) {
  const on = voteCount > 0;
  return (
    <div
      className={`voting__player-row ${on ? 'voting__player-row--active' : 'voting__player-row--inactive'}`}
    >
      <button
        onClick={onInc}
        type='button'
        className='voting__player-btn'
        style={{ cursor: canVote ? 'pointer' : 'not-allowed' }}
      >
        <span
          className={`voting__player-avatar ${on ? 'voting__player-avatar--active' : 'voting__player-avatar--inactive'}`}
        >
          <Icon name='user' size={17} />
        </span>
        <span className='voting__player-name'>{player.name}</span>
      </button>

      <div className='voting__stepper'>
        <button
          type='button'
          onClick={onDec}
          disabled={voteCount === 0}
          className={`voting__step-btn ${voteCount === 0 ? 'voting__step-btn--disabled' : 'voting__step-btn--neutral'}`}
        >
          <Icon name='minus' size={14} />
        </button>
        <span
          className={`voting__vote-count ${on ? 'voting__vote-count--active' : 'voting__vote-count--zero'}`}
        >
          {voteCount}
        </span>
        <button
          type='button'
          onClick={onInc}
          disabled={!canVote}
          className={`voting__step-btn ${!canVote ? 'voting__step-btn--disabled' : 'voting__step-btn--accent'}`}
        >
          <Icon name='plus' size={14} />
        </button>
      </div>
    </div>
  );
}

export function OpenVotingActions({
  total,
  onApurar,
  onSkip,
}: {
  total: number;
  onApurar: () => void;
  onSkip: () => void;
}) {
  return (
    <div className='voting__actions'>
      <Button
        variant='danger'
        icon='gavel'
        disabled={total === 0}
        onClick={onApurar}
      >
        Apurar Votos
      </Button>
      <Button variant='quiet' size='md' onClick={onSkip}>
        Pular votação (ninguém sai)
      </Button>
    </div>
  );
}

export function SecretPassView({
  voterName,
  voterIndex,
  totalVoters,
  onOpen,
}: SecretPassViewProps) {
  return (
    <div className='animate-fade-in voting-pass'>
      <div className='x9-mono voting-pass__counter'>
        {String(voterIndex + 1).padStart(2, '0')} /{' '}
        {String(totalVoters).padStart(2, '0')}
      </div>
      <div className='x9-label voting-pass__label'>
        Voto secreto · passe para
      </div>
      <div className='voting-pass__name'>{voterName}</div>
      <p className='x9-small voting-pass__hint'>
        Que ninguém veja seu voto. Quando estiver com {voterName}, toque para
        votar.
      </p>
      <div className='voting-pass__action'>
        <Button variant='primary' icon='eye-off' onClick={onOpen}>
          Votar em segredo
        </Button>
      </div>
    </div>
  );
}

export function SecretBallotView({
  voterName,
  suspects,
  selected,
  isLast,
  onSelect,
  onCommit,
}: SecretBallotViewProps) {
  return (
    <div className='voting-ballot'>
      <div className='x9-label voting-ballot__voter'>Voto de {voterName}</div>
      <div className='x9-h2 voting-ballot__title'>Quem é o X9?</div>

      <div className='voting-ballot__list'>
        {suspects.map((p) => {
          const on = selected === p.id;
          return (
            <button
              key={p.id}
              type='button'
              onClick={() => onSelect(p.id)}
              className={`voting-ballot__option ${on ? 'voting-ballot__option--selected' : 'voting-ballot__option--unselected'}`}
            >
              <span
                className={`voting__player-avatar ${on ? 'voting__player-avatar--active' : 'voting__player-avatar--inactive'}`}
              >
                <Icon name='user' size={17} />
              </span>
              <span className='voting__player-name'>{p.name}</span>
              <span
                className={`voting-ballot__radio ${on ? 'voting-ballot__radio--selected' : 'voting-ballot__radio--unselected'}`}
              >
                {on && (
                  <Icon name='check' size={13} color='var(--text-on-neon)' />
                )}
              </span>
            </button>
          );
        })}
      </div>

      <div className='voting__actions'>
        <Button
          variant='primary'
          icon={isLast ? 'gavel' : 'arrow-right'}
          disabled={selected === null}
          onClick={() => onCommit(selected)}
        >
          {isLast ? 'Votar e apurar' : 'Confirmar e passar'}
        </Button>
        <Button variant='quiet' size='md' onClick={() => onCommit(null)}>
          Anular meu voto
        </Button>
      </div>
    </div>
  );
}
