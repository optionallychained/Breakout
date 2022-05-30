import { Ball } from '../../entity/ball.entity';
import { Power } from '../power';

export const MULTI_BALL: Power = {
    name: 'Multiball',
    timeout: 1500,
    chance: 15,
    up: true,
    activate: (game) => {
        game.world.addEntities(new Ball(true), new Ball(true, -1));
    },
    deactivate: () => { }
};
