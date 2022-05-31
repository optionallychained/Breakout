import { Collision, Color, Physics, State, Transform, Vec2 } from 'aura-2d';
import { Ball } from '../entity/ball.entity';
import { ProgressBar } from '../entity/progressbar.entity';
import { Wall } from '../entity/wall.entity';
import { POWER_UPS } from '../powers/power';

// level timer info; bonus levels are time-limited
let time = 0;
const levelTime = 10000;
const laser = POWER_UPS.find((p) => p.name === 'Laser');

export const BONUS_LEVEL_STATE = new State({
    name: 'bonusLevel',
    init: (game) => {
        game.addSystems(Physics, Collision);

        game.world.addEntities(
            new ProgressBar(new Vec2(0, -game.world.dimensions.y / 4 - 20), game.world.dimensions.x / 2),
            new Wall(
                new Vec2(0, -game.world.dimensions.y / 2 + game.getData<number>('wallSize')),
                new Vec2(game.world.dimensions.x, 0),
                false,
                true
            ),
            new Ball(true, -0.75),
            new Ball(true, 0.75),
            new Ball(true, -0.5),
            new Ball(true, 0.5),
        );

        laser?.activate(game);
    },
    end: (game) => {
        game.text.clearEntities();

        game.removeSystems('Physics', 'Collision');
        game.world.removeEntities(...game.world.filterEntitiesByTags('wall-temp'));

        laser?.deactivate(game);

        game.setData('level', game.getData<number>('level') + 1)
        game.setData('bonus', false);
        game.setData('levelCycle', game.getData<number>('levelCycle') + 1);

        time = 0;
    },
    tick: (game, frameDelta) => {
        game.text.clearEntities();

        time += frameDelta;

        // scale progress bar appropriately with time
        const transform = game.world.filterEntitiesByTag('progressbar')[0].getComponent<Transform>('Transform');
        transform.scaleTo(new Vec2(
            (levelTime - time) / levelTime * transform.initialScale.x,
            transform.initialScale.y
        ));

        if (time >= levelTime) {
            game.switchToState('gameSetup');
        }

        // info readouts
        game.text.addString(
            'bonus',
            new Vec2(-4 / 2 * 50, -game.world.dimensions.y / 4 + 60),
            new Vec2(50, 50),
            Color.white()
        );
        game.text.addString(
            `balls: ${game.getData<number>('balls')}`,
            new Vec2(-game.world.dimensions.x / 2 + 50, game.world.dimensions.y / 2 - 50),
            new Vec2(20, 20),
            Color.white()
        );
        game.text.addString(
            `points: ${game.getData<number>('points')}`,
            new Vec2(-game.world.dimensions.x / 2 + 50, game.world.dimensions.y / 2 - 80),
            new Vec2(20, 20),
            Color.white()
        );
        game.text.addString(
            'esc: pause',
            new Vec2(game.world.dimensions.x / 2 - 11 * 20, game.world.dimensions.y / 2 - 50),
            new Vec2(20, 20),
            Color.white()
        );
    }
});
