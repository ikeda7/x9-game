import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useHelp } from '../home.hooks.ts';

describe('useHelp', () => {
  it('começa com showHelp falso', () => {
    const { result } = renderHook(() => useHelp());
    expect(result.current.showHelp).toBe(false);
  });

  it('openHelp ativa showHelp', () => {
    const { result } = renderHook(() => useHelp());
    act(() => result.current.openHelp());
    expect(result.current.showHelp).toBe(true);
  });

  it('closeHelp desativa showHelp', () => {
    const { result } = renderHook(() => useHelp());
    act(() => result.current.openHelp());
    act(() => result.current.closeHelp());
    expect(result.current.showHelp).toBe(false);
  });
});
