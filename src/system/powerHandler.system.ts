import { Color, Game, System, Transform, Vec2 } from 'aura-2d';
import { ProgressBar } from '../entity/progressbar.entity';
import { Power } from '../powers/power';

// TODO mix of static + instance works ok for now based on required use and interaction from various game components
//   but might be nice to allow for full instance by enabling system retrieval from game
//     this might carry a number of other benefits for game data management/etc
export class PowerHandler extends System {

    private static activePower: Power | null = null;
    private static progressBar: ProgressBar | null = null;
    private static time = 0;

    public static activatePower(power: Power, game: Game): void {
        PowerHandler.activePower = power;
        power.activate(game);

        PowerHandler.progressBar = new ProgressBar(new Vec2(0, -game.world.dimensions.y / 4 - 70), power.name.length * 50);
        game.world.addEntity(PowerHandler.progressBar);
    }

    public static deactivatePower(game: Game): void {
        PowerHandler.activePower?.deactivate(game);
        game.world.removeEntity(PowerHandler.progressBar!);

        PowerHandler.activePower = null;
        PowerHandler.progressBar = null;
        PowerHandler.time = 0;
    }

    public static isPowerActive(): boolean {
        return !!PowerHandler.activePower;
    }

    constructor() {
        super('PowerHandler');
    }

    public tick(game: Game, frameDelta: number): void {
        if (PowerHandler.activePower && PowerHandler.progressBar) {
            game.text.addString(
                PowerHandler.activePower.name,
                new Vec2(-(PowerHandler.activePower.name.length - 1) / 2 * 50, -game.world.dimensions.y / 4 - 20),
                new Vec2(50, 50),
                PowerHandler.activePower.up ? Color.yellow() : Color.red()
            );

            if (!game.getData<boolean>('paused')) {
                PowerHandler.time += frameDelta;

                // scale progressbar appropriately with time
                const transform = PowerHandler.progressBar.getComponent<Transform>('Transform');
                transform.scaleTo(new Vec2(
                    (PowerHandler.activePower.timeout - PowerHandler.time) / PowerHandler.activePower.timeout * transform.initialScale.x,
                    transform.initialScale.y
                ));

                if (PowerHandler.time >= PowerHandler.activePower.timeout) {
                    PowerHandler.deactivatePower(game);
                }
            }
        }
    }
}
