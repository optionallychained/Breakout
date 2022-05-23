import { Game } from 'aura-2d';
import { bigPaddle } from './up/bigpaddle.powerup';
import { explosive } from './up/explosive.powerup';
import { multiball } from './up/multiball.powerup';
import { powerBall } from './up/powerball.powerup';

export interface Power {
    name: string,
    timeout: number,
    activate: (game: Game) => void,
    deactivate: (game: Game) => void
}

export const powerups: Array<Power> = [
    powerBall,
    bigPaddle,
    explosive,
    multiball
];

export const powerdowns: Array<Power> = [];
