import { Color, Game, System, Transform, Vec2 } from 'aura-2d';
import { ProgressBar } from '../entity/progressbar.entity';
import { Power } from '../powers/power';

export class PowerHandler extends System {

    private time = 0;
    private paused = false;

    private activePower: Power | null = null;

    constructor() {
        super('PowerHandler');
    }

    public tick(game: Game, frameDelta: number): void {
        if (this.activePower && !this.paused) {
            game.text.addString(
                this.activePower.name,
                new Vec2(-(this.activePower.name.length - 1) / 2 * 50, -game.world.dimensions.y / 4 - 20),
                new Vec2(50, 50),
                this.activePower.up ? Color.yellow() : Color.red()
            );

            this.time += frameDelta;

            // scale progressbar appropriately with time
            const transform = game.world.filterEntitiesByTag('progressbar')[0].getComponent<Transform>('Transform');
            transform.scaleTo(new Vec2(
                (this.activePower.timeout - this.time) / this.activePower.timeout * transform.initialScale.x,
                transform.initialScale.y
            ));

            if (this.time >= this.activePower.timeout) {
                this.deactivatePower(game);
            }
        }
    }

    public isPowerActive(): boolean {
        return !!this.activePower;
    }

    public togglePaused(): void {
        this.paused = !this.paused;
    }

    public activatePower(power: Power, game: Game): void {
        this.activePower = power;

        power.activate(game);
        game.world.addEntity(new ProgressBar(new Vec2(0, -game.world.dimensions.y / 4 - 70), power.name.length * 50));
    }

    public deactivatePower(game: Game): void {
        this.activePower?.deactivate(game);
        game.world.removeEntity(game.world.filterEntitiesByTag('progressbar')[0]);

        this.activePower = null;
        this.time = 0;
    }
}
