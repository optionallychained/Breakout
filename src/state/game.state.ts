import { Collision, Color, Keys, Physics, State, Vec2 } from 'aura-2d';
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
        let click = false;

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
            click = true;

            if (game.input.isMouseDown()) {
                ball.toggleAttached();
            }
        }

        if (paused) {
            click = true;

            if (game.input.isMouseDown()) {
                game.setData('paused', false);
                game.addSystems(new Physics(), new Collision());
            }
        }
        else if (game.input.isKeyDown(Keys.ESC)) {
            game.setData('paused', true);
            game.removeSystems('Physics', 'Collision');
        }

        // info readouts
        if (click) {
            game.text.addString(
                'click',
                new Vec2(-2 * 50, -game.world.dimensions.y / 4 + 60),
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
