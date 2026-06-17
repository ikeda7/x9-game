import { describe, expect, it } from 'vitest';
import { Team } from '../../common/enums/team.enum.ts';
import type { Player } from '../../common/interfaces/player.interface.ts';
import { checkWinner, createPlayers } from '../logic.ts';

function mockPlayers(
  configs: { isImpostor?: boolean; alive?: boolean }[],
): Player[] {
  return configs.map((c, i) => ({
    id: i,
    name: `Jogador ${i + 1}`,
    isImpostor: c.isImpostor ?? false,
    alive: c.alive ?? true,
  }));
}

describe('createPlayers', () => {
  it('cria a quantidade correta de jogadores', () => {
    const players = createPlayers(['Ana', 'Bia', 'Carlos'], 1);
    expect(players).toHaveLength(3);
  });

  it('atribui nomes corretamente', () => {
    const players = createPlayers(['Ana', 'Bia', 'Carlos'], 1);
    expect(players.map((p) => p.name)).toEqual(['Ana', 'Bia', 'Carlos']);
  });

  it('preenche nome padrão quando vazio', () => {
    const players = createPlayers(['Ana', '', '  '], 0);
    expect(players[1].name).toBe('Jogador 2');
    expect(players[2].name).toBe('Jogador 3');
  });

  it('atribui a quantidade correta de impostores', () => {
    const players = createPlayers(['A', 'B', 'C', 'D', 'E'], 2);
    const impostors = players.filter((p) => p.isImpostor);
    expect(impostors).toHaveLength(2);
  });

  it('todos começam vivos', () => {
    const players = createPlayers(['A', 'B', 'C'], 1);
    expect(players.every((p) => p.alive)).toBe(true);
  });

  it('distribui impostores aleatoriamente entre rodadas', () => {
    const runs = Array.from({ length: 50 }, () =>
      createPlayers(['A', 'B', 'C', 'D', 'E'], 1),
    );
    const impostorIds = new Set(
      runs
        .map((r) => r.find((p) => p.isImpostor))
        .filter((p): p is Player => p !== undefined)
        .map((p) => p.id),
    );
    expect(impostorIds.size).toBeGreaterThan(1);
  });
});

describe('checkWinner', () => {
  it('retorna null quando o jogo deve continuar', () => {
    const players = mockPlayers([
      { isImpostor: false },
      { isImpostor: false },
      { isImpostor: true },
    ]);
    expect(checkWinner(players)).toBeNull();
  });

  it('civis vencem quando todos impostores são eliminados', () => {
    const players = mockPlayers([
      { isImpostor: false },
      { isImpostor: false },
      { isImpostor: true, alive: false },
    ]);
    expect(checkWinner(players)).toBe(Team.CIVILIANS);
  });

  it('impostores vencem quando têm maioria', () => {
    const players = mockPlayers([
      { isImpostor: true },
      { isImpostor: true },
      { isImpostor: false },
      { isImpostor: false, alive: false },
    ]);
    expect(checkWinner(players)).toBe(Team.IMPOSTORS);
  });

  it('impostores vencem quando há apenas um impostor e um civil vivos', () => {
    const players = mockPlayers([
      { isImpostor: true },
      { isImpostor: false },
      { isImpostor: false, alive: false },
    ]);
    expect(checkWinner(players)).toBe(Team.IMPOSTORS);
  });

  it('ignora jogadores eliminados na contagem', () => {
    const players = mockPlayers([
      { isImpostor: false },
      { isImpostor: false },
      { isImpostor: false },
      { isImpostor: true, alive: false },
      { isImpostor: true, alive: false },
    ]);
    expect(checkWinner(players)).toBe(Team.CIVILIANS);
  });
});
