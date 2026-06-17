import './round-result.css';

import { Screen } from '../../components/screen/screen.tsx';
import { computeResultConfig } from './round-result.hooks.ts';
import type { RoundResultScreenProps } from './round-result.interface.ts';
import { ResultCard } from './round-result.layout.tsx';

export default function RoundResultScreen({
  eliminated,
  noElimReason,
  remainingImpostors,
  onContinue,
}: RoundResultScreenProps) {
  const config = computeResultConfig(
    eliminated,
    noElimReason,
    remainingImpostors,
  );

  return (
    <Screen>
      <div className='round-result'>
        <ResultCard config={config} onContinue={onContinue} />
      </div>
    </Screen>
  );
}
