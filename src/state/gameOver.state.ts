import { Color, State, Vec2 } from 'aura-2d';
import { BRICK_TAGS } from '../entity/bricks/brickInfo';

let time = 0;
let interval = 0;
const destroyTime = 750;

export const GAME_OVER_STATE = new State({
    name: 'gameOver',
    init: (game) => {
        game.setData('level', 1);
        game.setData('levelCycle', 0);

        interval = destroyTime / (game.world.filterEntitiesByTags(...BRICK_TAGS).length + 1);
    },
    end: (game) => {
        game.text.clearEntities();
        game.world.clearEntities();
        time = 0;
        interval = 0;
    },
    tick: (game, frameDelta) => {
        game.text.clearEntities();
        const bricks = game.world.filterEntitiesByTags(...BRICK_TAGS);

        if (bricks.length) {
            time += frameDelta;
            if (time >= interval) {
                time -= interval;

                game.world.removeEntity(bricks[bricks.length - 1]);
            }
        }
        else {
            if (game.input.isMouseDown()) {
                game.switchToState('gameSetup');
                return;
            }

            const str1 = 'game over', str2 = `points: ${game.getData<number>('points')}`, str3 = 'click';

            game.text.addString(
                str1,
                new Vec2(-(str1.length - 1) / 2 * 50, game.world.dimensions.y / 4),
                new Vec2(50, 50),
                Color.white()
            );

            game.text.addString(
                str2,
                new Vec2(-(str2.length - 1) / 2 * 50, 0),
                new Vec2(50, 50),
                Color.white()
            );

            game.text.addString(
                str3,
                new Vec2(-(str3.length - 1) / 2 * 50, -game.world.dimensions.y / 4 + 30),
                new Vec2(50, 50),
                Color.white()
            );
        }
    }
});
