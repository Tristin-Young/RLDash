import { createContext } from "react";
import { GameContext } from "../models/contexts/GameContext";

export interface GameInfoContextModel {

    gameInfo: GameContext;
    setGameInfo: (newGameInfo: GameContext) => void;
    
}

export const DEFAULT_GAME_INFO: GameContext = {
    arena: "",
    isOT: false,
    isReplay: false,
    target: "",
    timeRemaining: 300,
    winner: "",
    players: [],
    score: {
        blue: 0,
        orange: 0,
    },
};

export const GameInfoContext = createContext<GameInfoContextModel>({

    gameInfo: DEFAULT_GAME_INFO,
    setGameInfo: (newGameInfo: GameContext) => {},
});