import type { Player } from '../../common/interfaces/player.interface.ts';
import type { ResultConfig } from './round-result.interface.ts';

export function computeResultConfig(
  eliminated: Player | null,
  noElimReason: 'tie' | 'skip' | null,
  remainingImpostors: number,
): ResultConfig {
  if (eliminated) {
    const wasImpostor = eliminated.isImpostor;
    return {
      accent: wasImpostor ? 'var(--neon-red)' : 'var(--neon-purple)',
      accentSoft: wasImpostor ? '#FF8095' : 'var(--neon-purple-soft)',
      glow: wasImpostor ? 'var(--glow-red)' : 'var(--glow-purple)',
      icon: wasImpostor ? 'venetian-mask' : 'user',
      bannerBg: wasImpostor ? 'rgba(255,42,77,0.08)' : 'rgba(176,38,255,0.08)',
      title: `${eliminated.name} foi eliminado`,
      subtitle: wasImpostor
        ? 'Era o X9, desmascarado.'
        : 'Era um Civil inocente. O X9 continua à solta…',
      banner: wasImpostor
        ? remainingImpostors > 0
          ? `Ainda restam ${remainingImpostors} X9`
          : 'Último X9 caiu'
        : 'O X9 continua à solta',
      buttonVariant: wasImpostor ? 'danger' : 'primary',
    };
  }

  return {
    accent: 'var(--neon-amber)',
    accentSoft: 'var(--neon-amber)',
    glow: '0 0 0 1px rgba(255,197,61,0.4), 0 0 22px -4px rgba(255,197,61,0.5)',
    icon: 'gavel',
    bannerBg: 'rgba(255,197,61,0.08)',
    title: noElimReason === 'tie' ? 'Deu empate' : 'Votação pulada',
    subtitle:
      noElimReason === 'tie'
        ? 'Os votos empataram no topo — ninguém foi eliminado.'
        : 'O grupo decidiu não eliminar ninguém desta vez.',
    banner: 'Ninguém foi eliminado',
    buttonVariant: 'primary',
  };
}
