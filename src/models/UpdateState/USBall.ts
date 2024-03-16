export interface USBall {
  location: {
    X: number;
    Y: number;
    Z: number;
  };
  speed: number;
  team: number;
}

//default value for USBall
export const DEFAULT_BALL: USBall = {
  location: {
    X: 0.0,
    Y: 0.0,
    Z: 92.75,
  },
  speed: 0,
  team: 255,
};
