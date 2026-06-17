import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Player } from '../../../common/interfaces/player.interface.ts';
import { computePlayerOrder, useDiscussionTimer } from '../discussion.hooks.ts';

vi.mock('../../../game/feedback.ts', () => ({
  timesUp: vi.fn(),
}));

const players: Player[] = [
  { id: 0, name: 'Ana', isImpostor: false, alive: true },
  { id: 1, name: 'Bia', isImpostor: false, alive: true },
  { id: 2, name: 'Carlos', isImpostor: true, alive: true },
  { id: 3, name: 'Dan', isImpostor: false, alive: false },
];

describe('computePlayerOrder', () => {
  it('rotaciona lista para starter ser primeiro', () => {
    const { order } = computePlayerOrder(players, 2);
    expect(order[0].name).toBe('Carlos');
    expect(order[1].name).toBe('Ana');
    expect(order[2].name).toBe('Bia');
  });

  it('sem rotação quando starter é o primeiro', () => {
    const { order } = computePlayerOrder(players, 0);
    expect(order[0].name).toBe('Ana');
  });

  it('starterId null usa índice 0', () => {
    const { order } = computePlayerOrder(players, null);
    expect(order[0].name).toBe('Ana');
  });

  it('starterId inválido usa índice 0', () => {
    const { order } = computePlayerOrder(players, 999);
    expect(order[0].name).toBe('Ana');
  });

  it('separa vivos e eliminados', () => {
    const { order, eliminated } = computePlayerOrder(players, 0);
    expect(order).toHaveLength(3);
    expect(eliminated).toHaveLength(1);
    expect(eliminated[0].name).toBe('Dan');
  });

  it('retorna starterName correto', () => {
    const { starterName } = computePlayerOrder(players, 1);
    expect(starterName).toBe('Bia');
  });
});

describe('useDiscussionTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('estado inicial correto', () => {
    const { result } = renderHook(() => useDiscussionTimer(120));
    expect(result.current.mm).toBe('02');
    expect(result.current.ss).toBe('00');
    expect(result.current.running).toBe(true);
    expect(result.current.done).toBe(false);
    expect(result.current.warn).toBe(false);
  });

  it('decrementa a cada segundo', () => {
    const { result } = renderHook(() => useDiscussionTimer(120));
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.mm).toBe('01');
    expect(result.current.ss).toBe('59');
  });

  it('formata mm:ss com padding', () => {
    const { result } = renderHook(() => useDiscussionTimer(65));
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.mm).toBe('01');
    expect(result.current.ss).toBe('04');
  });

  it('warn ativa quando secs <= 30', () => {
    const { result } = renderHook(() => useDiscussionTimer(32));
    expect(result.current.warn).toBe(false);
    act(() => vi.advanceTimersByTime(2000));
    expect(result.current.warn).toBe(true);
  });

  it('chega a zero e para', async () => {
    const { timesUp } = await import('../../../game/feedback.ts');
    const { result } = renderHook(() => useDiscussionTimer(2));
    act(() => vi.advanceTimersByTime(2000));
    expect(result.current.done).toBe(true);
    expect(result.current.running).toBe(false);
    expect(timesUp).toHaveBeenCalledOnce();
  });

  it('timesUp é chamado apenas uma vez (dedup)', async () => {
    const { timesUp } = await import('../../../game/feedback.ts');
    const { result } = renderHook(() => useDiscussionTimer(1));
    act(() => vi.advanceTimersByTime(3000));
    expect(result.current.done).toBe(true);
    expect(timesUp).toHaveBeenCalledOnce();
  });

  it('toggle pausa o timer', () => {
    const { result } = renderHook(() => useDiscussionTimer(60));
    act(() => result.current.toggle());
    expect(result.current.running).toBe(false);
    const before = result.current.ss;
    act(() => vi.advanceTimersByTime(2000));
    expect(result.current.ss).toBe(before);
  });

  it('toggle retoma o timer', () => {
    const { result } = renderHook(() => useDiscussionTimer(60));
    act(() => result.current.toggle());
    act(() => result.current.toggle());
    expect(result.current.running).toBe(true);
  });

  it('toggle quando done reseta o timer', () => {
    const { result } = renderHook(() => useDiscussionTimer(1));
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.done).toBe(true);
    act(() => result.current.toggle());
    expect(result.current.done).toBe(false);
    expect(result.current.running).toBe(true);
    expect(result.current.mm).toBe('00');
    expect(result.current.ss).toBe('01');
  });
});
