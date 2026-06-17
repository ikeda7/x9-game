import { useState } from 'react';

import type { UseHelpResult } from './home.interface.ts';

export function useHelp(): UseHelpResult {
  const [showHelp, setShowHelp] = useState(false);
  return {
    showHelp,
    openHelp: () => setShowHelp(true),
    closeHelp: () => setShowHelp(false),
  };
}
