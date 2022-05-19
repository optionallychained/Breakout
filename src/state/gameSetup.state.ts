import { Color, State, Vec2 } from 'aura-2d';
import { Ball } from '../entity/ball.entity';
import { Brick } from '../entity/brick.entity';
import { Paddle } from '../entity/paddle.entity';
import { Wall } from '../entity/wall.entity';

const bricks: Array<Brick> = [];

export const GAME_SETUP_STATE = new State({
    name: 'gameSetup',
    init: (game) => {
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

        // queue bricks
        for (let y = brickLimitBottom; y <= brickLimitTop; y += brickHeight + brickPadding) {
            const color = Color.random();
            for (let x = brickLimitLeft; x <= brickLimitRight; x += brickWidth + brickPadding) {
                bricks.push(new Brick(new Vec2(x, y), new Vec2(brickWidth, brickHeight), color));
            }
        }
        bricks.reverse();

        // add ball
        game.world.addEntity(new Ball());

        // if game is just starting, populate paddle and walls
        if (game.getData<number>('level') === 1) {
            game.setData('balls', 2);
            game.setData('points', 0);
            game.setData('multiplier', 1);

            // add ball, paddle and walls directly to the game
            game.world.addEntities(
                new Paddle(worldY, wallSize),
                new Wall(new Vec2(-worldX + wallSize / 2, 0), new Vec2(wallSize, game.world.dimensions.y), true),
                new Wall(new Vec2(worldX - wallSize / 2, 0), new Vec2(wallSize, game.world.dimensions.y), true),
                new Wall(new Vec2(0, worldY - wallSize / 2), new Vec2(game.world.dimensions.x, wallSize), false),
            );
        }

        game.text.addString(
            'ready',
            new Vec2(-2.5 * 50, -game.world.dimensions.y / 4 + 30),
            new Vec2(50, 50),
            Color.white()
        );
    },
    end: (game) => {
        game.text.clearEntities();
    },
    tick: (game) => {
        // add bricks in sequence, then switch to game
        const e = bricks.pop();

        if (e) {
            game.world.addEntity(e);
        }
        else {
            (game.world.filterEntitiesByTag('ball')[0] as Ball).toggleAttached();
            game.switchToState('game');
        }
    }
});
