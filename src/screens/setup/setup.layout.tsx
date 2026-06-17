import { emojiForCategory } from '../../common/data/words.ts';
import { VoteMode } from '../../common/enums/vote-mode.enum.ts';
import { Button, ButtonVariant } from '../../components/button/button.tsx';
import { Icon } from '../../components/icon/icon.tsx';
import { NumberedBadge } from '../../components/numbered-badge/numbered-badge.tsx';
import {
  StatusPill,
  StatusPillVariant,
} from '../../components/status-pill/status-pill.tsx';
import { Stepper } from '../../components/stepper/stepper.tsx';
import { Toggle } from '../../components/toggle/toggle.tsx';
import type {
  CategoryPickerProps,
  DurationPickerProps,
  PlayerInputProps,
  PlayerRowProps,
  SetupHeaderProps,
  VoteModePickerProps,
} from './setup.interface.ts';

const DURATIONS = [
  { secs: 60, label: '1 min' },
  { secs: 120, label: '2 min' },
  { secs: 180, label: '3 min' },
];

export function SetupHeader({ onBack }: SetupHeaderProps) {
  return (
    <div className='setup-header'>
      <button type='button' className='setup-header__back' onClick={onBack}>
        <Icon name='chevron-left' size={20} color='var(--text-mid)' />
      </button>
      <div className='x9-h2 setup-header__title'>Quem vai jogar?</div>
    </div>
  );
}

export function PlayerCountPill({
  enough,
  count,
  min,
}: {
  enough: boolean;
  count: number;
  min: number;
}) {
  return (
    <StatusPill
      icon={enough ? 'check-circle-2' : 'users'}
      label={
        enough ? `${count} jogadores prontos` : `Mínimo de ${min} jogadores`
      }
      active={enough}
      variant={enough ? StatusPillVariant.DEFAULT : StatusPillVariant.DANGER}
      activeColor='var(--neon-green)'
      inactiveColor='var(--neon-red)'
    />
  );
}

export function PlayerRow({ player, index, onRemove }: PlayerRowProps) {
  return (
    <div className='animate-fade-in setup-player-row'>
      <NumberedBadge index={index} />
      <span className='setup-player-name'>{player.name}</span>
      <button type='button' className='setup-player-remove' onClick={onRemove}>
        <Icon name='x' size={18} />
      </button>
    </div>
  );
}

export function PlayerInput({ name, onNameChange, onAdd }: PlayerInputProps) {
  return (
    <div className='setup-input-row'>
      <input
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onAdd()}
        placeholder='Nome do jogador'
        maxLength={16}
        className='setup-input'
      />
      <button type='button' className='setup-input-add' onClick={onAdd}>
        <Icon name='plus' size={22} />
      </button>
    </div>
  );
}

export function DurationPicker({ duration, onSelect }: DurationPickerProps) {
  return (
    <div className='setup-row'>
      <div className='setup-row-left'>
        <Icon name='pause' size={18} color='var(--neon-purple-soft)' />
        <span className='setup-row-label'>Tempo de discussão</span>
      </div>
      <div className='setup-chips'>
        {DURATIONS.map((d) => (
          <button
            type='button'
            key={d.secs}
            onClick={() => onSelect(d.secs)}
            className={`setup-chip ${duration === d.secs ? 'setup-chip--on' : 'setup-chip--off'}`}
          >
            {d.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function VoteModePicker({ voteMode, onSelect }: VoteModePickerProps) {
  return (
    <>
      <div className='setup-row'>
        <div className='setup-row-left'>
          <Icon name='gavel' size={18} color='var(--neon-purple-soft)' />
          <span className='setup-row-label'>Votação</span>
        </div>
        <div className='setup-chips'>
          {(
            [
              { v: VoteMode.OPEN, label: 'Aberta' },
              { v: VoteMode.SECRET, label: 'Secreta' },
            ] as const
          ).map((o) => (
            <button
              type='button'
              key={o.v}
              onClick={() => onSelect(o.v)}
              className={`setup-chip ${voteMode === o.v ? 'setup-chip--on' : 'setup-chip--off'}`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
      <div className='x9-small setup-vote-desc'>
        {voteMode === VoteMode.OPEN
          ? 'Aberta: o grupo declara e soma os votos juntos.'
          : 'Secreta: cada um vota escondido passando o celular.'}
      </div>
    </>
  );
}

export function CategoryPicker({
  categories,
  allCategories,
  onToggle,
}: CategoryPickerProps) {
  return (
    <div className='setup-categories'>
      <div className='setup-categories__header'>
        <div className='setup-categories__header-left'>
          <Icon name='flag' size={18} color='var(--neon-purple-soft)' />
          <span className='setup-row-label'>Categorias</span>
        </div>
        <span
          className='x9-label'
          style={{
            color:
              categories.length > 0 ? 'var(--text-low)' : 'var(--neon-red)',
          }}
        >
          {categories.length > 0
            ? `${categories.length}/${allCategories.length}`
            : 'escolha 1'}
        </span>
      </div>
      <div className='setup-categories__chips'>
        {allCategories.map((cat) => {
          const on = categories.includes(cat);
          return (
            <button
              type='button'
              key={cat}
              onClick={() => onToggle(cat)}
              className={`setup-category-chip ${on ? 'setup-category-chip--on' : 'setup-category-chip--off'}`}
            >
              <span>{emojiForCategory(cat)}</span>
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function AdvancedModeToggle({
  hintMode,
  onToggle,
}: {
  hintMode: boolean;
  onToggle: () => void;
}) {
  return (
    <button type='button' className='setup-advanced' onClick={onToggle}>
      <div>
        <div className='setup-advanced__title'>Modo avançado</div>
        <div className='x9-small setup-advanced__desc'>
          O X9 recebe uma palavra parecida no lugar de "???".
        </div>
      </div>
      <Toggle on={hintMode} />
    </button>
  );
}

export function ImpostorStepper({
  impostors,
  cap,
  onChange,
}: {
  impostors: number;
  cap: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className='setup-row'>
      <div className='setup-row-left'>
        <Icon name='venetian-mask' size={18} color='var(--neon-red)' />
        <span className='setup-row-label'>Quantidade de X9s</span>
      </div>
      <Stepper
        value={Math.min(impostors, cap)}
        min={1}
        max={cap}
        onChange={onChange}
      />
    </div>
  );
}

export function SetupFooter({
  canStart,
  onStart,
}: {
  canStart: boolean;
  onStart: () => void;
}) {
  return (
    <div className='setup-footer'>
      <Button
        variant={ButtonVariant.PRIMARY}
        icon='zap'
        disabled={!canStart}
        onClick={onStart}
      >
        Iniciar Jogo
      </Button>
    </div>
  );
}
