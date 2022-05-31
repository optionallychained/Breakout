import { Invincible } from '../../component/invincible.component';
import { BRICK_TAGS } from '../../entity/bricks/brickInfo';
import { Power } from '../power';

export const INVINCIBLE_BRICKS: Power = {
    name: 'Invincible Bricks',
    timeout: 6000,
    chance: 30,
    up: false,
    activate: (game) => {
        // TODO multi-condition entity filtering would be nice
        game.world.filterEntitiesByTags(...BRICK_TAGS.filter((t) => t !== 'invinciblebrick'))
            .forEach((b) => b.addComponent(new Invincible()));
    },
    deactivate: (game) => {
        game.world.filterEntitiesByTags(...BRICK_TAGS.filter((t) => t !== 'invinciblebrick'))
            .forEach((b) => b.removeComponent('Invincible'));
    }
};
