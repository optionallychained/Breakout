import { Power } from '../power';

export const EXTRA_BALL: Power = {
    name: 'Extra Ball',
    timeout: 1500,
    chance: 20,
    up: true,
    activate: (game) => {
        game.setData('balls', game.getData<number>('balls') + 1);
    },
    deactivate: () => { }
};
