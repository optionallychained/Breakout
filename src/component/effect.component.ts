import { Component } from 'aura-2d';
import { Power, POWER_DOWNS, POWER_UPS } from '../powers/power';

export class Effect extends Component {

    public readonly power: Power;
    public readonly isUp: boolean;

    constructor() {
        super('Effect');

        // majority chance for powerup; otherwise powerdown
        this.isUp = Math.random() <= 0.7;

        const powerlist = this.isUp ? POWER_UPS : POWER_DOWNS
        const r = Math.random() * 100;
        let count = 0;

        this.power = powerlist[0];
        for (const power of powerlist) {
            if (r <= count + power.chance) {
                this.power = power;
                break;
            }
            count += power.chance;
        }
    }
}
