import { UpdateState } from "../models/UpdateState/UpdateState";
import { GameContext } from "../models/contexts/GameContext";

// transformGameUpdate.js
export const transformGameUpdate = (data: UpdateState): GameContext => {
    const gameData = data.game;

    // Transform the received data to match the GameContext structure
    return {
        arena: gameData.arena,
        isOT: gameData.isOT,
        isReplay: gameData.isReplay,
        target: gameData.target,
        timeRemaining: gameData.time_seconds,
        winner: gameData.winner,
        players: Object.values(data.players), // Adjust if necessary
        score: {
            blue: gameData.teams[0].score,
            orange: gameData.teams[1].score,
        }
    };
};
