import { afterEach, describe, expect, it } from 'vitest';
import { VoteMode } from '../../common/enums/vote-mode.enum.ts';
import type { GameConfig } from '../../common/interfaces/game-config.ts';
import { loadSetup, saveSetup } from '../storage.ts';

const STORAGE_KEY = 'x9.setup.v1';

const config: GameConfig = {
  names: ['Ana', 'Bia', 'Carlos'],
  impostorCount: 1,
  hintMode: false,
  discussionSeconds: 60,
  categories: [],
  voteMode: VoteMode.OPEN,
};

afterEach(() => {
  localStorage.clear();
});

describe('saveSetup', () => {
  it('salva a config no localStorage', () => {
    saveSetup(config);
    const raw = localStorage.getItem(STORAGE_KEY);
    expect(raw).not.toBeNull();
    expect(JSON.parse(raw as string)).toEqual(config);
  });
});

describe('loadSetup', () => {
  it('retorna null quando não há nada salvo', () => {
    expect(loadSetup()).toBeNull();
  });

  it('retorna a config salva anteriormente', () => {
    saveSetup(config);
    expect(loadSetup()).toEqual(config);
  });

  it('retorna null para JSON inválido', () => {
    localStorage.setItem(STORAGE_KEY, '{broken');
    expect(loadSetup()).toBeNull();
  });

  it('retorna null para valor não-objeto', () => {
    localStorage.setItem(STORAGE_KEY, '"string"');
    expect(loadSetup()).toBeNull();
  });

  it('retorna config parcial se apenas parte dos campos existir', () => {
    const partial = { names: ['Zé'], impostorCount: 2 };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(partial));
    expect(loadSetup()).toEqual(partial);
  });
});
