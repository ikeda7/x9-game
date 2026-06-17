import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Player } from '../../../common/interfaces/player.interface.ts';
import { useHoldToReveal, useRevealFlow } from '../reveal.hooks.ts';

vi.mock('../../../game/feedback.ts', () => ({
  haptic: vi.fn(),
}));

const players: Player[] = [
  { id: 0, name: 'Ana', isImpostor: false, alive: true },
  { id: 1, name: 'Bia', isImpostor: true, alive: true },
  { id: 2, name: 'Carlos', isImpostor: false, alive: true },
];

describe('useRevealFlow', () => {
  it('estado inicial correto', () => {
    const onDone = vi.fn();
    const { result } = renderHook(() => useRevealFlow(players, onDone));
    expect(result.current.index).toBe(0);
    expect(result.current.revealed).toBe(false);
    expect(result.current.player.name).toBe('Ana');
    expect(result.current.total).toBe(3);
    expect(result.current.isLast).toBe(false);
  });

  it('reveal marca como revelado', async () => {
    const { haptic } = await import('../../../game/feedback.ts');
    const onDone = vi.fn();
    const { result } = renderHook(() => useRevealFlow(players, onDone));
    act(() => result.current.reveal());
    expect(result.current.revealed).toBe(true);
    expect(haptic).toHaveBeenCalledWith(28);
  });

  it('next avança para o próximo jogador', () => {
    const onDone = vi.fn();
    const { result } = renderHook(() => useRevealFlow(players, onDone));
    act(() => result.current.reveal());
    act(() => result.current.next());
    expect(result.current.index).toBe(1);
    expect(result.current.revealed).toBe(false);
    expect(result.current.player.name).toBe('Bia');
  });

  it('isLast é true no último jogador', () => {
    const onDone = vi.fn();
    const { result } = renderHook(() => useRevealFlow(players, onDone));
    act(() => result.current.reveal());
    act(() => result.current.next());
    act(() => result.current.reveal());
    act(() => result.current.next());
    expect(result.current.isLast).toBe(true);
  });

  it('next no último jogador chama onDone', () => {
    const onDone = vi.fn();
    const { result } = renderHook(() => useRevealFlow(players, onDone));
    act(() => result.current.reveal());
    act(() => result.current.next());
    act(() => result.current.reveal());
    act(() => result.current.next());
    act(() => result.current.reveal());
    act(() => result.current.next());
    expect(onDone).toHaveBeenCalledOnce();
  });

  it('fluxo completo percorre todos os jogadores', () => {
    const onDone = vi.fn();
    const { result } = renderHook(() => useRevealFlow(players, onDone));
    const names: string[] = [];
    for (let i = 0; i < 3; i++) {
      names.push(result.current.player.name);
      act(() => result.current.reveal());
      act(() => result.current.next());
    }
    expect(names).toEqual(['Ana', 'Bia', 'Carlos']);
    expect(onDone).toHaveBeenCalledOnce();
  });
});

describe('useHoldToReveal', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('estado inicial: holding é false', () => {
    const { result } = renderHook(() => useHoldToReveal(vi.fn()));
    expect(result.current.holding).toBe(false);
  });

  it('start ativa holding', () => {
    const { result } = renderHook(() => useHoldToReveal(vi.fn()));
    act(() => result.current.start());
    expect(result.current.holding).toBe(true);
  });

  it('após 650ms chama onReveal e desativa holding', () => {
    const onReveal = vi.fn();
    const { result } = renderHook(() => useHoldToReveal(onReveal));
    act(() => result.current.start());
    act(() => vi.advanceTimersByTime(650));
    expect(onReveal).toHaveBeenCalledOnce();
    expect(result.current.holding).toBe(false);
  });

  it('cancel antes de 650ms impede onReveal', () => {
    const onReveal = vi.fn();
    const { result } = renderHook(() => useHoldToReveal(onReveal));
    act(() => result.current.start());
    act(() => result.current.cancel());
    act(() => vi.advanceTimersByTime(650));
    expect(onReveal).not.toHaveBeenCalled();
    expect(result.current.holding).toBe(false);
  });
});
