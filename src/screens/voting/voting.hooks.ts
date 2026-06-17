import { useState } from 'react';

import type { Player } from '../../common/interfaces/player.interface.ts';
import { haptic } from '../../game/feedback.ts';
import type {
  UseOpenVotingResult,
  UseSecretVotingResult,
} from './voting.interface.ts';

function resolveBallots(
  alive: Player[],
  ballots: Record<number, number | null>,
  on: {
    onEliminate: (id: number) => void;
    onTie: () => void;
    onSkip: () => void;
  },
) {
  const counts: Record<number, number> = {};
  for (const id of Object.values(ballots)) {
    if (id !== null) counts[id] = (counts[id] ?? 0) + 1;
  }
  const max = Math.max(0, ...alive.map((p) => counts[p.id] ?? 0));
  if (max === 0) return on.onSkip();
  const leaders = alive.filter((p) => (counts[p.id] ?? 0) === max);
  if (leaders.length === 1) on.onEliminate(leaders[0].id);
  else on.onTie();
}

export function useOpenVoting(
  players: Player[],
  onEliminate: (id: number) => void,
  onTie: () => void,
  onSkip: () => void,
): UseOpenVotingResult {
  const alive = players.filter((p) => p.alive);
  const [votes, setVotes] = useState<Record<number, number>>({});

  const total = Object.values(votes).reduce((a, b) => a + b, 0);
  const remaining = alive.length - total;

  function inc(id: number) {
    if (remaining <= 0) return;
    setVotes((v) => ({ ...v, [id]: (v[id] ?? 0) + 1 }));
  }

  function dec(id: number) {
    setVotes((v) => ({ ...v, [id]: Math.max(0, (v[id] ?? 0) - 1) }));
  }

  function apurar() {
    const max = Math.max(0, ...alive.map((p) => votes[p.id] ?? 0));
    if (max === 0) return onSkip();
    const leaders = alive.filter((p) => (votes[p.id] ?? 0) === max);
    if (leaders.length === 1) onEliminate(leaders[0].id);
    else onTie();
  }

  return { alive, votes, total, remaining, inc, dec, apurar };
}

export function useSecretVoting(
  players: Player[],
  onEliminate: (id: number) => void,
  onTie: () => void,
  onSkip: () => void,
): UseSecretVotingResult {
  const alive = players.filter((p) => p.alive);
  const [voterIndex, setVoterIndex] = useState(0);
  const [step, setStep] = useState<'pass' | 'ballot'>('pass');
  const [selected, setSelected] = useState<number | null>(null);
  const [ballots, setBallots] = useState<Record<number, number | null>>({});

  const voter = alive[voterIndex];
  const isLast = voterIndex === alive.length - 1;
  const suspects = alive.filter((p) => p.id !== voter.id);

  function openBallot() {
    haptic(20);
    setStep('ballot');
  }

  function commit(choice: number | null) {
    const next = { ...ballots, [voter.id]: choice };
    if (isLast) {
      resolveBallots(alive, next, { onEliminate, onTie, onSkip });
    } else {
      setBallots(next);
      setVoterIndex((i) => i + 1);
      setSelected(null);
      setStep('pass');
    }
  }

  return {
    alive,
    voter,
    isLast,
    suspects,
    step,
    selected,
    setSelected,
    openBallot,
    commit,
  };
}
