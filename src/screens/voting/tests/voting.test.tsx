import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { VoteMode } from '../../../common/enums/vote-mode.enum.ts';
import type { Player } from '../../../common/interfaces/player.interface.ts';
import VotingScreen from '../voting.tsx';

vi.mock('../../../game/feedback.ts', () => ({
  haptic: vi.fn(),
}));

const players: Player[] = [
  { id: 0, name: 'Ana', isImpostor: false, alive: true },
  { id: 1, name: 'Bia', isImpostor: true, alive: true },
  { id: 2, name: 'Carlos', isImpostor: false, alive: true },
];

describe('VotingScreen', () => {
  it('modo OPEN renderiza votação aberta', () => {
    const { getByText } = render(
      <VotingScreen
        mode={VoteMode.OPEN}
        players={players}
        onEliminate={vi.fn()}
        onTie={vi.fn()}
        onSkip={vi.fn()}
      />,
    );
    expect(getByText('Quem é o X9?')).toBeTruthy();
    expect(getByText('Apurar Votos')).toBeTruthy();
  });

  it('modo SECRET renderiza passagem de celular', () => {
    const { getByText } = render(
      <VotingScreen
        mode={VoteMode.SECRET}
        players={players}
        onEliminate={vi.fn()}
        onTie={vi.fn()}
        onSkip={vi.fn()}
      />,
    );
    expect(getByText('Votar em segredo')).toBeTruthy();
    expect(getByText('Ana')).toBeTruthy();
  });
});
