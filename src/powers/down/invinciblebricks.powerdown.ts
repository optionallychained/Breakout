import { Invincible } from '../../component/invincible.component';
import { brickTags } from '../../entity/bricks/brickInfo';
import { Power } from '../power';

export const invincibleBricks: Power = {
    name: 'Invincible Bricks',
    timeout: 6000,
    chance: 30,
    up: false,
    activate: (game) => {
        // TODO horribly inefficient
        // maybe just set a global flag instead?
        game.world.filterEntitiesByTags(...brickTags)
            // TODO multi-condition entity filtering would be nice
            .filter((b) => b.tag !== 'invincibleBrick')
            .forEach((b) => b.addComponent(new Invincible()));
    },
    deactivate: (game) => {
        // TODO horribly inefficient
        // maybe just set a global flag instead?
        game.world.filterEntitiesByTags(...brickTags)
            .filter((b) => b.tag !== 'invincibleBrick')
            .forEach((b) => b.removeComponent('Invincible'));
    }
};
