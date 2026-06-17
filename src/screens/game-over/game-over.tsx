import './game-over.css';

import { Screen } from '../../components/screen/screen.tsx';
import { computeGameOverConfig } from './game-over.hooks.ts';
import type { GameOverScreenProps } from './game-over.interface.ts';
import {
  GameOverActions,
  ImpostorList,
  VictoryHeader,
  WordReveal,
} from './game-over.layout.tsx';

export default function GameOverScreen({
  winner,
  players,
  word,
  onPlayAgain,
  onNewSetup,
}: GameOverScreenProps) {
  const { civsWon, accent, accentSoft, glow, impostors } =
    computeGameOverConfig(winner, players);

  return (
    <Screen dark={true}>
      <div className='animate-pop-in game-over'>
        <VictoryHeader
          civsWon={civsWon}
          accent={accent}
          accentSoft={accentSoft}
          glow={glow}
        />
        <WordReveal word={word} />
        <ImpostorList impostors={impostors} />
        <div className='game-over__spacer' />
        <GameOverActions onPlayAgain={onPlayAgain} onNewSetup={onNewSetup} />
      </div>
    </Screen>
  );
}
