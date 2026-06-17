import './screen.css';

import { Texture } from '../texture/texture.tsx';
import type { ScreenProps } from './screen.interface.ts';

export type { ScreenProps } from './screen.interface.ts';

export function Screen({ children, dark = false, style }: ScreenProps) {
  return (
    <div className={`screen ${dark ? 'screen--dark' : 'screen--light'}`}>
      <Texture vignette={!dark} scanlines={true} />
      <div className='animate-screen-in screen__inner' style={style}>
        {children}
      </div>
    </div>
  );
}
