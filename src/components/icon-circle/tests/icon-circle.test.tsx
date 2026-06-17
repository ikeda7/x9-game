import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { IconCircle } from '../icon-circle.tsx';

describe('IconCircle', () => {
  it('renderiza com tamanho e accent corretos', () => {
    const { container } = render(
      <IconCircle
        icon='shield-check'
        accent='var(--neon-green)'
        accentSoft='#9CFFC8'
        size={100}
      />,
    );
    const div = container.querySelector('.icon-circle') as HTMLElement;
    expect(div.style.width).toBe('100px');
    expect(div.style.height).toBe('100px');
  });

  it('renderiza ícone interno', () => {
    const { container } = render(
      <IconCircle icon='venetian-mask' accent='red' accentSoft='pink' />,
    );
    expect(container.querySelector('svg')).not.toBeNull();
  });
});
