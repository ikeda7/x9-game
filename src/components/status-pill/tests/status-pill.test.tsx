import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatusPillVariant } from '../status-pill.interface.ts';
import { StatusPill } from '../status-pill.tsx';

describe('StatusPill', () => {
  it('variant DANGER aplica classe danger', () => {
    const { container } = render(
      <StatusPill
        icon='skull'
        label='Perigo'
        active={true}
        variant={StatusPillVariant.DANGER}
      />,
    );
    expect(container.firstElementChild?.className).toContain(
      'status-pill--danger',
    );
  });

  it('DEFAULT ativo aplica classe active', () => {
    const { container } = render(
      <StatusPill icon='check' label='Pronto' active={true} />,
    );
    expect(container.firstElementChild?.className).toContain(
      'status-pill--active',
    );
  });

  it('DEFAULT inativo aplica classe inactive', () => {
    const { container } = render(
      <StatusPill icon='check' label='Faltam' active={false} />,
    );
    expect(container.firstElementChild?.className).toContain(
      'status-pill--inactive',
    );
  });

  it('renderiza label', () => {
    const { getByText } = render(
      <StatusPill icon='check' label='3 jogadores' active={true} />,
    );
    expect(getByText('3 jogadores')).toBeTruthy();
  });
});
