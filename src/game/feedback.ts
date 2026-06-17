/**
 * Feedback tátil e sonoro — sem assets, via Web APIs.
 * Tudo é best-effort: se o navegador não suportar, falha em silêncio.
 */

/** Vibração (no-op em desktop / navegadores sem suporte). */
export function haptic(pattern: number | number[]): void {
  try {
    navigator.vibrate?.(pattern);
  } catch {
    /* ignore */
  }
}

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  try {
    if (!audioCtx) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) return null;
      audioCtx = new Ctor();
    }
    if (audioCtx.state === 'suspended') void audioCtx.resume();
    return audioCtx;
  } catch {
    return null;
  }
}

/** Um bip curto (onda senoidal com envelope), em dado tom e duração. */
export function beep(freq = 880, ms = 160, gain = 0.18): void {
  const ctx = getCtx();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    osc.connect(amp);
    amp.connect(ctx.destination);
    const t = ctx.currentTime;
    amp.gain.setValueAtTime(0.0001, t);
    amp.gain.exponentialRampToValueAtTime(gain, t + 0.012);
    amp.gain.exponentialRampToValueAtTime(0.0001, t + ms / 1000);
    osc.start(t);
    osc.stop(t + ms / 1000 + 0.02);
  } catch {
    /* ignore */
  }
}

/** Sinal de fim de tempo: dois bips descendentes + vibração. */
export function timesUp(): void {
  beep(880, 180);
  window.setTimeout(() => beep(620, 240), 190);
  haptic([180, 90, 180]);
}
