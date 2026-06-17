import type { RoundOutcomeKind } from '../enums/round-outcome-kind.enum.ts';
import type { Player } from './player.interface.ts';

interface EliminatedOutcome {
  kind: RoundOutcomeKind.ELIMINATED;
  player: Player;
}

interface NoEliminationOutcome {
  kind: RoundOutcomeKind.TIE | RoundOutcomeKind.SKIPPED;
}

export type RoundOutcome = EliminatedOutcome | NoEliminationOutcome;
