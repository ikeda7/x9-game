import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { VoteMode } from '../../../common/enums/vote-mode.enum.ts';
import { useSetupForm } from '../setup.hooks.ts';

vi.mock('../../../game/storage.ts', () => ({
  loadSetup: vi.fn(() => null),
  saveSetup: vi.fn(),
}));

vi.mock('../../../common/data/words.ts', () => ({
  CATEGORIES: ['Animais', 'Comida', 'Esportes'],
}));

function setup(onStart = vi.fn()) {
  return renderHook(() => useSetupForm(onStart));
}

describe('useSetupForm', () => {
  describe('estado inicial', () => {
    it('começa sem jogadores', () => {
      const { result } = setup();
      expect(result.current.players).toHaveLength(0);
    });

    it('começa com valores padrão', () => {
      const { result } = setup();
      expect(result.current.impostors).toBe(1);
      expect(result.current.hintMode).toBe(false);
      expect(result.current.duration).toBe(120);
      expect(result.current.voteMode).toBe(VoteMode.OPEN);
    });

    it('começa com todas as categorias selecionadas', () => {
      const { result } = setup();
      expect(result.current.categories).toEqual([
        'Animais',
        'Comida',
        'Esportes',
      ]);
    });

    it('enough é falso e canStart é falso inicialmente', () => {
      const { result } = setup();
      expect(result.current.enough).toBe(false);
      expect(result.current.canStart).toBe(false);
    });
  });

  describe('add e remove jogadores', () => {
    it('adiciona jogador com nome trimado', () => {
      const { result } = setup();
      act(() => result.current.setName('  Ana  '));
      act(() => result.current.add());
      expect(result.current.players).toHaveLength(1);
      expect(result.current.players[0].name).toBe('Ana');
      expect(result.current.name).toBe('');
    });

    it('não adiciona nome vazio', () => {
      const { result } = setup();
      act(() => result.current.setName('   '));
      act(() => result.current.add());
      expect(result.current.players).toHaveLength(0);
    });

    it('remove jogador por id', () => {
      const { result } = setup();
      act(() => result.current.setName('Ana'));
      act(() => result.current.add());
      act(() => result.current.setName('Bia'));
      act(() => result.current.add());
      const idToRemove = result.current.players[0].id;
      act(() => result.current.remove(idToRemove));
      expect(result.current.players).toHaveLength(1);
      expect(result.current.players[0].name).toBe('Bia');
    });
  });

  describe('enough e canStart', () => {
    function addPlayers(
      result: { current: ReturnType<typeof useSetupForm> },
      names: string[],
    ) {
      for (const n of names) {
        act(() => result.current.setName(n));
        act(() => result.current.add());
      }
    }

    it('enough ativa com 3+ jogadores', () => {
      const { result } = setup();
      addPlayers(result, ['A', 'B', 'C']);
      expect(result.current.enough).toBe(true);
    });

    it('canStart é true com 3+ jogadores e categorias', () => {
      const { result } = setup();
      addPlayers(result, ['A', 'B', 'C']);
      expect(result.current.canStart).toBe(true);
    });

    it('canStart é false sem categorias', () => {
      const { result } = setup();
      addPlayers(result, ['A', 'B', 'C']);
      act(() => result.current.toggleCategory('Animais'));
      act(() => result.current.toggleCategory('Comida'));
      act(() => result.current.toggleCategory('Esportes'));
      expect(result.current.canStart).toBe(false);
    });
  });

  describe('cap de impostores', () => {
    it('cap = 1 para 3 jogadores', () => {
      const { result } = setup();
      for (const n of ['A', 'B', 'C']) {
        act(() => result.current.setName(n));
        act(() => result.current.add());
      }
      expect(result.current.cap).toBe(1);
    });

    it('cap = 2 para 5 jogadores', () => {
      const { result } = setup();
      for (const n of ['A', 'B', 'C', 'D', 'E']) {
        act(() => result.current.setName(n));
        act(() => result.current.add());
      }
      expect(result.current.cap).toBe(2);
    });

    it('remove reduz impostores se exceder novo cap', () => {
      const { result } = setup();
      for (const n of ['A', 'B', 'C', 'D', 'E']) {
        act(() => result.current.setName(n));
        act(() => result.current.add());
      }
      act(() => result.current.setImpostors(2));
      expect(result.current.impostors).toBe(2);

      act(() => result.current.remove(result.current.players[4].id));
      act(() => result.current.remove(result.current.players[3].id));
      expect(result.current.impostors).toBeLessThanOrEqual(result.current.cap);
    });
  });

  describe('categorias e toggles', () => {
    it('toggleCategory remove categoria existente', () => {
      const { result } = setup();
      act(() => result.current.toggleCategory('Animais'));
      expect(result.current.categories).not.toContain('Animais');
    });

    it('toggleCategory adiciona categoria removida', () => {
      const { result } = setup();
      act(() => result.current.toggleCategory('Animais'));
      act(() => result.current.toggleCategory('Animais'));
      expect(result.current.categories).toContain('Animais');
    });

    it('toggleHintMode alterna valor', () => {
      const { result } = setup();
      expect(result.current.hintMode).toBe(false);
      act(() => result.current.toggleHintMode());
      expect(result.current.hintMode).toBe(true);
    });
  });

  describe('start', () => {
    it('não chama onStart quando canStart é false', () => {
      const onStart = vi.fn();
      const { result } = renderHook(() => useSetupForm(onStart));
      act(() => result.current.start());
      expect(onStart).not.toHaveBeenCalled();
    });

    it('chama onStart com config correta', () => {
      const onStart = vi.fn();
      const { result } = renderHook(() => useSetupForm(onStart));
      for (const n of ['Ana', 'Bia', 'Carlos']) {
        act(() => result.current.setName(n));
        act(() => result.current.add());
      }
      act(() => result.current.start());
      expect(onStart).toHaveBeenCalledOnce();
      const cfg = onStart.mock.calls[0][0];
      expect(cfg.names).toEqual(['Ana', 'Bia', 'Carlos']);
      expect(cfg.impostorCount).toBe(1);
      expect(cfg.hintMode).toBe(false);
      expect(cfg.discussionSeconds).toBe(120);
      expect(cfg.categories).toEqual(['Animais', 'Comida', 'Esportes']);
      expect(cfg.voteMode).toBe(VoteMode.OPEN);
    });

    it('limita impostores ao cap na config', () => {
      const onStart = vi.fn();
      const { result } = renderHook(() => useSetupForm(onStart));
      for (const n of ['A', 'B', 'C']) {
        act(() => result.current.setName(n));
        act(() => result.current.add());
      }
      act(() => result.current.setImpostors(5));
      act(() => result.current.start());
      expect(onStart.mock.calls[0][0].impostorCount).toBe(1);
    });
  });
});
