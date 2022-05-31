import { Collision, Color, Keys, Physics, State, Vec2 } from 'aura-2d';
import { Ball } from '../entity/ball.entity';
import { BRICK_TAGS } from '../entity/bricks/brickInfo';

export const GAME_STATE = new State({
    name: 'game',
    init: (game) => {
        game.addSystems(new Physics(), new Collision());
    },
    end: (game) => {
        game.text.clearEntities();
        game.removeSystems('Physics', 'Collision');
    },
    tick: (game) => {
        game.text.clearEntities();

        const ball = game.world.filterEntitiesByTag('ball')[0] as Ball;
        const balls = game.getData<number>('balls');
        // TODO multi-condition entity filtering would be nice
        const brickCount = game.world.filterEntitiesByTags(...BRICK_TAGS.filter((t) => t !== 'invinciblebrick')).length;

        // death condition
        if (balls <= 0) {
            game.switchToState('gameOver');
            return;
        }

        // level end condition
        if (brickCount <= 0) {
            let level = game.getData<number>('level');
            const cycleCap = game.getData<number>('levelCycleCap');

            // bonus level between each level cycle
            if (level % cycleCap === 0) {
                game.setData('bonus', true);
            }
            else {
                level++;
            }

            game.setData('level', level);
            game.switchToState('gameSetup');
            return;
        }

        if (game.input.isKeyDown(Keys.ESC)) {
            game.switchToState('paused');
        }

        if (ball.isAttached()) {
            game.text.addString(
                'click',
                new Vec2(-4 / 2 * 50, -game.world.dimensions.y / 4 + 60),
                new Vec2(50, 50),
                Color.white()
            );

            if (game.input.isMouseDown()) {
                ball.detach();
            }
        }

        // info readouts
        game.text.addString(
            `balls: ${balls}`,
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
