//SaveGameDataContext.ts
import { createContext } from "react";
import { GameDataContext } from "../models/contexts/GameDataContext";

export interface gameDataContextModel {
  gameData: GameDataContext;
  setGameData: (newGameData: GameDataContext) => void;
}

export const DEFAULT_GAME_DATA: GameDataContext = {
  arena: "",
  isOT: false,
  isReplay: false,
  timeRemaining: 300,
  predictedWinner: "Tie",
  predictedWinChance: 50,
  winner: "",
  players: [],
  gameScore: {
    blue: 0,
    orange: 0,
  },
  seriesLength: 5,
  seriesScore: {
    blue: 0,
    orange: 0,
  },
  currentGame: 1,
  ball: {
    location: {
      X: 0,
      Y: 0,
      Z: 0,
    },
    speed: 0,
    team: 0,
  },
};

export const SaveGameDataContext = createContext<gameDataContextModel>({
  gameData: DEFAULT_GAME_DATA,
  setGameData: (newGameData: GameDataContext) => {},
});
