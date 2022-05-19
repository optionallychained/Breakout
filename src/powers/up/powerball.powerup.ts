import { Invincible } from '../../component/invincible.component';
import { Power } from '../power';

export const powerBall: Power = {
    timeout: 5000,
    activate: (game) => {
        game.world.filterEntitiesByTag('ball')[0]?.addComponent(new Invincible());
    },
    deactivate: (game) => {
        game.world.filterEntitiesByTag('ball')[0]?.removeComponent('Invincible');
    }
}
