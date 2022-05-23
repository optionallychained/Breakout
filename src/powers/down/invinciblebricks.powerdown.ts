import { Invincible } from '../../component/invincible.component';
import { Power } from '../power';

export const invincibleBricks: Power = {
    name: 'Invincible Bricks',
    timeout: 7500,
    chance: 30,
    activate: (game) => {
        // TODO horribly inefficient
        // maybe just set a global flag instead?
        game.world.filterEntitiesByTag('brick').forEach((b) => b.addComponent(new Invincible()));
    },
    deactivate: (game) => {
        // TODO horribly inefficient
        // maybe just set a global flag instead?
        game.world.filterEntitiesByTag('brick').forEach((b) => b.removeComponent('Invincible'));
    }
};
