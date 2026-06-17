import './reveal.css';

import { Screen } from '../../components/screen/screen.tsx';
import { useRevealFlow } from './reveal.hooks.ts';
import type { RevealScreenProps } from './reveal.interface.ts';
import { RevealCardView, RevealWaitView } from './reveal.layout.tsx';

export default function RevealScreen({
  players,
  word,
  hintMode,
  onDone,
}: RevealScreenProps) {
  const { player, isLast, revealed, index, total, reveal, next } =
    useRevealFlow(players, onDone);

  if (!revealed) {
    return (
      <Screen dark={true}>
        <RevealWaitView
          playerName={player.name}
          index={index}
          total={total}
          onReveal={reveal}
        />
      </Screen>
    );
  }

  return (
    <Screen dark={true}>
      <RevealCardView
        player={player}
        word={word}
        hintMode={hintMode}
        index={index}
        total={total}
        last={isLast}
        onNext={next}
      />
    </Screen>
  );
}
