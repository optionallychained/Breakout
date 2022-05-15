import { Collision, Color, Physics, State, Transform, Vec2 } from 'aura-2d';
import { Ball } from '../entity/ball.entity';
import { Paddle } from '../entity/paddle.entity';
import { Wall } from '../entity/wall.entity';

export const GAME_STATE = new State({
    name: 'game',
    init: (game) => {
        game.addSystems(new Physics(), new Collision());

        const wallSize = 20;
        const [worldX, worldY] = [game.world.dimensions.x / 2, game.world.dimensions.y / 2];

        game.world.addEntities(
            new Wall(new Vec2(-worldX + wallSize / 2, 0), new Vec2(wallSize, game.world.dimensions.y), true),
            new Wall(new Vec2(worldX - wallSize / 2, 0), new Vec2(wallSize, game.world.dimensions.y), true),
            new Wall(new Vec2(0, worldY - wallSize / 2), new Vec2(game.world.dimensions.x, wallSize), false),

            new Paddle(new Vec2(0, -worldY + wallSize * 2)),
            new Ball()
        );

        // set some global game data
        game.setData('lives', 3);
        game.setData('points', 0);
        game.setData('wallSize', wallSize);
    },
    end: (game) => {
        game.text.clearEntities();

        const paddle = game.world.filterEntitiesByTag('paddle');
        const ball = game.world.filterEntitiesByTag('ball');

        // remove just the paddle and ball(s) to keep the death screen looking nice
        for (const e of [...paddle, ...ball]) {
            game.world.removeEntity(e);
        }
    },
    tick: (game) => {
        game.text.clearEntities();

        const lives = game.getData<number>('lives');

        if (lives <= 0) {
            // game over
            game.switchToState('gameOver');
            return;
        }

        game.text.addString(
            `lives: ${lives}`,
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

        const ball = game.world.filterEntitiesByTag('ball')[0] as Ball;
        const paddle = game.world.filterEntitiesByTag('paddle')[0];

        // ball attached => mouse click => release ball
        if (ball && paddle && ball.isAttached() && game.input.isMouseDown()) {
            ball.getComponent<Transform>('Transform').velocity.set(300, 300);
            ball.toggleAttached();
        }
    }
});
