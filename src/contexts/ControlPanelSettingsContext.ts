//ControlPanelSettingsContext.ts
import {Dispatch, SetStateAction, createContext} from "react";
import { ControlPanelContext } from "../models/contexts/ControlPanelContext";
export interface ControlPanelSettingsContextModel {
    controlPanelSettings: ControlPanelContext;
    setControlPanelSettings: Dispatch<SetStateAction<ControlPanelContext>>;
}

export const DEFAULT_CONTROL_PANEL_SETTINGS: ControlPanelContext = {
    blueTeamName: "Blue",
    orangeTeamName: "Orange",
    BlueTeamPhoto: "",
    OrangeTeamPhoto: "",
    blueWins: 0,
    orangeWins: 0,
    NumberOfGames: 5,
    showWinProb: false,
    showSeriesScore: false,
    metricOrImperial: "KPH",
    savedata: false,
    serverPortNumber: 3000,
};

export const ControlPanelSettingsContext = createContext<ControlPanelSettingsContextModel>({
    controlPanelSettings: DEFAULT_CONTROL_PANEL_SETTINGS,
    setControlPanelSettings: () => {},

});