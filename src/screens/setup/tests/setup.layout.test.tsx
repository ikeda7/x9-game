import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { VoteMode } from '../../../common/enums/vote-mode.enum.ts';
import {
  CategoryPicker,
  DurationPicker,
  PlayerCountPill,
  PlayerInput,
  PlayerRow,
  SetupFooter,
  SetupHeader,
  VoteModePicker,
} from '../setup.layout.tsx';

vi.mock('../../../common/data/words.ts', () => ({
  emojiForCategory: (cat: string) => (cat === 'Animais' ? '🐾' : '🎯'),
  CATEGORIES: ['Animais', 'Comida'],
}));

describe('SetupHeader', () => {
  it('click no botão voltar chama onBack', () => {
    const onBack = vi.fn();
    const { container } = render(<SetupHeader onBack={onBack} />);
    fireEvent.click(
      container.querySelector('.setup-header__back') as HTMLElement,
    );
    expect(onBack).toHaveBeenCalledOnce();
  });
});

describe('PlayerCountPill', () => {
  it('enough=true mostra "N jogadores prontos"', () => {
    const { container } = render(
      <PlayerCountPill enough={true} count={4} min={3} />,
    );
    expect(container.textContent).toContain('4 jogadores prontos');
  });

  it('enough=false mostra "Mínimo de N jogadores"', () => {
    const { container } = render(
      <PlayerCountPill enough={false} count={2} min={3} />,
    );
    expect(container.textContent).toContain('Mínimo de 3 jogadores');
  });
});

describe('PlayerRow', () => {
  it('renderiza nome e botão remover', () => {
    const onRemove = vi.fn();
    const { getByText, container } = render(
      <PlayerRow
        player={{ id: 1, name: 'Ana' }}
        index={0}
        onRemove={onRemove}
      />,
    );
    expect(getByText('Ana')).toBeTruthy();
    fireEvent.click(
      container.querySelector('.setup-player-remove') as HTMLElement,
    );
    expect(onRemove).toHaveBeenCalledOnce();
  });
});

describe('PlayerInput', () => {
  it('Enter chama onAdd', () => {
    const onAdd = vi.fn();
    const { container } = render(
      <PlayerInput name='Ana' onNameChange={vi.fn()} onAdd={onAdd} />,
    );
    fireEvent.keyDown(container.querySelector('input') as HTMLElement, {
      key: 'Enter',
    });
    expect(onAdd).toHaveBeenCalledOnce();
  });

  it('onChange propaga valor', () => {
    const onNameChange = vi.fn();
    const { container } = render(
      <PlayerInput name='' onNameChange={onNameChange} onAdd={vi.fn()} />,
    );
    fireEvent.change(container.querySelector('input') as HTMLElement, {
      target: { value: 'Bia' },
    });
    expect(onNameChange).toHaveBeenCalledWith('Bia');
  });
});

describe('DurationPicker', () => {
  it('renderiza 3 opções de duração', () => {
    const { getByText } = render(
      <DurationPicker duration={120} onSelect={vi.fn()} />,
    );
    expect(getByText('1 min')).toBeTruthy();
    expect(getByText('2 min')).toBeTruthy();
    expect(getByText('3 min')).toBeTruthy();
  });

  it('chip selecionado tem classe --on', () => {
    const { getByText } = render(
      <DurationPicker duration={120} onSelect={vi.fn()} />,
    );
    expect(getByText('2 min').className).toContain('setup-chip--on');
    expect(getByText('1 min').className).toContain('setup-chip--off');
  });

  it('click chama onSelect com segundos', () => {
    const onSelect = vi.fn();
    const { getByText } = render(
      <DurationPicker duration={120} onSelect={onSelect} />,
    );
    fireEvent.click(getByText('3 min'));
    expect(onSelect).toHaveBeenCalledWith(180);
  });
});

describe('VoteModePicker', () => {
  it('OPEN mostra descrição de votação aberta', () => {
    const { container } = render(
      <VoteModePicker voteMode={VoteMode.OPEN} onSelect={vi.fn()} />,
    );
    expect(container.textContent).toContain('declara e soma os votos juntos');
  });

  it('SECRET mostra descrição de votação secreta', () => {
    const { container } = render(
      <VoteModePicker voteMode={VoteMode.SECRET} onSelect={vi.fn()} />,
    );
    expect(container.textContent).toContain(
      'vota escondido passando o celular',
    );
  });
});

describe('CategoryPicker', () => {
  it('renderiza todas as categorias', () => {
    const { getByText } = render(
      <CategoryPicker
        categories={['Animais', 'Comida']}
        allCategories={['Animais', 'Comida']}
        onToggle={vi.fn()}
      />,
    );
    expect(getByText('Animais')).toBeTruthy();
    expect(getByText('Comida')).toBeTruthy();
  });

  it('0 categorias mostra "escolha 1"', () => {
    const { container } = render(
      <CategoryPicker
        categories={[]}
        allCategories={['Animais']}
        onToggle={vi.fn()}
      />,
    );
    expect(container.textContent).toContain('escolha 1');
  });

  it('click na categoria chama onToggle', () => {
    const onToggle = vi.fn();
    const { getByText } = render(
      <CategoryPicker
        categories={['Animais']}
        allCategories={['Animais', 'Comida']}
        onToggle={onToggle}
      />,
    );
    fireEvent.click(getByText('Comida'));
    expect(onToggle).toHaveBeenCalledWith('Comida');
  });
});

describe('SetupFooter', () => {
  it('canStart=false desabilita botão', () => {
    const { container } = render(
      <SetupFooter canStart={false} onStart={vi.fn()} />,
    );
    const btn = container.querySelector('button') as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
  });

  it('canStart=true habilita e chama onStart', () => {
    const onStart = vi.fn();
    const { getByText } = render(
      <SetupFooter canStart={true} onStart={onStart} />,
    );
    fireEvent.click(getByText('Iniciar Jogo'));
    expect(onStart).toHaveBeenCalledOnce();
  });
});
