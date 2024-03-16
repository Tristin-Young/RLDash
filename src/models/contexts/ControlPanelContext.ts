//ControlPanelContext.ts
export interface ControlPanelContext {
  blueTeamName: string;
  orangeTeamName: string;
  BlueTeamPhoto: string;
  OrangeTeamPhoto: string;
  useTeamColorsForFlipColors: boolean;
  blueTeamColor: string;
  orangeTeamColor: string;
  blueTeamFlipColor: string;
  orangeTeamFlipColor: string;
  flipUnavailableColor: string;
  blueWins: number;
  orangeWins: number;
  NumberOfGames: number;
  showTeamWins: boolean;
  SeriesScoreWinPercent: string;
  showFlipResets: boolean;
  showPlayerSpeed: boolean;
  metricOrImperial: string;
  savedata: boolean;
  serverPortNumber: number;
  showOverlayBE: boolean;
  winProcessed: boolean;
}
