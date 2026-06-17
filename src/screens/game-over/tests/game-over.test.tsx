import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Team } from '../../../common/enums/team.enum.ts';
import type { Player } from '../../../common/interfaces/player.interface.ts';
import type { WordEntry } from '../../../common/interfaces/word-entry.interface.ts';
import GameOverScreen from '../game-over.tsx';

const players: Player[] = [
  { id: 0, name: 'Ana', isImpostor: false, alive: true },
  { id: 1, name: 'Igor', isImpostor: true, alive: false },
];

const word: WordEntry = {
  category: 'Animais',
  word: 'Gato',
  emoji: '🐱',
};

describe('GameOverScreen', () => {
  it('renderiza vitória dos civis', () => {
    const { getByText } = render(
      <GameOverScreen
        winner={Team.CIVILIANS}
        players={players}
        word={word}
        onPlayAgain={vi.fn()}
        onNewSetup={vi.fn()}
      />,
    );
    expect(getByText('Vitória dos Civis')).toBeTruthy();
    expect(getByText('Gato')).toBeTruthy();
  });

  it('renderiza vitória dos impostores', () => {
    const { getByText } = render(
      <GameOverScreen
        winner={Team.IMPOSTORS}
        players={players}
        word={word}
        onPlayAgain={vi.fn()}
        onNewSetup={vi.fn()}
      />,
    );
    expect(getByText('O X9 venceu')).toBeTruthy();
  });
});
