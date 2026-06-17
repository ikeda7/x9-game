import { afterEach, describe, expect, it, vi } from 'vitest';
import { beep, haptic, timesUp } from '../feedback.ts';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('haptic', () => {
  it('chama navigator.vibrate quando disponível', () => {
    const vibrate = vi.fn();
    vi.stubGlobal('navigator', { vibrate });

    haptic(100);
    expect(vibrate).toHaveBeenCalledWith(100);
  });

  it('aceita padrão de vibração como array', () => {
    const vibrate = vi.fn();
    vi.stubGlobal('navigator', { vibrate });

    haptic([100, 50, 100]);
    expect(vibrate).toHaveBeenCalledWith([100, 50, 100]);
  });

  it('não quebra quando navigator.vibrate não existe', () => {
    vi.stubGlobal('navigator', {});
    expect(() => haptic(100)).not.toThrow();
  });
});

describe('beep', () => {
  it('cria oscilador com frequência e duração padrão', () => {
    const stop = vi.fn();
    const start = vi.fn();
    const setValueAtTime = vi.fn();
    const exponentialRampToValueAtTime = vi.fn();
    const connect = vi.fn();

    const mockOscillator = {
      type: 'sine',
      frequency: { value: 0 },
      connect,
      start,
      stop,
    };
    const mockGain = {
      gain: { setValueAtTime, exponentialRampToValueAtTime },
      connect,
    };

    class MockAudioContext {
      state = 'running';
      currentTime = 0;
      destination = {};
      createOscillator = () => mockOscillator;
      createGain = () => mockGain;
      resume = vi.fn();
    }
    vi.stubGlobal('AudioContext', MockAudioContext);

    beep();
    expect(mockOscillator.frequency.value).toBe(880);
    expect(start).toHaveBeenCalled();
    expect(stop).toHaveBeenCalled();
  });

  it('não quebra quando AudioContext não está disponível', () => {
    vi.stubGlobal('AudioContext', undefined);
    expect(() => beep()).not.toThrow();
  });
});

describe('timesUp', () => {
  it('dispara vibração e agenda segundo bip', () => {
    const vibrate = vi.fn();
    vi.stubGlobal('navigator', { vibrate });
    vi.stubGlobal('AudioContext', undefined);

    timesUp();
    expect(vibrate).toHaveBeenCalledWith([180, 90, 180]);
  });
});
