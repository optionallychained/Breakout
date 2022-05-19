import { Transform, Vec2 } from 'aura-2d';
import { Power } from '../power';

export const bigPaddle: Power = {
    timeout: 10000,
    activate: (game) => {
        game.world.filterEntitiesByTag('paddle')[0]?.getComponent<Transform>('Transform').scaleBy(new Vec2(2, 1));
    },
    deactivate: (game) => {
        game.world.filterEntitiesByTag('paddle')[0]?.getComponent<Transform>('Transform').scaleBy(new Vec2(0.5, 1));
    }
}
