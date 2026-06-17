import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SecretVoteStep } from '../../../common/enums/secret-vote-step.enum.ts';
import type { Player } from '../../../common/interfaces/player.interface.ts';
import { useOpenVoting, useSecretVoting } from '../voting.hooks.ts';

vi.mock('../../../game/feedback.ts', () => ({
  haptic: vi.fn(),
}));

const players: Player[] = [
  { id: 0, name: 'Ana', isImpostor: false, alive: true },
  { id: 1, name: 'Bia', isImpostor: true, alive: true },
  { id: 2, name: 'Carlos', isImpostor: false, alive: true },
  { id: 3, name: 'Dan', isImpostor: false, alive: false },
];

afterEach(() => {
  vi.restoreAllMocks();
});

describe('useOpenVoting', () => {
  function setup(
    overrides?: Partial<Record<string, ReturnType<typeof vi.fn>>>,
  ) {
    const onEliminate = overrides?.onEliminate ?? vi.fn();
    const onTie = overrides?.onTie ?? vi.fn();
    const onSkip = overrides?.onSkip ?? vi.fn();
    return renderHook(() =>
      useOpenVoting(
        players,
        onEliminate as (id: number) => void,
        onTie as () => void,
        onSkip as () => void,
      ),
    );
  }

  it('filtra apenas jogadores vivos', () => {
    const { result } = setup();
    expect(result.current.alive).toHaveLength(3);
    expect(result.current.alive.every((p) => p.alive)).toBe(true);
  });

  it('estado inicial: total=0, remaining=vivos', () => {
    const { result } = setup();
    expect(result.current.total).toBe(0);
    expect(result.current.remaining).toBe(3);
  });

  it('inc incrementa voto e atualiza totais', () => {
    const { result } = setup();
    act(() => result.current.inc(0));
    expect(result.current.votes[0]).toBe(1);
    expect(result.current.total).toBe(1);
    expect(result.current.remaining).toBe(2);
  });

  it('inc é no-op quando remaining = 0', () => {
    const { result } = setup();
    act(() => result.current.inc(0));
    act(() => result.current.inc(0));
    act(() => result.current.inc(0));
    act(() => result.current.inc(0));
    expect(result.current.total).toBe(3);
    expect(result.current.remaining).toBe(0);
  });

  it('dec decrementa voto (mínimo 0)', () => {
    const { result } = setup();
    act(() => result.current.inc(0));
    act(() => result.current.inc(0));
    act(() => result.current.dec(0));
    expect(result.current.votes[0]).toBe(1);
  });

  it('dec não vai abaixo de 0', () => {
    const { result } = setup();
    act(() => result.current.dec(0));
    expect(result.current.votes[0]).toBe(0);
  });

  it('apurar com maioria chama onEliminate', () => {
    const onEliminate = vi.fn();
    const { result } = setup({ onEliminate });
    act(() => result.current.inc(1));
    act(() => result.current.inc(1));
    act(() => result.current.inc(0));
    act(() => result.current.apurar());
    expect(onEliminate).toHaveBeenCalledWith(1);
  });

  it('apurar com empate chama onTie', () => {
    const onTie = vi.fn();
    const { result } = setup({ onTie });
    act(() => result.current.inc(0));
    act(() => result.current.inc(1));
    act(() => result.current.apurar());
    expect(onTie).toHaveBeenCalledOnce();
  });

  it('apurar sem votos chama onSkip', () => {
    const onSkip = vi.fn();
    const { result } = setup({ onSkip });
    act(() => result.current.apurar());
    expect(onSkip).toHaveBeenCalledOnce();
  });
});

describe('useSecretVoting', () => {
  function setup(
    overrides?: Partial<Record<string, ReturnType<typeof vi.fn>>>,
  ) {
    const onEliminate = overrides?.onEliminate ?? vi.fn();
    const onTie = overrides?.onTie ?? vi.fn();
    const onSkip = overrides?.onSkip ?? vi.fn();
    return renderHook(() =>
      useSecretVoting(
        players,
        onEliminate as (id: number) => void,
        onTie as () => void,
        onSkip as () => void,
      ),
    );
  }

  it('estado inicial correto', () => {
    const { result } = setup();
    expect(result.current.voter.name).toBe('Ana');
    expect(result.current.step).toBe(SecretVoteStep.PASS);
    expect(result.current.selected).toBeNull();
    expect(result.current.isLast).toBe(false);
  });

  it('filtra jogadores mortos', () => {
    const { result } = setup();
    expect(result.current.alive).toHaveLength(3);
  });

  it('suspects exclui o votante atual', () => {
    const { result } = setup();
    expect(result.current.suspects.find((p) => p.id === 0)).toBeUndefined();
    expect(result.current.suspects).toHaveLength(2);
  });

  it('openBallot muda step para BALLOT', async () => {
    const { haptic } = await import('../../../game/feedback.ts');
    const { result } = setup();
    act(() => result.current.openBallot());
    expect(result.current.step).toBe(SecretVoteStep.BALLOT);
    expect(haptic).toHaveBeenCalledWith(20);
  });

  it('setSelected atualiza seleção', () => {
    const { result } = setup();
    act(() => result.current.setSelected(1));
    expect(result.current.selected).toBe(1);
  });

  it('commit avança para próximo votante', () => {
    const { result } = setup();
    act(() => result.current.openBallot());
    act(() => result.current.commit(1));
    expect(result.current.voter.name).toBe('Bia');
    expect(result.current.step).toBe(SecretVoteStep.PASS);
    expect(result.current.selected).toBeNull();
  });

  it('isLast é true no último votante', () => {
    const { result } = setup();
    act(() => result.current.openBallot());
    act(() => result.current.commit(1));
    act(() => result.current.openBallot());
    act(() => result.current.commit(0));
    expect(result.current.isLast).toBe(true);
  });

  it('commit do último com maioria chama onEliminate', () => {
    const onEliminate = vi.fn();
    const { result } = setup({ onEliminate });
    act(() => result.current.openBallot());
    act(() => result.current.commit(1));
    act(() => result.current.openBallot());
    act(() => result.current.commit(1));
    act(() => result.current.openBallot());
    act(() => result.current.commit(0));
    expect(onEliminate).toHaveBeenCalledWith(1);
  });

  it('commit do último com empate chama onTie', () => {
    const onTie = vi.fn();
    const { result } = setup({ onTie });
    act(() => result.current.openBallot());
    act(() => result.current.commit(1));
    act(() => result.current.openBallot());
    act(() => result.current.commit(0));
    act(() => result.current.openBallot());
    act(() => result.current.commit(2));
    expect(onTie).toHaveBeenCalledOnce();
  });

  it('todos votam null chama onSkip', () => {
    const onSkip = vi.fn();
    const { result } = setup({ onSkip });
    act(() => result.current.openBallot());
    act(() => result.current.commit(null));
    act(() => result.current.openBallot());
    act(() => result.current.commit(null));
    act(() => result.current.openBallot());
    act(() => result.current.commit(null));
    expect(onSkip).toHaveBeenCalledOnce();
  });

  it('fluxo completo de 3 jogadores', () => {
    const onEliminate = vi.fn();
    const { result } = setup({ onEliminate });

    for (let i = 0; i < 3; i++) {
      act(() => result.current.openBallot());
      act(() => result.current.setSelected(2));
      act(() => result.current.commit(2));
    }

    expect(onEliminate).toHaveBeenCalledWith(2);
  });
});
