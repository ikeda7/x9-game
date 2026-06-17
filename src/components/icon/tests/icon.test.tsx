import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Icon } from '../icon.tsx';

describe('Icon', () => {
  it('renderiza ícone válido', () => {
    const { container } = render(<Icon name='play' />);
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('retorna null para ícone inválido', () => {
    const { container } = render(<Icon name={'nope' as unknown as 'play'} />);
    expect(container.innerHTML).toBe('');
  });

  it('aplica cor personalizada', () => {
    const { container } = render(<Icon name='play' color='red' />);
    const span = container.querySelector('span');
    expect(span?.style.color).toBe('red');
  });

  it('usa valores padrão quando props omitidas', () => {
    const { container } = render(<Icon name='check' />);
    const span = container.querySelector('span');
    expect(span?.style.color).toBe('currentcolor');
  });
});
