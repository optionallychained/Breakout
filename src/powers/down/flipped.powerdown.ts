import { Angle } from 'aura-2d';
import { Reverse } from '../../component/reverse.component';
import { Power } from '../power';

export const FLIPPED: Power = {
    name: 'Flipped!',
    timeout: 5000,
    chance: 10,
    up: false,
    activate: (game) => {
        game.world.activeCamera.rotate(Angle.toRadians(180));
        game.world.filterEntitiesByTag('paddle')[0]?.addComponent(new Reverse())
    },
    deactivate: (game) => {
        game.world.activeCamera.rotate(Angle.toRadians(180));
        game.world.filterEntitiesByTag('paddle')[0]?.removeComponent('Reverse');
    }
};
