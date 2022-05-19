import { Component } from 'aura-2d';
import { Power, powerups } from '../powers/power';

export class Effect extends Component {

    public readonly power: Power;

    constructor() {
        super('Effect');

        this.power = powerups[Math.floor(Math.random() * powerups.length)];
    }
}
