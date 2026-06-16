// ============================================================
// X9 — Shell de tela: fundo + textura + coluna centralizada (largura de celular)

import { CSSProperties, ReactNode } from 'react';

import { Texture } from '../texture/texture';

// ============================================================
export function Screen({
  children,
  dark = false,
  style,
}: {
  children: ReactNode;
  dark?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        minHeight: '100dvh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        background: dark
          ? 'radial-gradient(120% 70% at 50% 0%, #0d0a14 0%, #07070b 70%)'
          : 'radial-gradient(130% 80% at 50% -5%, #16101f 0%, #0c0c13 55%)',
      }}
    >
      <Texture vignette={!dark} scanlines />
      <div
        className='animate-screen-in'
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: 440,
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
}
