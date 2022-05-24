import { LaserFire } from '../../system/laserFire.system';
import { Power } from '../power';

export const laser: Power = {
    name: 'Laser',
    timeout: 2500,
    chance: 10,
    up: true,
    activate: (game) => {
        game.addSystem(new LaserFire());
    },
    deactivate: (game) => {
        game.removeSystem('LaserFire');
    }
};
