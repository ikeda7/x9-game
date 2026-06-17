import './pass-phone.css';

import type { PassPhoneViewProps } from './pass-phone.interface.ts';

export type { PassPhoneViewProps } from './pass-phone.interface.ts';

export function PassPhoneView({
  index,
  total,
  label,
  playerName,
  hint,
  children,
}: PassPhoneViewProps) {
  return (
    <div className='animate-fade-in pass-phone'>
      <div className='x9-mono pass-phone__counter'>
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
      <div className='x9-label pass-phone__label'>{label}</div>
      <div className='pass-phone__name'>{playerName}</div>
      <p className='x9-small pass-phone__hint'>{hint}</p>
      <div className='pass-phone__action'>{children}</div>
    </div>
  );
}
