import { USPlayer } from "../USPlayer";
import { USGame } from "./USGame";

export interface updateState {
  event: string;
  game: USGame;
  hasGame: boolean;
  match_guid?: string;
  players: Array<USPlayer>;
}
