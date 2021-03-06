import { Transform, Vec2 } from 'aura-2d';
import { Power } from '../power';

export const BIG_PADDLE: Power = {
    name: 'Big Paddle',
    timeout: 10000,
    chance: 25,
    up: true,
    activate: (game) => {
        game.world.filterEntitiesByTag('paddle')[0]?.getComponent<Transform>('Transform').scaleBy(new Vec2(2, 1));
    },
    deactivate: (game) => {
        game.world.filterEntitiesByTag('paddle')[0]?.getComponent<Transform>('Transform').scaleBy(new Vec2(0.5, 1));
    }
};
