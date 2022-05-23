import { Game } from 'aura-2d';
import { bigPaddle } from './up/bigpaddle.powerup';
import { explosive } from './up/explosive.powerup';
import { extraball } from './up/extraball.powerup';
import { multiball } from './up/multiball.powerup';
import { powerBall } from './up/powerball.powerup';

export interface Power {
    name: string,
    timeout: number,
    chance: number,
    activate: (game: Game) => void,
    deactivate: (game: Game) => void
}

// powerups, sorted by chance ascending
export const powerups: Array<Power> = [
    powerBall,
    bigPaddle,
    explosive,
    multiball,
    extraball
].sort((a, b) => a.chance - b.chance);

export const powerdowns: Array<Power> = [];
