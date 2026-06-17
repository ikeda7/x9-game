import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Phase } from '../../common/enums/phase.enum.ts';
import { Team } from '../../common/enums/team.enum.ts';
import { VoteMode } from '../../common/enums/vote-mode.enum.ts';
import type { GameConfig } from '../../common/interfaces/game-config.ts';
import type { Player } from '../../common/interfaces/player.interface.ts';
import type { GameActions, GameState } from '../App.interface.ts';
import { PhaseRouter } from '../App.layout.tsx';

vi.mock('../../screens/home/home.tsx', () => ({
  default: () => <div data-testid='home' />,
}));
vi.mock('../../screens/setup/setup.tsx', () => ({
  default: () => <div data-testid='setup' />,
}));
vi.mock('../../screens/reveal/reveal.tsx', () => ({
  default: () => <div data-testid='reveal' />,
}));
vi.mock('../../screens/discussion/discussion.tsx', () => ({
  default: () => <div data-testid='discussion' />,
}));
vi.mock('../../screens/voting/voting.tsx', () => ({
  default: () => <div data-testid='voting' />,
}));
vi.mock('../../screens/round-result/round-result.tsx', () => ({
  default: () => <div data-testid='round-result' />,
}));
vi.mock('../../screens/game-over/game-over.tsx', () => ({
  default: () => <div data-testid='game-over' />,
}));

const config: GameConfig = {
  names: ['A', 'B', 'C'],
  impostorCount: 1,
  hintMode: false,
  discussionSeconds: 60,
  categories: ['Animais'],
  voteMode: VoteMode.OPEN,
};

const players: Player[] = [
  { id: 0, name: 'A', isImpostor: false, alive: true },
  { id: 1, name: 'B', isImpostor: true, alive: true },
];

const actions: GameActions = {
  goToSetup: vi.fn(),
  startGame: vi.fn(),
  goToVoting: vi.fn(),
  eliminate: vi.fn(),
  resolveNoElimination: vi.fn(),
  continueAfterResult: vi.fn(),
  playAgain: vi.fn(),
  newSetup: vi.fn(),
  backToHome: vi.fn(),
  goToDiscussion: vi.fn(),
};

function makeState(overrides: Partial<GameState> = {}): GameState {
  return {
    phase: Phase.HOME,
    config: null,
    players: [],
    word: null,
    lastEliminated: null,
    noElimReason: null,
    winner: null,
    starterId: null,
    round: 0,
    ...overrides,
  };
}

describe('PhaseRouter', () => {
  it('HOME renderiza HomeScreen', () => {
    const { container } = render(
      <PhaseRouter state={makeState()} actions={actions} />,
    );
    expect(container.querySelector('[data-testid="home"]')).not.toBeNull();
  });

  it('SETUP renderiza SetupScreen', () => {
    const { container } = render(
      <PhaseRouter
        state={makeState({ phase: Phase.SETUP })}
        actions={actions}
      />,
    );
    expect(container.querySelector('[data-testid="setup"]')).not.toBeNull();
  });

  it('REVEAL sem word/config retorna null', () => {
    const { container } = render(
      <PhaseRouter
        state={makeState({ phase: Phase.REVEAL })}
        actions={actions}
      />,
    );
    expect(container.innerHTML).toBe('');
  });

  it('REVEAL com word+config renderiza RevealScreen', () => {
    const { container } = render(
      <PhaseRouter
        state={makeState({
          phase: Phase.REVEAL,
          config,
          word: { category: 'A', word: 'B', emoji: '🎯' },
          players,
        })}
        actions={actions}
      />,
    );
    expect(container.querySelector('[data-testid="reveal"]')).not.toBeNull();
  });

  it('DISCUSSION sem config retorna null', () => {
    const { container } = render(
      <PhaseRouter
        state={makeState({ phase: Phase.DISCUSSION })}
        actions={actions}
      />,
    );
    expect(container.innerHTML).toBe('');
  });

  it('GAME_OVER sem winner retorna null', () => {
    const { container } = render(
      <PhaseRouter
        state={makeState({ phase: Phase.GAME_OVER })}
        actions={actions}
      />,
    );
    expect(container.innerHTML).toBe('');
  });

  it('GAME_OVER com winner+word renderiza GameOverScreen', () => {
    const { container } = render(
      <PhaseRouter
        state={makeState({
          phase: Phase.GAME_OVER,
          winner: Team.CIVILIANS,
          word: { category: 'A', word: 'B', emoji: '🎯' },
          players,
        })}
        actions={actions}
      />,
    );
    expect(container.querySelector('[data-testid="game-over"]')).not.toBeNull();
  });
});
