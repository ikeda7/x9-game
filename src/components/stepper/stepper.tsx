import './stepper.css';

import { Icon } from '../icon/icon.tsx';
import type { StepperProps } from './stepper.interface.ts';

export type { StepperProps } from './stepper.interface.ts';

export function Stepper({ value, min, max, onChange }: StepperProps) {
  const atMin = value <= min;
  const atMax = value >= max;

  return (
    <div className='stepper'>
      <button
        type='button'
        disabled={atMin}
        className={`stepper__btn ${atMin ? 'stepper__btn--disabled' : 'stepper__btn--enabled'}`}
        onClick={() => onChange(value - 1)}
      >
        <Icon name='minus' size={16} />
      </button>
      <span className='stepper__value'>{value}</span>
      <button
        type='button'
        disabled={atMax}
        className={`stepper__btn ${atMax ? 'stepper__btn--disabled' : 'stepper__btn--enabled'}`}
        onClick={() => onChange(value + 1)}
      >
        <Icon name='plus' size={16} />
      </button>
    </div>
  );
}
