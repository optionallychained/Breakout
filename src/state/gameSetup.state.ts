import { Color, State, Vec2 } from 'aura-2d';
import { Ball } from '../entity/ball.entity';
import { Brick } from '../entity/bricks/abstractbrick.entity';
import { GoldBrick } from '../entity/bricks/goldbrick.entity';
import { HardBrick } from '../entity/bricks/hardbrick.entity';
import { InvincibleBrick } from '../entity/bricks/invinciblebrick.entity';
import { SimpleBrick } from '../entity/bricks/simplebrick.entity';
import { Cursor } from '../entity/cursor.entity';
import { Paddle } from '../entity/paddle.entity';
import { Wall } from '../entity/wall.entity';
import { BONUS_LEVELS } from '../levels/bonus';
import { LEVEL_POOL } from '../levels/level';

const bricks: Array<Brick> = [];
const brickColors = [
    Color.blue(),
    Color.cyan(),
    Color.green(),
    Color.magenta(),
    Color.red(),
    Color.yellow(),
    Color.hex('CA00F2'), // purple
    Color.hex('FF5F00'), // orange
];

// placement timer info; level setup time is made to be consistent across levels of differing sizes
let time = 0;
let interval = 0;
const populateTime = 1500;

export const GAME_SETUP_STATE = new State({
    name: 'gameSetup',
    init: (game) => {
        // choose a level
        let levelSet;

        if (game.getData<boolean>('bonus')) {
            levelSet = BONUS_LEVELS;
        }
        else {
            const level = game.getData<number>('level');
            const cycle = game.getData<number>('levelCycle');
            const cycleCap = game.getData<number>('levelCycleCap');

            levelSet = LEVEL_POOL[level - (cycle * cycleCap) - 1];
        }

        const selectedLevel = levelSet[Math.floor(Math.random() * levelSet.length)];

        // unpack some data
        const worldX = game.world.dimensions.x / 2;
        const worldY = game.world.dimensions.y / 2;
        const wallSize = game.getData<number>('wallSize');
        const brickPadding = game.getData<number>('brickPadding');
        const brickMargin = game.getData<number>('brickMargin');
        const brickRows = selectedLevel.length;
        const brickColumns = selectedLevel[0].length;

        // calculate brick size and positional limits
        const brickScale = new Vec2(
            (worldX * 2 - wallSize * 2 - brickMargin * 2 - brickPadding * (brickColumns - 1)) / brickColumns,
            (worldY - wallSize - brickMargin - brickPadding * (brickRows - 1)) / brickRows
        );
        const brickLimitRight = worldX - wallSize - brickMargin - brickScale.x / 2;
        const brickLimitTop = worldY - wallSize - brickMargin - brickScale.y / 2;

        // choose three colors to alternate for the level's rows
        const [colorOne, colorTwo, colorThree] = [...brickColors].sort(() => 0.5 - Math.random()).slice(0, 3);

        // make bricks
        let y = brickLimitTop;
        let rowNumber = 0;
        for (const row of selectedLevel) {
            // cycle the chosen three colors
            const rowColor = rowNumber % 3 === 0 ? colorThree : (rowNumber % 2 === 0 ? colorTwo : colorOne);
            const rowBricks = [];
            let x = brickLimitRight;

            for (const brick of [...row].reverse()) {
                const position = new Vec2(x, y);

                switch (brick) {
                    case 'g':
                        rowBricks.push(new GoldBrick(position, brickScale));
                        break;

                    case 'h':
                        rowBricks.push(new HardBrick(position, brickScale));
                        break;

                    case 'i':
                        rowBricks.push(new InvincibleBrick(position, brickScale));
                        break;

                    case 's':
                        rowBricks.push(new SimpleBrick(position, brickScale, rowColor));
                        break;
                }

                x -= brickScale.x + brickPadding;
            }

            bricks.push(...rowBricks);

            y -= brickScale.y + brickPadding;
            rowNumber++;
        }

        // calculate placement interval
        interval = populateTime / (bricks.length + 1);

        // add ball
        game.world.addEntity(new Ball());

        game.setData('multiplier', game.getData<number>('levelCycle') + 1);

        // if game is just starting, populate paddle and walls
        if (game.getData<number>('level') === 1) {
            game.setData('balls', 2);
            game.setData('points', 0);

            game.world.addEntities(
                new Paddle(worldY, wallSize),
                new Wall(new Vec2(-worldX + wallSize / 2, -wallSize / 2), new Vec2(wallSize, game.world.dimensions.y - wallSize), true),
                new Wall(new Vec2(worldX - wallSize / 2, -wallSize / 2), new Vec2(wallSize, game.world.dimensions.y - wallSize), true),
                new Wall(new Vec2(0, worldY - wallSize / 2), new Vec2(game.world.dimensions.x, wallSize), false),
                new Cursor()
            );
        }
    },
    end: (game) => {
        game.text.clearEntities();

        // reset placement timer info
        time = 0;
        interval = 0;
    },
    tick: (game, frameDelta) => {
        game.text.clearEntities();

        let str;
        if (game.getData<boolean>('bonus')) {
            str = 'bonus';
        }
        else {
            const level = game.getData<number>('level');
            const cycle = game.getData<number>('levelCycle');
            const cap = game.getData<number>('levelCycleCap');

            str = `${cycle + 1} - ${level - (cycle * cap)}`;
        }

        game.text.addString(
            str,
            new Vec2(-(str.length - 1) / 2 * 50, -game.world.dimensions.y / 4 + 60),
            new Vec2(50, 50),
            Color.white()
        );

        // add bricks in sequence in [populateTime] ms, then switch to game
        time += frameDelta;
        if (time >= interval) {
            time -= interval;

            const b = bricks.pop();

            if (b) {
                game.world.addEntity(b);
            }
            else {
                if (game.getData<number>('level') > 1) {
                    (game.world.filterEntitiesByTag('ball')[0] as Ball).toggleAttached();
                }

                game.switchToState('game');
            }
        }
    }
});
