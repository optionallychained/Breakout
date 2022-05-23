import { Ball } from '../../entity/ball.entity';
import { Power } from '../power';

export const multiball: Power = {
    name: 'Multiball',
    timeout: 10000,
    chance: 15,
    activate: (game) => {
        game.world.addEntities(new Ball(true));
    },
    deactivate: (game) => {
        game.world.removeEntities(...game.world.filterEntitiesByTag('ball-multi'));
    }
}
