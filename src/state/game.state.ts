import { Collision, Color, Keys, Physics, State, Transform, Vec2 } from 'aura-2d';
import { Ball } from '../entity/ball.entity';
import { brickTags } from '../entity/bricks/bricktags';
import { PowerHandler } from '../system/powerHandler.system';

export const GAME_STATE = new State({
    name: 'game',
    init: (game) => {
        game.addSystems(new Physics(), new Collision(), new PowerHandler());
    },
    end: (game) => {
        game.text.clearEntities();

        game.world.removeEntities(...game.world.filterEntitiesByTags('ball', 'ball-multi', 'coin', 'power', 'explosion', 'bullet'));

        PowerHandler.deactivatePower(game);

        game.removeSystems('Physics', 'Collision', 'PowerHandler');
    },
    tick: (game) => {
        game.text.clearEntities();

        const ball = game.world.filterEntitiesByTag('ball')[0] as Ball;
        const paused = game.getData<boolean>('paused');
        const balls = game.getData<number>('balls');
        const brickCount = game.world.filterEntitiesByTags(...brickTags).length;
        let clickString = '';

        // death condition
        if (balls <= 0) {
            game.switchToState('gameOver');
            return;
        }

        // level end condition
        if (brickCount <= 0) {
            game.setData('level', game.getData<number>('level') + 1);
            game.switchToState('gameSetup');
            return;
        }

        if (ball.isAttached()) {
            clickString = 'click';

            if (game.input.isMouseDown()) {
                ball.toggleAttached();
            }
        }

        if (paused) {
            clickString = 'Click Paddle';

            if (game.input.isMouseDown()) {
                const { position, scale } = game.world.filterEntitiesByTag('paddle')[0]!.getComponent<Transform>('Transform');

                const { x: clickX, y: clickY } = Vec2.mult(
                    Vec2.sub(
                        game.input.mousePos,
                        new Vec2(game.world.dimensions.x / 2, game.world.dimensions.y / 2)
                    ),
                    new Vec2(1, -1)
                );

                if (
                    clickX >= position.x - scale.x / 2
                    &&
                    clickX <= position.x + scale.x / 2
                    &&
                    clickY >= position.y - scale.y / 2
                    &&
                    clickY <= position.y + scale.y / 2
                ) {
                    game.setData('paused', false);
                    game.addSystems(new Physics(), new Collision());
                }
            }
        }
        else if (game.input.isKeyDown(Keys.ESC)) {
            game.setData('paused', true);
            game.removeSystems('Physics', 'Collision');
        }

        // info readouts
        if (clickString) {
            game.text.addString(
                clickString,
                new Vec2(-(clickString.length - 1) / 2 * 50, -game.world.dimensions.y / 4 + 60),
                new Vec2(50, 50),
                Color.white()
            );
        }
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
    }
});
