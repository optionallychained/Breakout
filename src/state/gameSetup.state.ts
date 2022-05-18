import { Color, Entity, State, Vec2 } from 'aura-2d';
import { Ball } from '../entity/ball.entity';
import { Brick } from '../entity/brick.entity';
import { Paddle } from '../entity/paddle.entity';
import { Wall } from '../entity/wall.entity';

const entities: Array<Entity> = [];

export const GAME_SETUP_STATE = new State({
    name: 'gameSetup',
    init: (game) => {
        game.world.clearEntities();

        // per-game data
        game.setData('balls', 1);
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

        // create bricks
        const bricks = [];
        for (let y = brickLimitBottom; y <= brickLimitTop; y += brickHeight + brickPadding) {
            const color = Color.random();
            for (let x = brickLimitLeft; x <= brickLimitRight; x += brickWidth + brickPadding) {
                bricks.push(new Brick(new Vec2(x, y), new Vec2(brickWidth, brickHeight), color));
            }
        }

        // order entities into queue
        entities.push(
            new Ball(),
            new Paddle(worldY, wallSize),
            ...bricks.reverse(),

            new Wall(new Vec2(-worldX + wallSize / 2, 0), new Vec2(wallSize, game.world.dimensions.y), true),
            new Wall(new Vec2(worldX - wallSize / 2, 0), new Vec2(wallSize, game.world.dimensions.y), true),
            new Wall(new Vec2(0, worldY - wallSize / 2), new Vec2(game.world.dimensions.x, wallSize), false),
        );
    },
    end: () => { },
    tick: (game) => {
        const e = entities.pop();

        if (e) {
            game.world.addEntity(e);
        }
        else {
            game.switchToState('game');
        }
    }
});
