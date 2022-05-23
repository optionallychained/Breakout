import { Reverse } from '../../component/reverse.component';
import { Power } from '../power';

export const reversePaddle: Power = {
    name: 'Reverse Paddle',
    timeout: 5000,
    chance: 10,
    activate: (game) => {
        game.world.filterEntitiesByTag('paddle')[0]?.addComponent(new Reverse())
    },
    deactivate: (game) => {
        game.world.filterEntitiesByTag('paddle')[0]?.removeComponent('Reverse');
    }
};
