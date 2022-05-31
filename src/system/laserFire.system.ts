import { Game, System, Transform, Vec2 } from 'aura-2d';
import { Bullet } from '../entity/bullet.entity';
import { Sounds } from '../sounds';

// TODO last remaining usage of game paused bool would be resolved by enabling system retrieval from game; this also solves problems for
//   PowerHandler
export class LaserFire extends System {

    private time = 0;
    private interval = 200;

    constructor() {
        super('LaserFire');
    }

    public tick(game: Game, frameDelta: number): void {
        if (game.getData<boolean>('paused')) {
            return;
        }

        this.time += frameDelta;

        if (this.time >= this.interval) {
            this.time -= this.interval;

            const transform = game.world.filterEntitiesByTag('paddle')[0]!.getComponent<Transform>('Transform');
            game.world.addEntity(new Bullet(Vec2.add(transform.position, new Vec2(0, transform.scale.y / 2))));
            Sounds.play('shoot');
        }
    }
}
