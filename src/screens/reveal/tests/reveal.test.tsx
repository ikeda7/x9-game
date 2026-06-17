import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { Player } from '../../../common/interfaces/player.interface.ts';
import type { WordEntry } from '../../../common/interfaces/word-entry.interface.ts';
import RevealScreen from '../reveal.tsx';

vi.mock('../../../game/feedback.ts', () => ({
  haptic: vi.fn(),
}));

const players: Player[] = [
  { id: 0, name: 'Ana', isImpostor: false, alive: true },
  { id: 1, name: 'Bia', isImpostor: true, alive: true },
];

const word: WordEntry = {
  category: 'Animais',
  word: 'Gato',
  emoji: '🐱',
  hint: 'Felino',
};

describe('RevealScreen', () => {
  it('inicialmente mostra tela de espera', () => {
    const { getByText } = render(
      <RevealScreen
        players={players}
        word={word}
        hintMode={false}
        onDone={vi.fn()}
      />,
    );
    expect(getByText('Ana')).toBeTruthy();
    expect(getByText('Segure para ver')).toBeTruthy();
  });
});
