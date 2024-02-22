//ControlPanelContext.ts
export interface ControlPanelContext{

    blueTeamName: string;
    orangeTeamName: string;
    BlueTeamPhoto: string;
    OrangeTeamPhoto: string;
    blueTeamColor: string;
    orangeTeamColor: string;
    blueWins: number;
    orangeWins: number;
    NumberOfGames: number;
    SeriesScoreWinPercent: string;
    // showWinProb: boolean;
    // showSeriesScore: boolean;
    showFlipResets: boolean;
    showPlayerSpeed: boolean;
    metricOrImperial: string;
    savedata: boolean;
    serverPortNumber: number;

}