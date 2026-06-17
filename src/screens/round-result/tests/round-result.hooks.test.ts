import { describe, expect, it } from 'vitest';
import { NoElimReason } from '../../../common/enums/no-elim-reason.enum.ts';
import type { Player } from '../../../common/interfaces/player.interface.ts';
import { ButtonVariant } from '../../../components/button/button.interface.ts';
import { computeResultConfig } from '../round-result.hooks.ts';

const impostor: Player = {
  id: 0,
  name: 'Igor',
  isImpostor: true,
  alive: false,
};

const civil: Player = {
  id: 1,
  name: 'Ana',
  isImpostor: false,
  alive: false,
};

describe('computeResultConfig', () => {
  describe('impostor eliminado', () => {
    it('com impostores restantes', () => {
      const cfg = computeResultConfig(impostor, null, 1);
      expect(cfg.accent).toBe('var(--neon-red)');
      expect(cfg.icon).toBe('venetian-mask');
      expect(cfg.title).toBe('Igor foi eliminado');
      expect(cfg.subtitle).toBe('Era o X9, desmascarado.');
      expect(cfg.banner).toBe('Ainda restam 1 X9');
      expect(cfg.buttonVariant).toBe(ButtonVariant.DANGER);
    });

    it('era o último impostor', () => {
      const cfg = computeResultConfig(impostor, null, 0);
      expect(cfg.banner).toBe('Último X9 caiu');
    });
  });

  describe('civil eliminado', () => {
    it('retorna configuração roxa', () => {
      const cfg = computeResultConfig(civil, null, 1);
      expect(cfg.accent).toBe('var(--neon-purple)');
      expect(cfg.icon).toBe('user');
      expect(cfg.title).toBe('Ana foi eliminado');
      expect(cfg.subtitle).toContain('Civil inocente');
      expect(cfg.banner).toBe('O X9 continua à solta');
      expect(cfg.buttonVariant).toBe(ButtonVariant.PRIMARY);
    });
  });

  describe('sem eliminação', () => {
    it('empate', () => {
      const cfg = computeResultConfig(null, NoElimReason.TIE, 1);
      expect(cfg.accent).toBe('var(--neon-amber)');
      expect(cfg.icon).toBe('gavel');
      expect(cfg.title).toBe('Deu empate');
      expect(cfg.subtitle).toContain('empataram');
      expect(cfg.banner).toBe('Ninguém foi eliminado');
      expect(cfg.buttonVariant).toBe(ButtonVariant.PRIMARY);
    });

    it('votação pulada', () => {
      const cfg = computeResultConfig(null, NoElimReason.SKIP, 1);
      expect(cfg.title).toBe('Votação pulada');
      expect(cfg.subtitle).toContain('decidiu não eliminar');
    });
  });
});
