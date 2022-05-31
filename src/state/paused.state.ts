import { Color, State, Transform, Vec2 } from 'aura-2d';
import { Frozen } from '../component/frozen.component';
import { PowerHandler } from '../system/powerHandler.system';

export const PAUSED_STATE = new State({
    name: 'paused',
    init: (game) => {
        game.removeSystems('Physics', 'Collision');
        game.getSystem<PowerHandler>('PowerHandler').togglePaused();
        game.world.filterEntitiesByTag('paddle')[0].addComponent(new Frozen());




        // TODO only remains for use in LaserFire; all other pause-related functionality is possible without
        //   to remove, require system retrieval from game
        game.setData('paused', true);
    },
    end: (game) => {
        game.getSystem<PowerHandler>('PowerHandler').togglePaused();
        game.world.filterEntitiesByTag('paddle')[0].removeComponent('Frozen');



        game.setData('paused', false);
    },
    tick: (game) => {
        game.text.clearEntities();

        if (game.input.isMouseDown()) {
            const { position, scale } = game.world.filterEntitiesByTag('paddle')[0].getComponent<Transform>('Transform');

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
                game.switchToState('game');
            }
        }

        game.text.addString(
            'Click Paddle',
            new Vec2(-11 / 2 * 50, -game.world.dimensions.y / 4 + 60),
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
    }
});
