import { useState } from 'react';

import { CATEGORIES } from '../../common/data/words.ts';
import { VoteMode } from '../../common/enums/vote-mode.enum.ts';
import type { GameConfig } from '../../common/interfaces/game-config.ts';
import { loadSetup } from '../../game/storage.ts';
import type { PlayerEntry, UseSetupFormResult } from './setup.interface.ts';

const MIN_PLAYERS = 3;
let nextId = 1;

function maxImpostors(playerCount: number): number {
  return Math.max(1, Math.floor((playerCount - 1) / 2));
}

function toEntries(names: string[]): PlayerEntry[] {
  return names.map((n) => ({ id: nextId++, name: n }));
}

export function useSetupForm(
  onStart: (config: GameConfig) => void,
): UseSetupFormResult {
  const [saved] = useState(loadSetup);
  const savedCategories = (saved?.categories ?? []).filter((c) =>
    CATEGORIES.includes(c),
  );

  const [players, setPlayers] = useState<PlayerEntry[]>(() =>
    toEntries(saved?.names ?? []),
  );
  const [name, setName] = useState('');
  const [impostors, setImpostors] = useState(saved?.impostorCount ?? 1);
  const [hintMode, setHintMode] = useState(saved?.hintMode ?? false);
  const [duration, setDuration] = useState(saved?.discussionSeconds ?? 120);
  const [categories, setCategories] = useState<string[]>(
    savedCategories.length > 0 ? savedCategories : CATEGORIES,
  );
  const [voteMode, setVoteMode] = useState<VoteMode>(
    saved?.voteMode ?? VoteMode.OPEN,
  );

  const enough = players.length >= MIN_PLAYERS;
  const cap = maxImpostors(players.length);
  const canStart = enough && categories.length > 0;

  function add() {
    const v = name.trim();
    if (!v) return;
    setPlayers((prev) => [...prev, { id: nextId++, name: v }]);
    setName('');
  }

  function remove(id: number) {
    setPlayers((prev) => {
      const next = prev.filter((p) => p.id !== id);
      setImpostors((c) => Math.min(c, maxImpostors(next.length)));
      return next;
    });
  }

  function toggleCategory(cat: string) {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  }

  function toggleHintMode() {
    setHintMode((v) => !v);
  }

  function start() {
    if (!canStart) return;
    onStart({
      names: players.map((p) => p.name),
      impostorCount: Math.min(impostors, cap),
      hintMode,
      discussionSeconds: duration,
      categories,
      voteMode,
    });
  }

  return {
    players,
    name,
    setName,
    impostors,
    hintMode,
    duration,
    categories,
    voteMode,
    enough,
    cap,
    canStart,
    add,
    remove,
    setImpostors,
    setDuration,
    setVoteMode,
    toggleCategory,
    toggleHintMode,
    start,
  };
}
