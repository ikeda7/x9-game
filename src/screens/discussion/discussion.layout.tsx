import { Button } from '../../components/button/button.tsx';
import { Icon } from '../../components/icon/icon.tsx';
import type {
  PlayerOrderListProps,
  StarterBadgeProps,
  TimerPanelProps,
} from './discussion.interface.ts';

export function TimerPanel({
  mm,
  ss,
  done,
  warn,
  running,
  toggle,
}: TimerPanelProps) {
  return (
    <div className={`discussion-timer${warn ? ' discussion-timer--warn' : ''}`}>
      <div
        className={`discussion-timer-digits${warn ? ' discussion-timer-digits--warn' : ''}`}
      >
        {mm}:{ss}
      </div>
      <button
        type='button'
        onClick={toggle}
        className='discussion-timer-control'
      >
        <Icon
          name={done ? 'play' : running ? 'pause' : 'play'}
          size={13}
          color='var(--text-low)'
        />
        {done ? 'Reiniciar' : running ? 'Pausar' : 'Retomar'}
      </button>
    </div>
  );
}

export function StarterBadge({ name }: StarterBadgeProps) {
  if (!name) return null;
  return (
    <div className='discussion-starter-badge'>
      <Icon name='play' size={15} color='var(--neon-purple-soft)' />
      <span className='x9-small discussion-starter-text'>
        Começa falando: <span className='discussion-starter-name'>{name}</span>
      </span>
    </div>
  );
}

export function PlayerOrderList({ order, eliminated }: PlayerOrderListProps) {
  return (
    <div className='discussion-player-list'>
      {order.map((p, i) => {
        const isStarter = i === 0;
        return (
          <div
            key={p.id}
            className={`discussion-player-row${isStarter ? ' discussion-player-row--starter' : ''}`}
          >
            <span className='discussion-player-badge'>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className='discussion-player-name'>{p.name}</span>
            {isStarter && (
              <span className='x9-label discussion-starter-tag'>Começa</span>
            )}
          </div>
        );
      })}

      {eliminated.length > 0 && (
        <>
          <div className='x9-label discussion-eliminated-header'>
            Fora ({eliminated.length})
          </div>
          {eliminated.map((p) => (
            <div key={p.id} className='discussion-eliminated-row'>
              <span className='discussion-eliminated-badge'>
                <Icon name='skull' size={15} />
              </span>
              <span className='discussion-eliminated-name'>{p.name}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export function DiscussionFooter({ onVote }: { onVote: () => void }) {
  return (
    <>
      <div className='x9-body discussion-footer'>
        <Icon name='venetian-mask' size={16} color='var(--neon-red)' />O X9 está
        entre vocês.
      </div>
      <Button variant='primary' icon='gavel' onClick={onVote}>
        Ir para Votação
      </Button>
    </>
  );
}
