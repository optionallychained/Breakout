import { Game } from 'aura-2d';
import { bigPaddle } from './up/bigpaddle.powerup';
import { powerBall } from './up/powerball.powerup';

export interface Power {
    timeout: number,
    activate: (game: Game) => void,
    deactivate: (game: Game) => void
}

export const powerups: Array<Power> = [
    powerBall,
    bigPaddle
];

export const powerdowns: Array<Power> = [

];
