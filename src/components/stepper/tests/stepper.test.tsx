import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Stepper } from '../stepper.tsx';

describe('Stepper', () => {
  it('renderiza o valor', () => {
    const { getByText } = render(
      <Stepper value={3} min={1} max={5} onChange={vi.fn()} />,
    );
    expect(getByText('3')).toBeTruthy();
  });

  it('botão minus desabilitado quando value <= min', () => {
    const { container } = render(
      <Stepper value={1} min={1} max={5} onChange={vi.fn()} />,
    );
    const buttons = container.querySelectorAll('button');
    expect((buttons[0] as HTMLButtonElement).disabled).toBe(true);
  });

  it('botão plus desabilitado quando value >= max', () => {
    const { container } = render(
      <Stepper value={5} min={1} max={5} onChange={vi.fn()} />,
    );
    const buttons = container.querySelectorAll('button');
    expect((buttons[1] as HTMLButtonElement).disabled).toBe(true);
  });

  it('click minus chama onChange(value - 1)', () => {
    const onChange = vi.fn();
    const { container } = render(
      <Stepper value={3} min={1} max={5} onChange={onChange} />,
    );
    fireEvent.click(container.querySelectorAll('button')[0]);
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('click plus chama onChange(value + 1)', () => {
    const onChange = vi.fn();
    const { container } = render(
      <Stepper value={3} min={1} max={5} onChange={onChange} />,
    );
    fireEvent.click(container.querySelectorAll('button')[1]);
    expect(onChange).toHaveBeenCalledWith(4);
  });
});
