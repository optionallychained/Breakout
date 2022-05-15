import { Collision, Color, Physics, State, Transform, Vec2 } from 'aura-2d';
import { Ball } from '../entity/ball.entity';
import { Brick } from '../entity/brick.entity';
import { Paddle } from '../entity/paddle.entity';
import { Wall } from '../entity/wall.entity';

export const GAME_STATE = new State({
    name: 'game',
    init: (game) => {
        game.world.clearEntities();

        // per-game data
        game.setData('balls', 3);
        game.setData('points', 0);
        game.setData('multiplier', 1);

        // unpack some data
        const worldX = game.world.dimensions.x / 2;
        const worldY = game.world.dimensions.y / 2;
        const wallSize = game.getData<number>('wallSize');
        const brickRows = game.getData<number>('brickRows');
        const brickColumns = game.getData<number>('brickColumns');
        const brickPadding = game.getData<number>('brickPadding');
        const brickMargin = game.getData<number>('brickMargin');

        // calculate brick size and placement information
        const brickWidth = (worldX * 2 - wallSize * 2 - brickMargin * 2 - brickPadding * (brickColumns - 1)) / brickColumns;
        const brickHeight = (worldY - wallSize - brickMargin - brickPadding * (brickRows - 1)) / brickRows;
        const brickLimitLeft = -worldX + wallSize + brickMargin + brickWidth / 2;
        const brickLimitRight = worldX - wallSize - brickMargin;
        const brickLimitBottom = brickHeight / 2;
        const brickLimitTop = worldY - wallSize - brickMargin;

        // set up physics and collision
        game.addSystems(new Physics(), new Collision());

        // create bricks
        const bricks = [];
        for (let x = brickLimitLeft; x <= brickLimitRight; x += brickWidth + brickPadding) {
            for (let y = brickLimitBottom; y <= brickLimitTop; y += brickHeight + brickPadding) {
                bricks.push(new Brick(new Vec2(x, y), new Vec2(brickWidth, brickHeight)));
            }
        }

        // add walls, paddle, ball and bricks to the world
        game.world.addEntities(
            new Wall(new Vec2(-worldX + wallSize / 2, 0), new Vec2(wallSize, game.world.dimensions.y), true),
            new Wall(new Vec2(worldX - wallSize / 2, 0), new Vec2(wallSize, game.world.dimensions.y), true),
            new Wall(new Vec2(0, worldY - wallSize / 2), new Vec2(game.world.dimensions.x, wallSize), false),

            new Paddle(worldY, wallSize),
            new Ball(),

            ...bricks
        );
    },
    end: (game) => {
        game.text.clearEntities();

        // remove just the bricks, paddles and balls
        game.world.removeEntities(
            ...game.world.filterEntitiesByTag('brick'),
            ...game.world.filterEntitiesByTag('ball'),
            ...game.world.filterEntitiesByTag('paddle')
        );
    },
    tick: (game) => {
        game.text.clearEntities();

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
                    new Vec2(-2.5 * 40, -game.world.dimensions.y / 4 + 30),
                    new Vec2(40, 40),
                    Color.white()
                );

                if (game.input.isMouseDown()) {
                    ball.getComponent<Transform>('Transform').velocity.set(300, 300);
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
