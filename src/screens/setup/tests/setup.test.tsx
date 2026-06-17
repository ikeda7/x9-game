import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SetupScreen from '../setup.tsx';

vi.mock('../../../game/storage.ts', () => ({
  loadSetup: vi.fn(() => null),
  saveSetup: vi.fn(),
}));

vi.mock('../../../common/data/words.ts', () => ({
  CATEGORIES: ['Animais', 'Comida'],
  emojiForCategory: () => '🎯',
}));

describe('SetupScreen', () => {
  it('renderiza com estado default', () => {
    const { getByText, getByPlaceholderText } = render(
      <SetupScreen onStart={vi.fn()} onBack={vi.fn()} />,
    );
    expect(getByText('Quem vai jogar?')).toBeTruthy();
    expect(getByPlaceholderText('Nome do jogador')).toBeTruthy();
  });

  it('onBack propaga', () => {
    const onBack = vi.fn();
    const { container } = render(
      <SetupScreen onStart={vi.fn()} onBack={onBack} />,
    );
    fireEvent.click(
      container.querySelector('.setup-header__back') as HTMLElement,
    );
    expect(onBack).toHaveBeenCalledOnce();
  });
});
