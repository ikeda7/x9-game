import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NoElimReason } from '../../common/enums/no-elim-reason.enum.ts';
import { Phase } from '../../common/enums/phase.enum.ts';
import { Team } from '../../common/enums/team.enum.ts';
import { VoteMode } from '../../common/enums/vote-mode.enum.ts';
import type { GameConfig } from '../../common/interfaces/game-config.ts';
import type { Player } from '../../common/interfaces/player.interface.ts';
import { useGame } from '../App.hooks.ts';

vi.mock('../../common/data/words.ts', () => ({
  pickRandomWord: () => ({
    category: 'Animais',
    word: 'Gato',
    emoji: '🐱',
    hint: 'Felino',
  }),
}));

vi.mock('../../game/logic.ts', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../game/logic.ts')>();
  return {
    ...actual,
    createPlayers: (names: string[], impostorCount: number): Player[] =>
      names.map((name, i) => ({
        id: i,
        name,
        isImpostor: i < impostorCount,
        alive: true,
      })),
  };
});

vi.mock('../../game/storage.ts', () => ({
  saveSetup: vi.fn(),
}));

const config: GameConfig = {
  names: ['Lucas', 'Igor', 'Marcos'],
  impostorCount: 1,
  hintMode: false,
  discussionSeconds: 60,
  categories: [],
  voteMode: VoteMode.OPEN,
};

function startedGame() {
  const hook = renderHook(() => useGame());
  act(() => hook.result.current.actions.startGame(config));
  return hook;
}

describe('useGame', () => {
  describe('estado inicial', () => {
    it('começa na fase HOME', () => {
      const { result } = renderHook(() => useGame());
      expect(result.current.state.phase).toBe(Phase.HOME);
    });

    it('começa sem jogadores, palavra ou config', () => {
      const { result } = renderHook(() => useGame());
      expect(result.current.state.players).toEqual([]);
      expect(result.current.state.word).toBeNull();
      expect(result.current.state.config).toBeNull();
    });
  });

  describe('navegação básica', () => {
    it('goToSetup transiciona para SETUP', () => {
      const { result } = renderHook(() => useGame());
      act(() => result.current.actions.goToSetup());
      expect(result.current.state.phase).toBe(Phase.SETUP);
    });

    it('backToHome volta para HOME e limpa estado', () => {
      const hook = startedGame();
      act(() => hook.result.current.actions.backToHome());
      expect(hook.result.current.state.phase).toBe(Phase.HOME);
      expect(hook.result.current.state.players).toEqual([]);
      expect(hook.result.current.state.config).toBeNull();
    });
  });

  describe('startGame', () => {
    it('transiciona para REVEAL', () => {
      const hook = startedGame();
      expect(hook.result.current.state.phase).toBe(Phase.REVEAL);
    });

    it('cria jogadores e sorteia palavra', () => {
      const hook = startedGame();
      const { players, word } = hook.result.current.state;
      expect(players).toHaveLength(3);
      expect(players[0].name).toBe('Lucas');
      expect(word).not.toBeNull();
      expect(word?.word).toBe('Gato');
    });

    it('armazena a config', () => {
      const hook = startedGame();
      expect(hook.result.current.state.config).toEqual(config);
    });

    it('reseta round para 0', () => {
      const hook = startedGame();
      expect(hook.result.current.state.round).toBe(0);
    });
  });

  describe('fluxo de discussão e votação', () => {
    it('goToDiscussion transiciona para DISCUSSION e incrementa round', () => {
      const hook = startedGame();
      act(() => hook.result.current.actions.goToDiscussion());
      expect(hook.result.current.state.phase).toBe(Phase.DISCUSSION);
      expect(hook.result.current.state.round).toBe(1);
    });

    it('goToDiscussion define um starterId válido', () => {
      const hook = startedGame();
      act(() => hook.result.current.actions.goToDiscussion());
      const { starterId, players } = hook.result.current.state;
      expect(starterId).not.toBeNull();
      const ids = players.filter((p) => p.alive).map((p) => p.id);
      expect(ids).toContain(starterId);
    });

    it('goToVoting transiciona para VOTING', () => {
      const hook = startedGame();
      act(() => hook.result.current.actions.goToDiscussion());
      act(() => hook.result.current.actions.goToVoting());
      expect(hook.result.current.state.phase).toBe(Phase.VOTING);
    });
  });

  describe('eliminação', () => {
    it('eliminate marca jogador como morto e vai para ROUND_RESULT', () => {
      const hook = startedGame();
      act(() => hook.result.current.actions.eliminate(2));
      expect(hook.result.current.state.phase).toBe(Phase.ROUND_RESULT);
      expect(hook.result.current.state.players[2].alive).toBe(false);
    });

    it('eliminate registra o jogador eliminado', () => {
      const hook = startedGame();
      act(() => hook.result.current.actions.eliminate(1));
      expect(hook.result.current.state.lastEliminated?.id).toBe(1);
    });

    it('eliminate calcula winner quando impostores são eliminados', () => {
      const hook = startedGame();
      act(() => hook.result.current.actions.eliminate(0));
      expect(hook.result.current.state.winner).toBe(Team.CIVILIANS);
    });
  });

  describe('resolveNoElimination', () => {
    it('registra empate e vai para ROUND_RESULT', () => {
      const hook = startedGame();
      act(() =>
        hook.result.current.actions.resolveNoElimination(NoElimReason.TIE),
      );
      expect(hook.result.current.state.phase).toBe(Phase.ROUND_RESULT);
      expect(hook.result.current.state.noElimReason).toBe(NoElimReason.TIE);
      expect(hook.result.current.state.lastEliminated).toBeNull();
    });

    it('registra skip e vai para ROUND_RESULT', () => {
      const hook = startedGame();
      act(() =>
        hook.result.current.actions.resolveNoElimination(NoElimReason.SKIP),
      );
      expect(hook.result.current.state.noElimReason).toBe(NoElimReason.SKIP);
    });
  });

  describe('continueAfterResult', () => {
    it('sem vencedor → volta para DISCUSSION', () => {
      const bigConfig: GameConfig = {
        ...config,
        names: ['Ana', 'Bia', 'Carlos', 'Dan', 'Eva'],
      };
      const hook = renderHook(() => useGame());
      act(() => hook.result.current.actions.startGame(bigConfig));
      act(() => hook.result.current.actions.eliminate(4));
      expect(hook.result.current.state.winner).toBeNull();
      act(() => hook.result.current.actions.continueAfterResult());
      expect(hook.result.current.state.phase).toBe(Phase.DISCUSSION);
    });

    it('com vencedor → vai para GAME_OVER', () => {
      const hook = startedGame();
      act(() => hook.result.current.actions.eliminate(0));
      expect(hook.result.current.state.winner).toBe(Team.CIVILIANS);
      act(() => hook.result.current.actions.continueAfterResult());
      expect(hook.result.current.state.phase).toBe(Phase.GAME_OVER);
    });
  });

  describe('pós-jogo', () => {
    it('playAgain reinicia com mesma config', () => {
      const hook = startedGame();
      act(() => hook.result.current.actions.eliminate(0));
      act(() => hook.result.current.actions.continueAfterResult());
      act(() => hook.result.current.actions.playAgain());
      expect(hook.result.current.state.phase).toBe(Phase.REVEAL);
      expect(hook.result.current.state.players).toHaveLength(3);
      expect(hook.result.current.state.players.every((p) => p.alive)).toBe(
        true,
      );
    });

    it('newSetup limpa estado e vai para SETUP', () => {
      const hook = startedGame();
      act(() => hook.result.current.actions.newSetup());
      expect(hook.result.current.state.phase).toBe(Phase.SETUP);
      expect(hook.result.current.state.players).toEqual([]);
      expect(hook.result.current.state.config).toBeNull();
    });
  });
});
