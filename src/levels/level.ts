import { BrickShortTag } from '../entity/bricks/brickInfo';
import { ONE_ONE } from './1/1-1';
import { TWO_ONE } from './2/2-1';
import { THREE_ONE } from './3/3-1';

// levels are represented as a uniform 2d layout of short brick identifiers; hyphens indicate an empty space
export type Level = Array<Array<BrickShortTag | '-'>>;

// levels are organised into sets, with each set being the pool of available layouts for the current level, cycling in sets of 3
// eg:
//     level 1, 4, 7 select from set 1
//     level 2, 5, 8 select from set 2
//     level 3, 6, 9 select from set 3
export const levelPool = [
    [ONE_ONE],
    [TWO_ONE],
    [THREE_ONE]
];
