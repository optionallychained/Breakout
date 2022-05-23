import { Explosive } from '../../component/explosive.component';
import { Power } from '../power';

export const explosive: Power = {
    name: 'Explosive Ball',
    timeout: 2500,
    activate: (game) => {
        game.world.filterEntitiesByTag('ball')[0]?.addComponent(new Explosive());
    },
    deactivate: (game) => {
        game.world.filterEntitiesByTag('ball')[0]?.removeComponent('Explosive');
    }
}
