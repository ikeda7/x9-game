import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Logo } from '../logo.tsx';

describe('Logo', () => {
  it('renderiza texto X9', () => {
    const { container } = render(<Logo />);
    expect(container.textContent).toContain('X9');
  });

  it('renderiza tagline quando fornecida', () => {
    const { getByText } = render(<Logo tagline='Jogo do Impostor' />);
    expect(getByText('Jogo do Impostor')).toBeTruthy();
  });

  it('não renderiza tagline quando omitida', () => {
    const { container } = render(<Logo />);
    expect(container.querySelector('.logo__tagline')).toBeNull();
  });
});
