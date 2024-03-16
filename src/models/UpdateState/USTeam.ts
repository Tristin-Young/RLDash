export interface USTeam {
  color_primary: string;
  color_secondary: string;
  name: string;
  score: number;
}

//default value for USTeam
export const DEFAULT_TEAM: USTeam = {
  color_primary: "",
  color_secondary: "",
  name: "",
  score: 0,
};
