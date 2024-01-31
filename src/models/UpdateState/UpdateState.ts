import { USPlayer } from "../USPlayer";
import { GameContext } from "../contexts/GameContext";
import { USGame } from "./USGame";

export interface UpdateState {

    event: string;
    game:USGame;
    hasGame: boolean;
    match_guid?: string;
    players: object;
}


