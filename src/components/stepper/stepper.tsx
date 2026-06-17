import './stepper.css';

import { Icon } from '../icon/icon.tsx';
import type { StepperProps } from './stepper.interface.ts';

export type { StepperProps } from './stepper.interface.ts';

export function Stepper({ value, min, max, onChange }: StepperProps) {
  return (
    <div className='stepper'>
      <button
        type='button'
        className={`stepper__btn ${value <= min ? 'stepper__btn--disabled' : 'stepper__btn--enabled'}`}
        onClick={() => value > min && onChange(value - 1)}
      >
        <Icon name='minus' size={16} />
      </button>
      <span className='stepper__value'>{value}</span>
      <button
        type='button'
        className={`stepper__btn ${value >= max ? 'stepper__btn--disabled' : 'stepper__btn--enabled'}`}
        onClick={() => value < max && onChange(value + 1)}
      >
        <Icon name='plus' size={16} />
      </button>
    </div>
  );
}
