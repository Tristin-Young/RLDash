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
    }
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