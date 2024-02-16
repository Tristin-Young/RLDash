export interface Player {
    
    team: number;
    name: string;
    numWheelsOnGround: number;
    timeOffGround: number;
    isDodging: boolean;
  }
  
  export interface Team {
    team0: Player[];
    team1: Player[];
  }
  