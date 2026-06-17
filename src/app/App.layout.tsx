import { Phase } from '../common/enums/phase.enum.ts';
import DiscussionScreen from '../screens/discussion/discussion.tsx';
import GameOverScreen from '../screens/game-over/game-over.tsx';
import HomeScreen from '../screens/home/home.tsx';
import RevealScreen from '../screens/reveal/reveal.tsx';
import RoundResultScreen from '../screens/round-result/round-result.tsx';
import SetupScreen from '../screens/setup/setup.tsx';
import VotingScreen from '../screens/voting/voting.tsx';
import type { GameActions, GameState } from './App.interface.ts';

export function PhaseRouter({
  state,
  actions,
}: {
  state: GameState;
  actions: GameActions;
}) {
  const {
    phase,
    config,
    players,
    word,
    lastEliminated,
    noElimReason,
    winner,
    starterId,
    round,
  } = state;

  switch (phase) {
    case Phase.HOME:
      return <HomeScreen onNew={actions.goToSetup} />;

    case Phase.SETUP:
      return (
        <SetupScreen onStart={actions.startGame} onBack={actions.backToHome} />
      );

    case Phase.REVEAL:
      if (!word || !config) return null;
      return (
        <RevealScreen
          players={players}
          word={word}
          hintMode={config.hintMode}
          onDone={() => actions.goToDiscussion()}
        />
      );

    case Phase.DISCUSSION:
      if (!config) return null;
      return (
        <DiscussionScreen
          key={round}
          players={players}
          starterId={starterId}
          durationSeconds={config.discussionSeconds}
          onVote={actions.goToVoting}
        />
      );

    case Phase.VOTING:
      if (!config) return null;
      return (
        <VotingScreen
          mode={config.voteMode}
          players={players}
          onEliminate={actions.eliminate}
          onTie={() => actions.resolveNoElimination('tie')}
          onSkip={() => actions.resolveNoElimination('skip')}
        />
      );

    case Phase.ROUND_RESULT:
      return (
        <RoundResultScreen
          eliminated={lastEliminated}
          noElimReason={noElimReason}
          remainingImpostors={
            players.filter((p) => p.alive && p.isImpostor).length
          }
          onContinue={actions.continueAfterResult}
        />
      );

    case Phase.GAME_OVER:
      if (!winner || !word) return null;
      return (
        <GameOverScreen
          winner={winner}
          players={players}
          word={word}
          onPlayAgain={actions.playAgain}
          onNewSetup={actions.newSetup}
        />
      );
  }
}
