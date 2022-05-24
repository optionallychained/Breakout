import { Ball } from '../../entity/ball.entity';
import { Power } from '../power';

export const multiBall: Power = {
    name: 'Multiball',
    timeout: 10000,
    chance: 15,
    up: true,
    activate: (game) => {
        game.world.addEntities(new Ball(true));
    },
    deactivate: (game) => {
        game.world.removeEntities(...game.world.filterEntitiesByTag('ball-multi'));
    }
};
