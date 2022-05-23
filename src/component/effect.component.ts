import { Component } from 'aura-2d';
import { Power, powerups } from '../powers/power';

export class Effect extends Component {

    public readonly power: Power;

    constructor() {
        super('Effect');

        this.power = powerups[0];

        const r = Math.random() * 100;
        let count = 0;

        for (const powerup of powerups) {
            if (r <= count + powerup.chance) {
                this.power = powerup;
                break;
            }
            count += powerup.chance;
        }
    }
}
