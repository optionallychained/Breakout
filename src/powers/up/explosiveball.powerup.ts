import { Explosive } from '../../component/explosive.component';
import { Power } from '../power';

export const explosiveBall: Power = {
    name: 'Explosive Ball',
    timeout: 5000,
    chance: 20,
    up: true,
    activate: (game) => {
        game.world.filterEntitiesByTag('ball')[0]?.addComponent(new Explosive());
    },
    deactivate: (game) => {
        game.world.filterEntitiesByTag('ball')[0]?.removeComponent('Explosive');
    }
};
