import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PassPhoneView } from '../pass-phone.tsx';

describe('PassPhoneView', () => {
  it('renderiza counter formatado', () => {
    const { getByText } = render(
      <PassPhoneView
        index={2}
        total={5}
        label='Passe o celular para'
        playerName='Ana'
        hint='Sem espiar!'
      >
        <button type='button'>Ação</button>
      </PassPhoneView>,
    );
    expect(getByText('03 / 05')).toBeTruthy();
  });

  it('renderiza label e nome do jogador', () => {
    const { getByText } = render(
      <PassPhoneView
        index={0}
        total={3}
        label='Entregue para'
        playerName='Bia'
        hint='Dica'
      >
        <span>child</span>
      </PassPhoneView>,
    );
    expect(getByText('Entregue para')).toBeTruthy();
    expect(getByText('Bia')).toBeTruthy();
    expect(getByText('Dica')).toBeTruthy();
  });

  it('renderiza children', () => {
    const { getByText } = render(
      <PassPhoneView index={0} total={1} label='L' playerName='P' hint='H'>
        <span>Slot</span>
      </PassPhoneView>,
    );
    expect(getByText('Slot')).toBeTruthy();
  });
});
