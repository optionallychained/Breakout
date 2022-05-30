import { Transform, Vec2 } from 'aura-2d';
import { Power } from '../power';

export const SMALL_PADDLE: Power = {
    name: 'Small Paddle',
    timeout: 10000,
    chance: 40,
    up: false,
    activate: (game) => {
        game.world.filterEntitiesByTag('paddle')[0]?.getComponent<Transform>('Transform').scaleBy(new Vec2(0.65, 1));
    },
    deactivate: (game) => {
        const transform = game.world.filterEntitiesByTag('paddle')[0]!.getComponent<Transform>('Transform');
        transform.scale.setX(transform.initialScale.x);
    }
};
