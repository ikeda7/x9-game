import { useState } from 'react';

import { pickRandomWord } from '../common/data/words.ts';
import { Phase } from '../common/enums/phase.enum.ts';
import type { Team } from '../common/enums/team.enum.ts';
import type { GameConfig } from '../common/interfaces/game-config.ts';
import type { Player } from '../common/interfaces/player.interface.ts';
import type { WordEntry } from '../common/interfaces/word-entry.interface.ts';
import { checkWinner, createPlayers } from '../game/logic.ts';
import { saveSetup } from '../game/storage.ts';
import type { NoElimReason, UseGameResult } from './App.interface.ts';

function pickStarter(list: Player[]): number | null {
  const alive = list.filter((p) => p.alive);
  if (alive.length === 0) return null;
  return alive[Math.floor(Math.random() * alive.length)].id;
}

export function useGame(): UseGameResult {
  const [phase, setPhase] = useState<Phase>(Phase.HOME);
  const [config, setConfig] = useState<GameConfig | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [word, setWord] = useState<WordEntry | null>(null);
  const [lastEliminated, setLastEliminated] = useState<Player | null>(null);
  const [noElimReason, setNoElimReason] = useState<NoElimReason | null>(null);
  const [winner, setWinner] = useState<Team | null>(null);
  const [starterId, setStarterId] = useState<number | null>(null);
  const [round, setRound] = useState(0);

  function goToDiscussion(list = players) {
    setStarterId(pickStarter(list));
    setLastEliminated(null);
    setNoElimReason(null);
    setRound((r) => r + 1);
    setPhase(Phase.DISCUSSION);
  }

  function startGame(cfg: GameConfig) {
    saveSetup(cfg);
    const newPlayers = createPlayers(cfg.names, cfg.impostorCount);
    setConfig(cfg);
    setPlayers(newPlayers);
    setWord(pickRandomWord(cfg.categories));
    setLastEliminated(null);
    setNoElimReason(null);
    setWinner(null);
    setStarterId(null);
    setRound(0);
    setPhase(Phase.REVEAL);
  }

  function eliminate(playerId: number) {
    const updated = players.map((p) =>
      p.id === playerId ? { ...p, alive: false } : p,
    );
    setPlayers(updated);
    setLastEliminated(updated.find((p) => p.id === playerId) ?? null);
    setNoElimReason(null);
    setWinner(checkWinner(updated));
    setPhase(Phase.ROUND_RESULT);
  }

  function resolveNoElimination(reason: NoElimReason) {
    setLastEliminated(null);
    setNoElimReason(reason);
    setWinner(null);
    setPhase(Phase.ROUND_RESULT);
  }

  function continueAfterResult() {
    if (winner) setPhase(Phase.GAME_OVER);
    else goToDiscussion();
  }

  function playAgain() {
    if (!config) return;
    startGame(config);
  }

  function resetAll() {
    setConfig(null);
    setPlayers([]);
    setWord(null);
    setLastEliminated(null);
    setNoElimReason(null);
    setWinner(null);
    setStarterId(null);
  }

  function newSetup() {
    resetAll();
    setPhase(Phase.SETUP);
  }

  function backToHome() {
    resetAll();
    setPhase(Phase.HOME);
  }

  return {
    state: {
      phase,
      config,
      players,
      word,
      lastEliminated,
      noElimReason,
      winner,
      starterId,
      round,
    },
    actions: {
      goToSetup: () => setPhase(Phase.SETUP),
      startGame,
      goToVoting: () => setPhase(Phase.VOTING),
      eliminate,
      resolveNoElimination,
      continueAfterResult,
      playAgain,
      newSetup,
      backToHome,
      goToDiscussion,
    },
  };
}
