import { RoundOutcomeKind } from '../enums/round-outcome-kind.enum';
import { Player } from './player.interface';

export interface RoundOutcome<K extends RoundOutcomeKind> {
  kind: K;
  player?: K extends RoundOutcomeKind.ELIMINATED ? Player : undefined;
}
