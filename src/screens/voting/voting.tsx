import './voting.css';

import { SecretVoteStep } from '../../common/enums/secret-vote-step.enum.ts';
import { VoteMode } from '../../common/enums/vote-mode.enum.ts';
import { Screen } from '../../components/screen/screen.tsx';
import { useOpenVoting, useSecretVoting } from './voting.hooks.ts';
import type { VotingScreenProps } from './voting.interface.ts';
import {
  OpenPlayerRow,
  OpenVotingActions,
  SecretBallotView,
  SecretPassView,
  VoteCountPill,
  VotingHeader,
} from './voting.layout.tsx';

export default function VotingScreen({
  mode,
  players,
  onEliminate,
  onTie,
  onSkip,
}: VotingScreenProps) {
  return mode === VoteMode.SECRET ? (
    <SecretVoting
      players={players}
      onEliminate={onEliminate}
      onTie={onTie}
      onSkip={onSkip}
    />
  ) : (
    <OpenVoting
      players={players}
      onEliminate={onEliminate}
      onTie={onTie}
      onSkip={onSkip}
    />
  );
}

function OpenVoting({
  players,
  onEliminate,
  onTie,
  onSkip,
}: Omit<VotingScreenProps, 'mode'>) {
  const { alive, votes, total, remaining, inc, dec, apurar } = useOpenVoting(
    players,
    onEliminate,
    onTie,
    onSkip,
  );

  return (
    <Screen>
      <div className='voting'>
        <VotingHeader />
        <VoteCountPill remaining={remaining} />

        <div className='voting__list'>
          {alive.map((p) => (
            <OpenPlayerRow
              key={p.id}
              player={p}
              voteCount={votes[p.id] ?? 0}
              canVote={remaining > 0}
              onInc={() => inc(p.id)}
              onDec={() => dec(p.id)}
            />
          ))}
        </div>

        <OpenVotingActions total={total} onApurar={apurar} onSkip={onSkip} />
      </div>
    </Screen>
  );
}

function SecretVoting({
  players,
  onEliminate,
  onTie,
  onSkip,
}: Omit<VotingScreenProps, 'mode'>) {
  const {
    alive,
    voter,
    isLast,
    suspects,
    step,
    selected,
    setSelected,
    openBallot,
    commit,
  } = useSecretVoting(players, onEliminate, onTie, onSkip);

  if (step === SecretVoteStep.PASS) {
    return (
      <Screen dark={true}>
        <SecretPassView
          voterName={voter.name}
          voterIndex={alive.indexOf(voter)}
          totalVoters={alive.length}
          onOpen={openBallot}
        />
      </Screen>
    );
  }

  return (
    <Screen dark={true}>
      <SecretBallotView
        voterName={voter.name}
        suspects={suspects}
        selected={selected}
        isLast={isLast}
        onSelect={setSelected}
        onCommit={commit}
      />
    </Screen>
  );
}
