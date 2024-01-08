import { USPlayer } from "../USPlayer";

export interface GameContext {

    arena: string;
    isOT: boolean;
    isReplay: boolean;
    target: string;
    timeRemaining: number;
    winner: string;
    players: USPlayer[];
    score: {
        blue: number;
        orange: number;
    }
}