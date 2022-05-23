import { Power } from '../power';

export const extraball: Power = {
    name: 'Extra Ball',
    timeout: 2000,
    activate: (game) => {
        game.setData('balls', game.getData<number>('balls') + 1);
    },
    deactivate: () => { }
}
