export interface USPlayer {
  assists: number;
  attacker: string;
  boost: number;
  cartouches: number;
  demos: number;
  goals: number;
  hasCar: boolean;
  id: string;
  isDead: boolean;
  isPowerSliding: boolean;
  isSonic: boolean;
  location: {
    X: number;
    Y: number;
    Z: number;
    pitch: number;
    roll: number;
    yaw: number;
  };
  name: string;
  onGround: boolean;
  onWall: boolean;
  primaryID: number;
  saves: number;
  score: number;
  shortcut: number;
  shots: number;
  speed: number;
  team: number;
  touches: number;
  hasFlip: string;
}

export const DEFAULT_PLAYER: USPlayer = {
  assists: 0,
  attacker: "",
  boost: 0,
  cartouches: 0,
  demos: 0,
  goals: 0,
  hasCar: true,
  id: "",
  isDead: false,
  isPowerSliding: false,
  isSonic: false,
  location: {
    X: 0,
    Y: 0,
    Z: 92.75,
    pitch: 0,
    roll: 0,
    yaw: 0,
  },
  name: "",
  onGround: true,
  onWall: false,
  primaryID: 0,
  saves: 0,
  score: 0,
  shortcut: 0,
  shots: 0,
  speed: 0,
  team: 0,
  touches: 0,
  hasFlip: "true",
};
