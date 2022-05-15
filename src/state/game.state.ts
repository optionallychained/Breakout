import { Physics, State, Vec2 } from 'aura-2d';
import { Ball } from '../entity/ball.entity';
import { Paddle } from '../entity/paddle.entity';
import { Bounce } from '../system/bounce.system';

export const GAME_STATE = new State({
    name: 'game',
    init: (game) => {
        game.addSystems(new Physics(), new Bounce());

        game.world.addEntities(new Paddle(new Vec2(0, -game.world.dimensions.y / 2 + 50)), new Ball());
    },
    end: (game) => { },
    tick: (game) => { }
});
