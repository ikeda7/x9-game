import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Toggle } from '../toggle.tsx';

describe('Toggle', () => {
  it('on=true aplica classe toggle--on', () => {
    const { container } = render(<Toggle on={true} />);
    expect(container.firstElementChild?.className).toContain('toggle--on');
  });

  it('on=false aplica classe toggle--off', () => {
    const { container } = render(<Toggle on={false} />);
    expect(container.firstElementChild?.className).toContain('toggle--off');
  });
});
