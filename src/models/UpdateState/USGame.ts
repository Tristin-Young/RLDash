import { USBall } from "./USBall";
import { DEFAULT_TEAM, USTeam } from "./USTeam";

export interface USGame {
  arena: string;
  ball: USBall;
  hasTarget: boolean;
  hasWinner: boolean;
  isOT: boolean;
  isReplay: boolean;
  target: string;
  teams: USTeam[];
  time_milliseconds: number;
  time_seconds: number;
  winner: string;
}

//default value for USGame
export const DEFAULT_GAME: USGame = {
  arena: "",
  ball: {
    location: {
      X: 0.0,
      Y: 0.0,
      Z: 92.75,
    },
    speed: 0,
    team: 255,
  },
  hasTarget: false,
  hasWinner: false,
  isOT: false,
  isReplay: false,
  target: "",
  teams: [DEFAULT_TEAM, DEFAULT_TEAM],
  time_milliseconds: 0,
  time_seconds: 0,
  winner: "",
};
