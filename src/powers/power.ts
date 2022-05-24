import { Game } from 'aura-2d';
import { flipped } from './down/flipped.powerdown';
import { invincibleBricks } from './down/invinciblebricks.powerdown';
import { reversePaddle } from './down/reversepaddle.powerdown';
import { smallPaddle } from './down/smallpaddle.powerdown';
import { bigPaddle } from './up/bigpaddle.powerup';
import { explosiveBall } from './up/explosiveball.powerup';
import { extraBall } from './up/extraball.powerup';
import { laser } from './up/laser.powerup';
import { multiBall } from './up/multiball.powerup';
import { powerBall } from './up/powerball.powerup';

export interface Power {
    name: string;
    timeout: number;
    chance: number;
    up: boolean;
    activate: (game: Game) => void;
    deactivate: (game: Game) => void;
}

// powerups, sorted by chance ascending
export const powerups: Array<Power> = [
    bigPaddle,
    explosiveBall,
    extraBall,
    laser,
    multiBall,
    powerBall
].sort((a, b) => a.chance - b.chance);

// powerdowns, sorted by chance ascending
export const powerdowns: Array<Power> = [
    flipped,
    invincibleBricks,
    reversePaddle,
    smallPaddle
].sort((a, b) => a.chance - b.chance);
