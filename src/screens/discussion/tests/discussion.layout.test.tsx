import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { Player } from '../../../common/interfaces/player.interface.ts';
import {
  DiscussionFooter,
  PlayerOrderList,
  StarterBadge,
  TimerPanel,
} from '../discussion.layout.tsx';

describe('TimerPanel', () => {
  it('running mostra "Pausar"', () => {
    const { getByText } = render(
      <TimerPanel
        mm='01'
        ss='30'
        done={false}
        warn={false}
        running={true}
        toggle={vi.fn()}
      />,
    );
    expect(getByText('01:30')).toBeTruthy();
    expect(getByText('Pausar')).toBeTruthy();
  });

  it('pausado mostra "Retomar"', () => {
    const { getByText } = render(
      <TimerPanel
        mm='01'
        ss='00'
        done={false}
        warn={false}
        running={false}
        toggle={vi.fn()}
      />,
    );
    expect(getByText('Retomar')).toBeTruthy();
  });

  it('done mostra "Reiniciar"', () => {
    const { getByText } = render(
      <TimerPanel
        mm='00'
        ss='00'
        done={true}
        warn={true}
        running={false}
        toggle={vi.fn()}
      />,
    );
    expect(getByText('Reiniciar')).toBeTruthy();
  });

  it('warn aplica classe de alerta', () => {
    const { container } = render(
      <TimerPanel
        mm='00'
        ss='25'
        done={false}
        warn={true}
        running={true}
        toggle={vi.fn()}
      />,
    );
    expect(container.firstElementChild?.className).toContain(
      'discussion-timer--warn',
    );
  });

  it('toggle é chamado ao clicar', () => {
    const toggle = vi.fn();
    const { getByText } = render(
      <TimerPanel
        mm='01'
        ss='00'
        done={false}
        warn={false}
        running={true}
        toggle={toggle}
      />,
    );
    fireEvent.click(getByText('Pausar'));
    expect(toggle).toHaveBeenCalledOnce();
  });
});

describe('StarterBadge', () => {
  it('renderiza nome do starter', () => {
    const { getByText } = render(<StarterBadge name='Ana' />);
    expect(getByText('Ana')).toBeTruthy();
  });

  it('retorna null sem nome', () => {
    const { container } = render(<StarterBadge name={undefined} />);
    expect(container.innerHTML).toBe('');
  });
});

describe('PlayerOrderList', () => {
  const order: Player[] = [
    { id: 0, name: 'Ana', isImpostor: false, alive: true },
    { id: 1, name: 'Bia', isImpostor: false, alive: true },
  ];
  const eliminated: Player[] = [
    { id: 2, name: 'Carlos', isImpostor: true, alive: false },
  ];

  it('renderiza jogadores na ordem', () => {
    const { getByText } = render(
      <PlayerOrderList order={order} eliminated={[]} />,
    );
    expect(getByText('Ana')).toBeTruthy();
    expect(getByText('Bia')).toBeTruthy();
  });

  it('primeiro jogador tem tag "Começa"', () => {
    const { getByText } = render(
      <PlayerOrderList order={order} eliminated={[]} />,
    );
    expect(getByText('Começa')).toBeTruthy();
  });

  it('renderiza seção de eliminados', () => {
    const { getByText } = render(
      <PlayerOrderList order={order} eliminated={eliminated} />,
    );
    expect(getByText('Fora (1)')).toBeTruthy();
    expect(getByText('Carlos')).toBeTruthy();
  });
});

describe('DiscussionFooter', () => {
  it('click chama onVote', () => {
    const onVote = vi.fn();
    const { getByText } = render(<DiscussionFooter onVote={onVote} />);
    fireEvent.click(getByText('Ir para Votação'));
    expect(onVote).toHaveBeenCalledOnce();
  });
});
