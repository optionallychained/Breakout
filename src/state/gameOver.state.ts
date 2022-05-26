import { Color, State, Vec2 } from 'aura-2d';
import { brickTags } from '../entity/bricks/brickInfo';

export const GAME_OVER_STATE = new State({
    name: 'gameOver',
    init: (game) => {
        game.setData('level', 1);
    },
    end: (game) => {
        game.text.clearEntities();
        game.world.clearEntities();
    },
    tick: (game) => {
        game.text.clearEntities();

        const bricks = game.world.filterEntitiesByTags(...brickTags);
        if (bricks.length) {
            game.world.removeEntity(bricks[bricks.length - 1]);
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
