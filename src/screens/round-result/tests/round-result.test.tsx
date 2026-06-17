import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NoElimReason } from '../../../common/enums/no-elim-reason.enum.ts';
import type { Player } from '../../../common/interfaces/player.interface.ts';
import RoundResultScreen from '../round-result.tsx';

const eliminated: Player = {
  id: 0,
  name: 'Igor',
  isImpostor: true,
  alive: false,
};

describe('RoundResultScreen', () => {
  it('renderiza com jogador eliminado', () => {
    const { getByText } = render(
      <RoundResultScreen
        eliminated={eliminated}
        noElimReason={null}
        remainingImpostors={0}
        onContinue={vi.fn()}
      />,
    );
    expect(getByText('Igor foi eliminado')).toBeTruthy();
  });

  it('onContinue propaga', () => {
    const onContinue = vi.fn();
    const { getByText } = render(
      <RoundResultScreen
        eliminated={null}
        noElimReason={NoElimReason.TIE}
        remainingImpostors={1}
        onContinue={onContinue}
      />,
    );
    fireEvent.click(getByText('Continuar'));
    expect(onContinue).toHaveBeenCalledOnce();
  });
});
