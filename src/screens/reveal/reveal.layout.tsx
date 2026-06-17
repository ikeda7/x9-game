import { Button } from '../../components/button/button.tsx';
import { Icon } from '../../components/icon/icon.tsx';
import { PassPhoneView } from '../../components/pass-phone/pass-phone.tsx';
import { useHoldToReveal } from './reveal.hooks.ts';
import type { RevealCardProps, RevealWaitProps } from './reveal.interface.ts';

export function RevealWaitView({
  playerName,
  index,
  total,
  onReveal,
}: RevealWaitProps) {
  const { holding, start, cancel } = useHoldToReveal(onReveal);

  return (
    <PassPhoneView
      index={index}
      total={total}
      label='Passe o celular para'
      playerName={playerName}
      hint='Que ninguém mais veja a tela. Segure o botão para revelar seu papel.'
    >
      <button
        type='button'
        className={`reveal-wait__btn ${holding ? 'reveal-wait__btn--holding' : 'reveal-wait__btn--idle'}`}
        onPointerDown={start}
        onPointerUp={cancel}
        onPointerLeave={cancel}
      >
        <Icon name='fingerprint' size={54} color='var(--neon-purple-soft)' />
        <span className='x9-label reveal-wait__btn-label'>
          {holding ? 'Revelando…' : 'Segure para ver'}
        </span>
      </button>
    </PassPhoneView>
  );
}

export function RevealCardView({
  player,
  word,
  hintMode,
  index,
  total,
  last,
  onNext,
}: RevealCardProps) {
  const isImpostor = player.isImpostor;
  const accent = isImpostor ? 'var(--neon-red)' : 'var(--neon-purple)';
  const accentSoft = isImpostor ? '#FF8095' : 'var(--neon-purple-soft)';
  const glow = isImpostor ? 'var(--glow-red)' : 'var(--glow-purple)';

  const emoji = isImpostor ? '❓' : word.emoji;
  const bigText = isImpostor
    ? hintMode && word.hint
      ? word.hint
      : '???'
    : word.word;
  const overline = isImpostor
    ? hintMode && word.hint
      ? 'Sua dica secreta'
      : null
    : word.category;

  const wordClass = isImpostor
    ? 'reveal-card__word reveal-card__word--impostor'
    : 'reveal-card__word reveal-card__word--civil';

  return (
    <div className='animate-pop-in reveal-card'>
      <div className='x9-label reveal-card__header'>
        {player.name} · {String(index + 1).padStart(2, '0')}/
        {String(total).padStart(2, '0')}
      </div>

      <div
        className='reveal-card__box'
        style={{ border: `1.5px solid ${accent}`, boxShadow: glow }}
      >
        <div
          className={`reveal-card__glow ${isImpostor ? 'reveal-card__glow--impostor' : 'reveal-card__glow--civil'}`}
        />

        <div
          className={`reveal-card__role-chip ${isImpostor ? 'reveal-card__role-chip--impostor' : 'reveal-card__role-chip--civil'}`}
        >
          <Icon
            name={isImpostor ? 'venetian-mask' : 'shield-check'}
            size={16}
            color={accentSoft}
          />
          <span
            className='x9-label reveal-card__role-label'
            style={{ color: accentSoft }}
          >
            {isImpostor ? 'Você é o X9' : 'Você é um Civil'}
          </span>
        </div>

        <div className='reveal-card__word-area'>
          <div className='reveal-card__emoji'>{emoji}</div>
          {overline && (
            <div
              className='x9-label reveal-card__overline'
              style={{ color: accentSoft }}
            >
              {overline}
            </div>
          )}
          <div
            className={`${wordClass}${!overline ? ' reveal-card__word--no-overline' : ''}`}
            style={{ color: isImpostor ? accentSoft : undefined }}
          >
            {bigText}
          </div>
        </div>

        <div
          className='reveal-card__divider'
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          }}
        />

        <p className='x9-body reveal-card__tip'>
          {isImpostor
            ? 'Blefe! Tente descobrir a palavra dos Civis e sobreviva.'
            : 'Fale palavras relacionadas, mas não revele a palavra!'}
        </p>
      </div>

      <div className='reveal-card__actions'>
        <Button
          variant={isImpostor ? 'danger' : 'primary'}
          icon={last ? 'flag' : 'eye-off'}
          onClick={onNext}
        >
          {last ? 'Começar Discussão' : 'Pronto, já vi'}
        </Button>
      </div>
      <p className='x9-small reveal-card__pass-hint'>
        Esconda a tela e passe o celular adiante.
      </p>
    </div>
  );
}
