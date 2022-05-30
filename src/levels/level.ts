import { BrickShortTag } from '../entity/bricks/brickInfo';
import { LEVEL_ONES } from './1';
import { LEVEL_TWOS } from './2';
import { LEVEL_THREES } from './3';

// levels are represented as a uniform 2d layout of short brick identifiers; spaces indicate an empty space
export type Level = Array<Array<BrickShortTag | ' '>>;

// levels are organised into sets, with each set being the pool of available layouts for the current level, cycling in sets of 3
// eg:
//     level 1, 4, 7 select from set 1
//     level 2, 5, 8 select from set 2
//     level 3, 6, 9 select from set 3
export const LEVEL_POOL = [
    [...LEVEL_ONES],
    [...LEVEL_TWOS],
    [...LEVEL_THREES]
];
