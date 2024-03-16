export interface playerDataContext {
  name: string;
  team: number;
  numWheelsOnGround: number;
  timeOffGround: number;
  isDodging: boolean;
  isOnGround: boolean;
  isOnWall: boolean;
  location: {
    X: number;
    Y: number;
    Z: number;
    pitch: number;
    roll: number;
    yaw: number;
  };
  speed: number;
  score: number;
  goals: number;
  assists: number;
  saves: number;
  shots: number;
  demos: number;
  touches: number;
  hasFlip: string;
  isDead: boolean;
}
