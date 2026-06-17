import './logo.css';

import type { LogoProps } from './logo.interface.ts';

export type { LogoProps } from './logo.interface.ts';

export function Logo({ size = 72, tagline }: LogoProps) {
  return (
    <div className='logo'>
      <div className='logo__wrapper'>
        <span className='logo__ghost' style={{ fontSize: size }}>
          X9
        </span>
        <span className='logo__text' style={{ fontSize: size }}>
          X9
        </span>
      </div>
      {tagline && <div className='x9-label logo__tagline'>{tagline}</div>}
    </div>
  );
}
