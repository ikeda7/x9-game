import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './app/App.tsx';

// O X9 não usa Service Worker. Remove qualquer SW/cache antigo registrado nesta
// origem (ex.: outro projeto que rodou na mesma porta do localhost) para que ele
// não sirva um index.html em cache no lugar do nosso.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then((regs) =>
      regs.forEach((r) => {
        r.unregister();
      }),
    )
    .catch(() => {
      /* ignore */
    });
}
if (typeof caches !== 'undefined') {
  caches
    .keys()
    .then((keys) =>
      keys.forEach((k) => {
        caches.delete(k);
      }),
    )
    .catch(() => {
      /* ignore */
    });
}

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element #root not found');
createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
