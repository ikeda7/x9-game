import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Texture } from '../texture.tsx';

describe('Texture', () => {
  it('renderiza noise sempre', () => {
    const { container } = render(<Texture />);
    expect(container.querySelector('.texture__noise')).not.toBeNull();
  });

  it('renderiza scanlines por padrão', () => {
    const { container } = render(<Texture />);
    expect(container.querySelector('.texture__scanlines')).not.toBeNull();
  });

  it('scanlines=false omite scanlines', () => {
    const { container } = render(<Texture scanlines={false} />);
    expect(container.querySelector('.texture__scanlines')).toBeNull();
  });

  it('vignette=false omite vignette', () => {
    const { container } = render(<Texture vignette={false} />);
    expect(container.querySelector('.texture__vignette')).toBeNull();
  });
});
