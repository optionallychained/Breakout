import { Component } from 'aura-2d';
import { Power, powerups } from '../powers/power';

export class Effect extends Component {

    public readonly activate: Power['activate'];
    public readonly deactivate: Power['deactivate'];
    public readonly timeout: Power['timeout'];

    constructor() {
        super('Effect');

        const power = powerups[Math.floor(Math.random() * powerups.length)];

        this.activate = power.activate;
        this.deactivate = power.deactivate;
        this.timeout = power.timeout;
    }
}
