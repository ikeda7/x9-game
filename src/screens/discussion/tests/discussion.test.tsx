import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { Player } from '../../../common/interfaces/player.interface.ts';
import DiscussionScreen from '../discussion.tsx';

vi.mock('../../../game/feedback.ts', () => ({
  timesUp: vi.fn(),
}));

const players: Player[] = [
  { id: 0, name: 'Ana', isImpostor: false, alive: true },
  { id: 1, name: 'Bia', isImpostor: true, alive: true },
];

describe('DiscussionScreen', () => {
  it('renderiza timer e ordem de jogadores', () => {
    const { getByText, getAllByText } = render(
      <DiscussionScreen
        players={players}
        starterId={0}
        durationSeconds={120}
        onVote={vi.fn()}
      />,
    );
    expect(getByText('02:00')).toBeTruthy();
    expect(getAllByText('Ana').length).toBeGreaterThan(0);
    expect(getByText('Bia')).toBeTruthy();
  });

  it('botão votação chama onVote', () => {
    const onVote = vi.fn();
    const { getByText } = render(
      <DiscussionScreen
        players={players}
        starterId={0}
        durationSeconds={60}
        onVote={onVote}
      />,
    );
    fireEvent.click(getByText('Ir para Votação'));
    expect(onVote).toHaveBeenCalledOnce();
  });
});
