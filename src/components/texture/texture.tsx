import './texture.css';

import type { TextureProps } from './texture.interface.ts';

export type { TextureProps } from './texture.interface.ts';

export function Texture({ scanlines = true, vignette = true }: TextureProps) {
  return (
    <div aria-hidden={true} className='texture'>
      <div className='texture__noise' />
      {scanlines && <div className='texture__scanlines' />}
      {vignette && <div className='texture__vignette' />}
    </div>
  );
}
