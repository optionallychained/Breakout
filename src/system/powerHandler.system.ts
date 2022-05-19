import { Game, System } from 'aura-2d';
import { Power } from '../powers/power';

// TODO mix of static + instance works ok for now based on required use and interaction from various game components
//   but might be nice to allow for full instance by enabling system retrieval from game
//     this might carry a number of other benefits for game data management/etc
export class PowerHandler extends System {

    private static activePower: Power | null = null;

    public static activatePower(power: Power, game: Game): void {
        PowerHandler.activePower = power;
        power.activate(game);
    }

    public static deactivatePower(game: Game): void {
        PowerHandler.activePower?.deactivate(game);
        PowerHandler.activePower = null;
    }

    public static isPowerActive(): boolean {
        return !!this.activePower;
    }

    public static activePowerName(): string {
        return this.activePower?.name ?? '';
    }

    private time = 0;

    constructor() {
        super('PowerHandler');
    }

    public tick(game: Game, frameDelta: number): void {
        if (PowerHandler.activePower) {
            this.time += frameDelta;

            if (this.time >= PowerHandler.activePower.timeout) {
                this.time = 0;

                PowerHandler.deactivatePower(game);
            }
        }
    }
}
