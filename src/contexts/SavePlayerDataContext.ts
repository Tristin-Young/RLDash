//SavePlayerDataContext.ts
import { createContext } from "react";
import { playerDataContext } from "../models/contexts/PlayerDataContext";

export interface playerDataContextModel {
  playerData: playerDataContext;
  setPlayerData: (newPlayerData: playerDataContext) => void;
}

export const DEFAULT_PLAYER_DATA: playerDataContext = {
  name: "",
  team: -1,
  numWheelsOnGround: 4,
  timeOffGround: 0,
  isDodging: false,
  isOnGround: true,
  isOnWall: true,
  location: {
    X: 0,
    Y: 0,
    Z: 0,
    pitch: 0,
    roll: 0,
    yaw: 0,
  },
  speed: 0,
  score: 0,
  goals: 0,
  assists: 0,
  saves: 0,
  shots: 0,
  demos: 0,
  touches: 0,
  hasFlip: "true",
  isDead: false,
};

export const SavePlayerDataContext = createContext<playerDataContextModel>({
  playerData: DEFAULT_PLAYER_DATA,
  setPlayerData: (newPlayerData: playerDataContext) => {},
});
