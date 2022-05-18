import { Collision, Color, Physics, State, Vec2 } from 'aura-2d';
import { Ball } from '../entity/ball.entity';

// TODO hacky
let showGo: boolean;
let time: number;
const maxTime = 500;

export const GAME_STATE = new State({
    name: 'game',
    init: (game) => {
        // set up physics and collision
        game.addSystems(new Physics(), new Collision());

        showGo = true;
        time = 0;
    },
    end: (game) => {
        game.text.clearEntities();

        // remove just the bricks, paddles and balls
        game.world.removeEntities(
            ...game.world.filterEntitiesByTag('brick'),
            ...game.world.filterEntitiesByTag('ball'),
            ...game.world.filterEntitiesByTag('paddle')
        );

        game.removeSystems('Physics', 'Collision');
    },
    tick: (game, frameDelta) => {
        game.text.clearEntities();

        // TODO hacky
        if (showGo) {
            game.text.addString(
                'go',
                new Vec2(-50, -game.world.dimensions.y / 4 + 30),
                new Vec2(50, 50),
                Color.white()
            );

            time += frameDelta;
            if (time >= maxTime) {
                showGo = false;
            }
        }

        // death condition
        const balls = game.getData<number>('balls');
        if (balls <= 0) {
            // game over
            game.switchToState('gameOver');
            return;
        }

        // win condition
        const brickCount = game.world.filterEntitiesByTag('brick').length;
        if (brickCount <= 0) {
            game.switchToState('win');
            return;
        }

        const ball = game.world.filterEntitiesByTag('ball')[0] as Ball;
        const paddle = game.world.filterEntitiesByTag('paddle')[0];

        if (ball && paddle) {
            if (ball.isAttached()) {
                game.text.addString(
                    'click',
                    new Vec2(-2.5 * 50, -game.world.dimensions.y / 4 + 30),
                    new Vec2(50, 50),
                    Color.white()
                );

                if (game.input.isMouseDown()) {
                    ball.toggleAttached();
                }
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
    }
});
