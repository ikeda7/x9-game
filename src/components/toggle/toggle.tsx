import './toggle.css';

import type { ToggleProps } from './toggle.interface.ts';

export type { ToggleProps } from './toggle.interface.ts';

export function Toggle({ on }: ToggleProps) {
  return (
    <span className={`toggle ${on ? 'toggle--on' : 'toggle--off'}`}>
      <span
        className={`toggle__knob ${on ? 'toggle__knob--on' : 'toggle__knob--off'}`}
      />
    </span>
  );
}
