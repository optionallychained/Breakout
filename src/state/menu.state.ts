import { Color, Keys, State, Vec2 } from 'aura-2d';

export const MENU_STATE = new State({
    name: 'menu',
    init: (game) => {
        const str1 = 'breakout', str2 = 'press space';

        game.text.addString(
            str1,
            new Vec2(-str1.length / 2 * 50, game.world.dimensions.y / 4),
            new Vec2(50, 50),
            Color.white()
        );

        game.text.addString(
            str2,
            new Vec2(-str2.length / 2 * 50, -game.world.dimensions.y / 4),
            new Vec2(50, 50),
            Color.white()
        );
    },
    end: (game) => {
        game.text.clearEntities();
    },
    tick: (game) => {
        if (game.input.isKeyDown(Keys.SPACE)) {
            game.switchToState('game');
        }
    }
});