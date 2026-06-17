import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { Player } from '../../../common/interfaces/player.interface.ts';
import type { WordEntry } from '../../../common/interfaces/word-entry.interface.ts';
import {
  GameOverActions,
  ImpostorList,
  VictoryHeader,
  WordReveal,
} from '../game-over.layout.tsx';

const word: WordEntry = {
  category: 'Animais',
  word: 'Gato',
  emoji: '🐱',
};

const impostors: Player[] = [
  { id: 0, name: 'Igor', isImpostor: true, alive: false },
  { id: 1, name: 'Dan', isImpostor: true, alive: false },
];

describe('VictoryHeader', () => {
  it('civsWon=true mostra "Vitória dos Civis"', () => {
    const { getByText } = render(
      <VictoryHeader
        civsWon={true}
        accent='green'
        accentSoft='lightgreen'
        glow='glow'
      />,
    );
    expect(getByText('Vitória dos Civis')).toBeTruthy();
    expect(getByText('Todos os X9 foram desmascarados.')).toBeTruthy();
  });

  it('civsWon=false mostra "O X9 venceu"', () => {
    const { getByText } = render(
      <VictoryHeader
        civsWon={false}
        accent='red'
        accentSoft='pink'
        glow='glow'
      />,
    );
    expect(getByText('O X9 venceu')).toBeTruthy();
    expect(getByText('O X9 sobreviveu até o fim.')).toBeTruthy();
  });
});

describe('WordReveal', () => {
  it('renderiza palavra, emoji e categoria', () => {
    const { getByText } = render(<WordReveal word={word} />);
    expect(getByText('Gato')).toBeTruthy();
    expect(getByText('🐱')).toBeTruthy();
    expect(getByText('Animais')).toBeTruthy();
  });
});

describe('ImpostorList', () => {
  it('plural para 2+ impostores', () => {
    const { getByText } = render(<ImpostorList impostors={impostors} />);
    expect(getByText('Os X9 eram')).toBeTruthy();
    expect(getByText('Igor')).toBeTruthy();
    expect(getByText('Dan')).toBeTruthy();
  });

  it('singular para 1 impostor', () => {
    const { getByText } = render(<ImpostorList impostors={[impostors[0]]} />);
    expect(getByText('O X9 era')).toBeTruthy();
  });
});

describe('GameOverActions', () => {
  it('renderiza botões e propaga callbacks', () => {
    const onPlayAgain = vi.fn();
    const onNewSetup = vi.fn();
    const { getByText } = render(
      <GameOverActions onPlayAgain={onPlayAgain} onNewSetup={onNewSetup} />,
    );
    fireEvent.click(getByText('Jogar de Novo'));
    expect(onPlayAgain).toHaveBeenCalledOnce();
    fireEvent.click(getByText('Novos Jogadores'));
    expect(onNewSetup).toHaveBeenCalledOnce();
  });
});
