import { Power } from '../power';

export const extraBall: Power = {
    name: 'Extra Ball',
    timeout: 2000,
    chance: 20,
    activate: (game) => {
        game.setData('balls', game.getData<number>('balls') + 1);
    },
    deactivate: () => { }
};
