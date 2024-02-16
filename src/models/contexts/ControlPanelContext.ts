//ControlPanelContext.ts
export interface ControlPanelContext{

    blueTeamName: string;
    orangeTeamName: string;
    BlueTeamPhoto: string;
    OrangeTeamPhoto: string;
    blueWins: number;
    orangeWins: number;
    NumberOfGames: number;
    showWinProb: boolean;
    showSeriesScore: boolean;
    metricOrImperial: string;
    savedata: boolean;
    serverPortNumber: number;

}