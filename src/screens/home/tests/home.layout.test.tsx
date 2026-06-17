import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { HomeActions, HowToPlay } from '../home.layout.tsx';

describe('HomeActions', () => {
  it('renderiza botões e propaga callbacks', () => {
    const onNew = vi.fn();
    const onHelp = vi.fn();
    const { getByText } = render(<HomeActions onNew={onNew} onHelp={onHelp} />);
    fireEvent.click(getByText('Nova Partida'));
    expect(onNew).toHaveBeenCalledOnce();
    fireEvent.click(getByText('Como Jogar'));
    expect(onHelp).toHaveBeenCalledOnce();
  });
});

describe('HowToPlay', () => {
  it('renderiza o diálogo com título', () => {
    const { getByText } = render(<HowToPlay onClose={vi.fn()} />);
    expect(getByText('Como Jogar')).toBeTruthy();
  });

  it('click em "Entendi" chama onClose', () => {
    const onClose = vi.fn();
    const { getByText } = render(<HowToPlay onClose={onClose} />);
    fireEvent.click(getByText('Entendi'));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('click no overlay chama onClose', () => {
    const onClose = vi.fn();
    const { container } = render(<HowToPlay onClose={onClose} />);
    const overlay = container.querySelector('.howto-overlay') as HTMLElement;
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalled();
  });

  it('click no diálogo não propaga para overlay', () => {
    const onClose = vi.fn();
    const { container } = render(<HowToPlay onClose={onClose} />);
    const dialog = container.querySelector('.howto-dialog') as HTMLElement;
    fireEvent.click(dialog);
    expect(onClose).not.toHaveBeenCalled();
  });
});
