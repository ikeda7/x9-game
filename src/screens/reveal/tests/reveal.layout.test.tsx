import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { Player } from '../../../common/interfaces/player.interface.ts';
import type { WordEntry } from '../../../common/interfaces/word-entry.interface.ts';
import { RevealCardView, RevealWaitView } from '../reveal.layout.tsx';

vi.mock('../reveal.hooks.ts', () => ({
  useHoldToReveal: () => ({
    holding: false,
    start: vi.fn(),
    cancel: vi.fn(),
  }),
}));

const word: WordEntry = {
  category: 'Animais',
  word: 'Gato',
  emoji: '🐱',
  hint: 'Felino',
};

const civil: Player = {
  id: 0,
  name: 'Ana',
  isImpostor: false,
  alive: true,
};

const impostor: Player = {
  id: 1,
  name: 'Igor',
  isImpostor: true,
  alive: true,
};

describe('RevealWaitView', () => {
  it('renderiza nome do jogador e texto de espera', () => {
    const { getByText } = render(
      <RevealWaitView
        playerName='Ana'
        index={0}
        total={3}
        onReveal={vi.fn()}
      />,
    );
    expect(getByText('Ana')).toBeTruthy();
    expect(getByText('Segure para ver')).toBeTruthy();
  });
});

describe('RevealCardView', () => {
  it('civil vê a palavra e categoria', () => {
    const { getByText } = render(
      <RevealCardView
        player={civil}
        word={word}
        hintMode={false}
        index={0}
        total={3}
        last={false}
        onNext={vi.fn()}
      />,
    );
    expect(getByText('Gato')).toBeTruthy();
    expect(getByText('Animais')).toBeTruthy();
    expect(getByText('Você é um Civil')).toBeTruthy();
  });

  it('impostor sem hint vê "???"', () => {
    const { getByText } = render(
      <RevealCardView
        player={impostor}
        word={word}
        hintMode={false}
        index={0}
        total={3}
        last={false}
        onNext={vi.fn()}
      />,
    );
    expect(getByText('???')).toBeTruthy();
    expect(getByText('Você é o X9')).toBeTruthy();
  });

  it('impostor com hintMode vê a dica', () => {
    const { getByText } = render(
      <RevealCardView
        player={impostor}
        word={word}
        hintMode={true}
        index={0}
        total={3}
        last={false}
        onNext={vi.fn()}
      />,
    );
    expect(getByText('Felino')).toBeTruthy();
    expect(getByText('Sua dica secreta')).toBeTruthy();
  });

  it('impostor com hintMode mas sem hint vê "???"', () => {
    const wordNoHint: WordEntry = { ...word, hint: undefined };
    const { getByText } = render(
      <RevealCardView
        player={impostor}
        word={wordNoHint}
        hintMode={true}
        index={0}
        total={3}
        last={false}
        onNext={vi.fn()}
      />,
    );
    expect(getByText('???')).toBeTruthy();
  });

  it('last mostra "Começar Discussão"', () => {
    const { getByText } = render(
      <RevealCardView
        player={civil}
        word={word}
        hintMode={false}
        index={2}
        total={3}
        last={true}
        onNext={vi.fn()}
      />,
    );
    expect(getByText('Começar Discussão')).toBeTruthy();
  });

  it('!last mostra "Pronto, já vi"', () => {
    const { getByText } = render(
      <RevealCardView
        player={civil}
        word={word}
        hintMode={false}
        index={0}
        total={3}
        last={false}
        onNext={vi.fn()}
      />,
    );
    expect(getByText('Pronto, já vi')).toBeTruthy();
  });
});
