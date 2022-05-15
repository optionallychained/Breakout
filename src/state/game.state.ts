import { Collision, Color, Physics, State, Transform, Vec2 } from 'aura-2d';
import { Ball } from '../entity/ball.entity';
import { Paddle } from '../entity/paddle.entity';
import { Wall } from '../entity/wall.entity';

export const GAME_STATE = new State({
    name: 'game',
    init: (game) => {
        game.addSystems(new Physics(), new Collision());

        const wallSize = game.getData<number>('wallSize');
        const [worldX, worldY] = [game.world.dimensions.x / 2, game.world.dimensions.y / 2];

        game.world.addEntities(
            new Wall(new Vec2(-worldX + wallSize / 2, 0), new Vec2(wallSize, game.world.dimensions.y), true),
            new Wall(new Vec2(worldX - wallSize / 2, 0), new Vec2(wallSize, game.world.dimensions.y), true),
            new Wall(new Vec2(0, worldY - wallSize / 2), new Vec2(game.world.dimensions.x, wallSize), false),

            new Paddle(new Vec2(0, -worldY + wallSize * 2)),
            new Ball()
        );
    },
    end: (game) => { },
    tick: (game) => {
        game.text.clearEntities();
        game.text.addString(
            `lives: ${game.getData<number>('lives')}`,
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
