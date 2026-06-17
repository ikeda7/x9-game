import { describe, expect, it } from 'vitest';
import { Team } from '../../../common/enums/team.enum.ts';
import type { Player } from '../../../common/interfaces/player.interface.ts';
import { computeGameOverConfig } from '../game-over.hooks.ts';

const players: Player[] = [
  { id: 0, name: 'Ana', isImpostor: false, alive: true },
  { id: 1, name: 'Bia', isImpostor: false, alive: true },
  { id: 2, name: 'Igor', isImpostor: true, alive: false },
  { id: 3, name: 'Dan', isImpostor: true, alive: false },
];

describe('computeGameOverConfig', () => {
  it('civis venceram → tema verde', () => {
    const cfg = computeGameOverConfig(Team.CIVILIANS, players);
    expect(cfg.civsWon).toBe(true);
    expect(cfg.accent).toBe('var(--neon-green)');
    expect(cfg.accentSoft).toBe('#9CFFC8');
    expect(cfg.glow).toBe('var(--glow-green)');
  });

  it('impostores venceram → tema vermelho', () => {
    const cfg = computeGameOverConfig(Team.IMPOSTORS, players);
    expect(cfg.civsWon).toBe(false);
    expect(cfg.accent).toBe('var(--neon-red)');
    expect(cfg.accentSoft).toBe('#FF8095');
    expect(cfg.glow).toBe('var(--glow-red)');
  });

  it('filtra apenas impostores na lista', () => {
    const cfg = computeGameOverConfig(Team.CIVILIANS, players);
    expect(cfg.impostors).toHaveLength(2);
    expect(cfg.impostors.every((p) => p.isImpostor)).toBe(true);
  });

  it('retorna impostor único', () => {
    const singleImpostor = players.filter((p) => p.id !== 3);
    const cfg = computeGameOverConfig(Team.CIVILIANS, singleImpostor);
    expect(cfg.impostors).toHaveLength(1);
    expect(cfg.impostors[0].name).toBe('Igor');
  });
});
