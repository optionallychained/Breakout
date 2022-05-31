import { Game, System, Transform, Vec2 } from 'aura-2d';
import { Bullet } from '../entity/bullet.entity';

export class LaserFire extends System {

    private time = 0;
    private interval = 200;

    private paused = false;

    constructor() {
        super('LaserFire');
    }

    public tick(game: Game, frameDelta: number): void {
        if (this.paused) {
            return;
        }

        this.time += frameDelta;

        if (this.time >= this.interval) {
            this.time -= this.interval;

            const transform = game.world.filterEntitiesByTag('paddle')[0].getComponent<Transform>('Transform');
            game.world.addEntity(new Bullet(Vec2.add(transform.position, new Vec2(0, transform.scale.y / 2))));
            game.audio.play('shoot');
        }
    }

    public togglePaused(): void {
        this.paused = !this.paused;
    }
}
