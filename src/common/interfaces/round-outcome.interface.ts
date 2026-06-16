import type { RoundOutcomeKind } from '../enums/round-outcome-kind.enum.ts';
import type { Player } from './player.interface.ts';

export interface RoundOutcome<K extends RoundOutcomeKind> {
  kind: K;
  player?: K extends RoundOutcomeKind.ELIMINATED ? Player : undefined;
}
