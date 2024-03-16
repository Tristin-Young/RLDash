//StatfeedEventContext.ts
import { createContext } from "react";
import { StatfeedEvent } from "../models/StatfeedEvent/StatfeedEvent";

export interface StatfeedEventContextModel {
  statfeedEvent: StatfeedEvent;
  setStatfeedEvent: (newStatfeedEvent: StatfeedEvent) => void;
}

export const DEFAULT_STATFEED_EVENT: StatfeedEvent = {
  event_name: "",
  main_target: {
    id: "",
    name: "",
    team_num: -1,
  },
  secondary_target: {
    id: "",
    name: "",
    team_num: -1,
  },
  type: "",
};

export const StatfeedEventContext = createContext<StatfeedEventContextModel>({
  statfeedEvent: DEFAULT_STATFEED_EVENT,
  setStatfeedEvent: (newStatfeedEvent: StatfeedEvent) => {},
});
