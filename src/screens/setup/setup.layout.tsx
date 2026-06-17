import { emojiForCategory } from '../../common/data/words.ts';
import { VoteMode } from '../../common/enums/vote-mode.enum.ts';
import { Button } from '../../components/button/button.tsx';
import { Icon } from '../../components/icon/icon.tsx';
import type {
  CategoryPickerProps,
  DurationPickerProps,
  PlayerCountPillProps,
  PlayerInputProps,
  PlayerRowProps,
  SetupHeaderProps,
  StepperProps,
  ToggleProps,
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

export function PlayerCountPill({ enough, count, min }: PlayerCountPillProps) {
  return (
    <div
      className={`setup-pill ${enough ? 'setup-pill--ok' : 'setup-pill--warn'}`}
    >
      <Icon
        name={enough ? 'check-circle-2' : 'users'}
        size={15}
        color={enough ? 'var(--neon-green)' : 'var(--neon-red)'}
      />
      <span
        className='x9-label setup-pill__label'
        style={{ color: enough ? 'var(--neon-green)' : 'var(--neon-red)' }}
      >
        {enough ? `${count} jogadores prontos` : `Mínimo de ${min} jogadores`}
      </span>
    </div>
  );
}

export function PlayerRow({ name, index, onRemove }: PlayerRowProps) {
  return (
    <div className='animate-fade-in setup-player-row'>
      <span className='setup-player-badge'>
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className='setup-player-name'>{name}</span>
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

export function Stepper({ value, min, max, onChange }: StepperProps) {
  return (
    <div className='setup-stepper'>
      <button
        type='button'
        className={`setup-stepper__btn ${value <= min ? 'setup-stepper__btn--disabled' : 'setup-stepper__btn--enabled'}`}
        onClick={() => value > min && onChange(value - 1)}
      >
        <Icon name='minus' size={16} />
      </button>
      <span className='setup-stepper__value'>{value}</span>
      <button
        type='button'
        className={`setup-stepper__btn ${value >= max ? 'setup-stepper__btn--disabled' : 'setup-stepper__btn--enabled'}`}
        onClick={() => value < max && onChange(value + 1)}
      >
        <Icon name='plus' size={16} />
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
        {voteMode === 'open'
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

export function Toggle({ on }: ToggleProps) {
  return (
    <span
      className={`setup-toggle ${on ? 'setup-toggle--on' : 'setup-toggle--off'}`}
    >
      <span
        className={`setup-toggle__knob ${on ? 'setup-toggle__knob--on' : 'setup-toggle__knob--off'}`}
      />
    </span>
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
        variant='primary'
        icon='zap'
        disabled={!canStart}
        onClick={onStart}
      >
        Iniciar Jogo
      </Button>
    </div>
  );
}
