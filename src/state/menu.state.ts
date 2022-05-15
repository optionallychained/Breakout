import { Color, Keys, State, Vec2 } from 'aura-2d';

export const MENU_STATE = new State({
    name: 'menu',
    init: (game) => {
        game.text.addString('breakout', new Vec2(-4 * 50, game.canvas!.height / 4), new Vec2(50, 50), Color.white());
        game.text.addString('press space', new Vec2(-5.5 * 50, -game.canvas!.height / 4), new Vec2(50, 50), Color.white());
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
