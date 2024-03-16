import { USBall } from "../UpdateState/USBall";
import { playerDataContext } from "./PlayerDataContext";

export interface GameDataContext {
  arena: string;
  isOT: boolean;
  isReplay: boolean;
  timeRemaining: number;
  predictedWinner: string;
  predictedWinChance: number;
  winner: string;
  players: playerDataContext[];
  gameScore: {
    blue: number;
    orange: number;
  };
  seriesLength: number;
  seriesScore: {
    blue: number;
    orange: number;
  };
  currentGame: number;
  ball: USBall;
}
