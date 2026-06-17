import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import HomeScreen from '../home.tsx';

describe('HomeScreen', () => {
  it('renderiza tela inicial', () => {
    const { getByText } = render(<HomeScreen onNew={vi.fn()} />);
    expect(getByText('Nova Partida')).toBeTruthy();
  });

  it('abre modal Como Jogar', () => {
    const { getByText, queryByText } = render(<HomeScreen onNew={vi.fn()} />);
    expect(queryByText('Entendi')).toBeNull();
    fireEvent.click(getByText('Como Jogar'));
    expect(getByText('Entendi')).toBeTruthy();
  });

  it('fecha modal Como Jogar', () => {
    const { getByText, queryByText } = render(<HomeScreen onNew={vi.fn()} />);
    fireEvent.click(getByText('Como Jogar'));
    fireEvent.click(getByText('Entendi'));
    expect(queryByText('Entendi')).toBeNull();
  });
});
