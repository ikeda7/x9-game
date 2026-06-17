import { useRef, useState } from 'react';

import type { Player } from '../../common/interfaces/player.interface.ts';
import { haptic } from '../../game/feedback.ts';
import type {
  UseHoldToRevealResult,
  UseRevealFlowResult,
} from './reveal.interface.ts';

export function useRevealFlow(
  players: Player[],
  onDone: () => void,
): UseRevealFlowResult {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const player = players[index];
  const isLast = index === players.length - 1;

  function reveal() {
    haptic(28);
    setRevealed(true);
  }

  function next() {
    setRevealed(false);
    if (isLast) onDone();
    else setIndex((i) => i + 1);
  }

  return {
    player,
    isLast,
    revealed,
    index,
    total: players.length,
    reveal,
    next,
  };
}

export function useHoldToReveal(onReveal: () => void): UseHoldToRevealResult {
  const [holding, setHolding] = useState(false);
  const timer = useRef<number | null>(null);

  const start = () => {
    setHolding(true);
    timer.current = window.setTimeout(() => {
      setHolding(false);
      onReveal();
    }, 650);
  };

  const cancel = () => {
    setHolding(false);
    if (timer.current) window.clearTimeout(timer.current);
  };

  return { holding, start, cancel };
}
