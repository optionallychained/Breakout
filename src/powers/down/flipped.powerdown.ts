import { Angle } from 'aura-2d';
import { Reverse } from '../../component/reverse.component';
import { Power } from '../power';

// TODO might be nice to animate this?
export const flipped: Power = {
    name: 'Flipped!',
    timeout: 3500,
    chance: 10,
    activate: (game) => {
        game.world.activeCamera.rotate(Angle.toRadians(180));
        game.world.filterEntitiesByTag('paddle')[0]?.addComponent(new Reverse())
    },
    deactivate: (game) => {
        game.world.activeCamera.rotate(Angle.toRadians(180));
        game.world.filterEntitiesByTag('paddle')[0]?.removeComponent('Reverse');
    }
};
