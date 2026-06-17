import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ButtonSize, ButtonVariant } from '../button.interface.ts';
import { Button } from '../button.tsx';

describe('Button', () => {
  it('renderiza texto filho', () => {
    const { getByText } = render(<Button>Clique</Button>);
    expect(getByText('Clique')).toBeTruthy();
  });

  it('aplica classe de variant', () => {
    const { container } = render(
      <Button variant={ButtonVariant.DANGER}>Ok</Button>,
    );
    const btn = container.querySelector('button');
    expect(btn?.className).toContain('x9-btn--danger');
  });

  it('aplica classe de size', () => {
    const { container } = render(<Button size={ButtonSize.SM}>Ok</Button>);
    const btn = container.querySelector('button');
    expect(btn?.className).toContain('x9-btn--sm');
  });

  it('usa padrões primary e lg', () => {
    const { container } = render(<Button>Ok</Button>);
    const btn = container.querySelector('button');
    expect(btn?.className).toContain('x9-btn--primary');
    expect(btn?.className).toContain('x9-btn--lg');
  });

  it('disabled impede onClick e aplica atributo', () => {
    const onClick = vi.fn();
    const { container } = render(
      <Button disabled onClick={onClick}>
        Ok
      </Button>,
    );
    const btn = container.querySelector('button') as HTMLButtonElement;
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
    expect(btn.disabled).toBe(true);
  });

  it('renderiza ícone quando fornecido', () => {
    const { container } = render(<Button icon='play'>Ok</Button>);
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('press state ativa e desativa classe', () => {
    const { container } = render(<Button>Ok</Button>);
    const btn = container.querySelector('button') as HTMLButtonElement;
    fireEvent.pointerDown(btn);
    expect(btn.className).toContain('x9-btn--pressed');
    fireEvent.pointerUp(btn);
    expect(btn.className).not.toContain('x9-btn--pressed');
  });
});
