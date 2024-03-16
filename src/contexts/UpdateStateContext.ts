import { createContext } from "react";
import { updateState } from "../models/UpdateState/UpdateState";
import { DEFAULT_GAME } from "../models/UpdateState/USGame";
import { DEFAULT_PLAYER } from "../models/USPlayer";

export interface UpdateStateContextModel {
  updateState: updateState;
  setUpdateState: (newUpdateState: updateState) => void;
}

export const DEFAULT_UPDATESTATE: updateState = {
  event: "",
  game: DEFAULT_GAME,
  hasGame: false,
  match_guid: "",
  players: Array(6).fill(DEFAULT_PLAYER),
};

export const UpdateStateContext = createContext<UpdateStateContextModel>({
  updateState: DEFAULT_UPDATESTATE,
  setUpdateState: (newUpdateState: updateState) => {},
});
