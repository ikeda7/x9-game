import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NumberedBadge } from '../numbered-badge.tsx';

describe('NumberedBadge', () => {
  it('index=0 exibe "01"', () => {
    const { getByText } = render(<NumberedBadge index={0} />);
    expect(getByText('01')).toBeTruthy();
  });

  it('index=9 exibe "10"', () => {
    const { getByText } = render(<NumberedBadge index={9} />);
    expect(getByText('10')).toBeTruthy();
  });
});
