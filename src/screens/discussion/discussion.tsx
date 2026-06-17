import './discussion.css';

import { Screen } from '../../components/screen/screen.tsx';
import { computePlayerOrder, useDiscussionTimer } from './discussion.hooks.ts';
import type { DiscussionScreenProps } from './discussion.interface.ts';
import {
  DiscussionFooter,
  PlayerOrderList,
  StarterBadge,
  TimerPanel,
} from './discussion.layout.tsx';

/** Fase de debate: quem começa + ordem de fala, cronômetro regressivo. */
export default function DiscussionScreen({
  players,
  starterId,
  durationSeconds,
  onVote,
}: DiscussionScreenProps) {
  const timer = useDiscussionTimer(durationSeconds);
  const { order, eliminated, starterName } = computePlayerOrder(
    players,
    starterId,
  );

  return (
    <Screen>
      <div className='discussion-content'>
        <div className='x9-label discussion-phase-label'>Fase de Discussão</div>

        <TimerPanel {...timer} />
        <StarterBadge name={starterName} />

        <div className='x9-label discussion-order-label'>Ordem de fala</div>

        <PlayerOrderList order={order} eliminated={eliminated} />
        <DiscussionFooter onVote={onVote} />
      </div>
    </Screen>
  );
}
