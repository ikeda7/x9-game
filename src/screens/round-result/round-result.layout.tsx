import { Button } from '../../components/button/button.tsx';
import { Icon } from '../../components/icon/icon.tsx';
import type { ResultCardProps } from './round-result.interface.ts';

export function ResultCard({ config, onContinue }: ResultCardProps) {
  const {
    accent,
    accentSoft,
    glow,
    icon,
    title,
    subtitle,
    banner,
    bannerBg,
    buttonVariant,
  } = config;

  return (
    <div
      className='animate-pop-in round-result__card'
      style={{ border: `1.5px solid ${accent}`, boxShadow: glow }}
    >
      <div
        className='round-result__icon-circle'
        style={{
          border: `1.5px solid ${accent}`,
          boxShadow: `0 0 26px -6px ${accent}`,
        }}
      >
        <Icon name={icon} size={40} color={accentSoft} />
      </div>

      <div className='round-result__title'>{title}</div>

      <p className='x9-body round-result__subtitle'>{subtitle}</p>

      <div
        className='round-result__banner'
        style={{ border: `1px solid ${accent}`, background: bannerBg }}
      >
        <div
          className='round-result__banner-text'
          style={{ color: accentSoft, textShadow: `0 0 18px ${accent}` }}
        >
          {banner}
        </div>
      </div>

      <div className='round-result__actions'>
        <Button variant={buttonVariant} icon='arrow-right' onClick={onContinue}>
          Continuar
        </Button>
      </div>
    </div>
  );
}
