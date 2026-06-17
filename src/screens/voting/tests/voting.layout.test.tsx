import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { Player } from '../../../common/interfaces/player.interface.ts';
import {
  OpenPlayerRow,
  SecretBallotView,
  SecretPassView,
  VoteCountPill,
  VotingHeader,
} from '../voting.layout.tsx';

const player: Player = {
  id: 1,
  name: 'Ana',
  isImpostor: false,
  alive: true,
};

const suspects: Player[] = [
  { id: 1, name: 'Ana', isImpostor: false, alive: true },
  { id: 2, name: 'Bia', isImpostor: true, alive: true },
];

describe('VotingHeader', () => {
  it('renderiza título', () => {
    const { getByText } = render(<VotingHeader />);
    expect(getByText('Quem é o X9?')).toBeTruthy();
  });
});

describe('VoteCountPill', () => {
  it('remaining > 0 mostra votos restantes', () => {
    const { container } = render(<VoteCountPill remaining={3} />);
    expect(container.textContent).toContain('3 votos restantes');
  });

  it('remaining = 1 mostra singular', () => {
    const { container } = render(<VoteCountPill remaining={1} />);
    expect(container.textContent).toContain('1 voto restante');
  });

  it('remaining = 0 mostra "Todos votaram"', () => {
    const { container } = render(<VoteCountPill remaining={0} />);
    expect(container.textContent).toContain('Todos votaram');
  });
});

describe('OpenPlayerRow', () => {
  it('com votos aplica classe active', () => {
    const { container } = render(
      <OpenPlayerRow
        player={player}
        voteCount={2}
        canVote={true}
        onInc={vi.fn()}
        onDec={vi.fn()}
      />,
    );
    expect(container.firstElementChild?.className).toContain(
      'voting__player-row--active',
    );
  });

  it('sem votos aplica classe inactive', () => {
    const { container } = render(
      <OpenPlayerRow
        player={player}
        voteCount={0}
        canVote={true}
        onInc={vi.fn()}
        onDec={vi.fn()}
      />,
    );
    expect(container.firstElementChild?.className).toContain(
      'voting__player-row--inactive',
    );
  });

  it('botões chamam callbacks', () => {
    const onInc = vi.fn();
    const onDec = vi.fn();
    const { container } = render(
      <OpenPlayerRow
        player={player}
        voteCount={1}
        canVote={true}
        onInc={onInc}
        onDec={onDec}
      />,
    );
    const stepBtns = container.querySelectorAll('.voting__step-btn');
    fireEvent.click(stepBtns[0]);
    expect(onDec).toHaveBeenCalledOnce();
    fireEvent.click(stepBtns[1]);
    expect(onInc).toHaveBeenCalledOnce();
  });
});

describe('SecretPassView', () => {
  it('renderiza nome do votante e botão', () => {
    const { getByText } = render(
      <SecretPassView
        voterName='Carlos'
        voterIndex={0}
        totalVoters={3}
        onOpen={vi.fn()}
      />,
    );
    expect(getByText('Carlos')).toBeTruthy();
    expect(getByText('Votar em segredo')).toBeTruthy();
  });
});

describe('SecretBallotView', () => {
  it('renderiza suspeitos', () => {
    const { getByText } = render(
      <SecretBallotView
        voterName='Carlos'
        suspects={suspects}
        selected={null}
        isLast={false}
        onSelect={vi.fn()}
        onCommit={vi.fn()}
      />,
    );
    expect(getByText('Ana')).toBeTruthy();
    expect(getByText('Bia')).toBeTruthy();
  });

  it('botão desabilitado quando selected=null', () => {
    const { getByText } = render(
      <SecretBallotView
        voterName='Carlos'
        suspects={suspects}
        selected={null}
        isLast={false}
        onSelect={vi.fn()}
        onCommit={vi.fn()}
      />,
    );
    const btn = getByText('Confirmar e passar').closest(
      'button',
    ) as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
  });

  it('isLast mostra "Votar e apurar"', () => {
    const { getByText } = render(
      <SecretBallotView
        voterName='Carlos'
        suspects={suspects}
        selected={1}
        isLast={true}
        onSelect={vi.fn()}
        onCommit={vi.fn()}
      />,
    );
    expect(getByText('Votar e apurar')).toBeTruthy();
  });

  it('!isLast mostra "Confirmar e passar"', () => {
    const { getByText } = render(
      <SecretBallotView
        voterName='Carlos'
        suspects={suspects}
        selected={1}
        isLast={false}
        onSelect={vi.fn()}
        onCommit={vi.fn()}
      />,
    );
    expect(getByText('Confirmar e passar')).toBeTruthy();
  });

  it('click em suspeito chama onSelect', () => {
    const onSelect = vi.fn();
    const { getByText } = render(
      <SecretBallotView
        voterName='Carlos'
        suspects={suspects}
        selected={null}
        isLast={false}
        onSelect={onSelect}
        onCommit={vi.fn()}
      />,
    );
    fireEvent.click(getByText('Bia'));
    expect(onSelect).toHaveBeenCalledWith(2);
  });
});
