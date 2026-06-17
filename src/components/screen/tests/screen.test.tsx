import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Screen } from '../screen.tsx';

describe('Screen', () => {
  it('renderiza children', () => {
    const { getByText } = render(<Screen>Conteúdo</Screen>);
    expect(getByText('Conteúdo')).toBeTruthy();
  });

  it('dark=true aplica classe screen--dark', () => {
    const { container } = render(<Screen dark>Ok</Screen>);
    expect(container.firstElementChild?.className).toContain('screen--dark');
  });

  it('dark=false aplica classe screen--light', () => {
    const { container } = render(<Screen>Ok</Screen>);
    expect(container.firstElementChild?.className).toContain('screen--light');
  });
});
