import { Invincible } from '../../component/invincible.component';
import { brickTags } from '../../entity/bricks/bricktags';
import { Power } from '../power';

export const invincibleBricks: Power = {
    name: 'Invincible Bricks',
    timeout: 6000,
    chance: 30,
    up: false,
    activate: (game) => {
        // TODO horribly inefficient
        // maybe just set a global flag instead?
        game.world.filterEntitiesByTags(...brickTags).forEach((b) => b.addComponent(new Invincible()));
    },
    deactivate: (game) => {
        // TODO horribly inefficient
        // maybe just set a global flag instead?
        game.world.filterEntitiesByTags(...brickTags).forEach((b) => b.removeComponent('Invincible'));
    }
};
