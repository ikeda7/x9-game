import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ButtonVariant } from '../../../components/button/button.interface.ts';
import type { ResultConfig } from '../round-result.interface.ts';
import { ResultCard } from '../round-result.layout.tsx';

const config: ResultConfig = {
  accent: 'var(--neon-red)',
  accentSoft: '#FF8095',
  glow: 'var(--glow-red)',
  icon: 'venetian-mask',
  title: 'Igor foi eliminado',
  subtitle: 'Era o X9, desmascarado.',
  banner: 'Último X9 caiu',
  bannerBg: 'rgba(255,42,77,0.08)',
  buttonVariant: ButtonVariant.DANGER,
};

describe('ResultCard', () => {
  it('renderiza título e subtítulo', () => {
    const { getByText } = render(
      <ResultCard config={config} onContinue={vi.fn()} />,
    );
    expect(getByText('Igor foi eliminado')).toBeTruthy();
    expect(getByText('Era o X9, desmascarado.')).toBeTruthy();
  });

  it('renderiza texto do banner', () => {
    const { getByText } = render(
      <ResultCard config={config} onContinue={vi.fn()} />,
    );
    expect(getByText('Último X9 caiu')).toBeTruthy();
  });

  it('click no botão chama onContinue', () => {
    const onContinue = vi.fn();
    const { getByText } = render(
      <ResultCard config={config} onContinue={onContinue} />,
    );
    fireEvent.click(getByText('Continuar'));
    expect(onContinue).toHaveBeenCalledOnce();
  });
});
