import { Game } from 'aura-2d';
import { FLIPPED } from './down/flipped.powerdown';
import { INVINCIBLE_BRICKS } from './down/invinciblebricks.powerdown';
import { REVERSE_PADDLE } from './down/reversepaddle.powerdown';
import { SMALL_PADDLE } from './down/smallpaddle.powerdown';
import { BIG_PADDLE } from './up/bigpaddle.powerup';
import { EXPLOSIVE_BALL } from './up/explosiveball.powerup';
import { EXTRA_BALL } from './up/extraball.powerup';
import { LASER } from './up/laser.powerup';
import { MULTI_BALL } from './up/multiball.powerup';
import { POWER_BALL } from './up/powerball.powerup';

export interface Power {
    name: string;
    timeout: number;
    chance: number;
    up: boolean;
    activate: (game: Game) => void;
    deactivate: (game: Game) => void;
}

// powerups, sorted by chance ascending
export const POWER_UPS: Array<Power> = [
    BIG_PADDLE,
    EXPLOSIVE_BALL,
    EXTRA_BALL,
    LASER,
    MULTI_BALL,
    POWER_BALL
].sort((a, b) => a.chance - b.chance);

// powerdowns, sorted by chance ascending
export const POWER_DOWNS: Array<Power> = [
    FLIPPED,
    INVINCIBLE_BRICKS,
    REVERSE_PADDLE,
    SMALL_PADDLE
].sort((a, b) => a.chance - b.chance);
