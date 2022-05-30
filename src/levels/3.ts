import { Level } from './level';

/**
 * Layouts for the third stage in a level cycle; higher complexity/difficulty
 *
 * 9x9 grids incorporating simple, hard, invincible and gold brick types as well as gaps
 */
export const LEVEL_THREES: Array<Level> = [
    [
        ['s', 's', 's', 's', 's', 's', 's', 's', 's'],
        ['s', 'h', ' ', 's', 'i', 's', ' ', 'h', 's'],
        ['s', 's', 'h', ' ', 'i', ' ', 'h', 's', 's'],
        ['s', 'h', 's', 'h', 'h', 'h', 's', 'h', 's'],
        ['s', 'i', 'i', 'g', 'g', 'g', 'i', 'i', 's'],
        ['s', 'h', 's', 'h', 'h', 'h', 's', 'h', 's'],
        ['s', 's', 'h', ' ', 'i', ' ', 'h', 's', 's'],
        ['s', 'h', ' ', 's', 'i', 's', ' ', 'h', 's'],
        ['s', 's', 's', 's', 's', 's', 's', 's', 's'],
    ],
    [
        ['s', 's', 's', 's', 'i', 's', 's', 's', 's'],
        ['s', 's', ' ', 's', 'i', 's', ' ', 's', 's'],
        ['s', 's', 's', 'h', 'h', 'h', 's', 's', 's'],
        ['h', ' ', 'h', 'h', 'g', 'h', 'h', ' ', 'h'],
        ['i', 'i', 'i', 'h', 'g', 'h', 'i', 'i', 'i'],
        ['h', ' ', 'h', 'h', 'g', 'h', 'h', ' ', 'h'],
        ['s', 's', 's', 'h', 'h', 'h', 's', 's', 's'],
        ['s', 's', ' ', 's', 'i', 's', ' ', 's', 's'],
        ['s', 's', 's', 's', 'i', 's', 's', 's', 's'],
    ],
    [
        ['h', 's', 's', 's', 'i', 's', 's', 's', 'h'],
        ['s', 'h', ' ', 's', 'h', 's', ' ', 'h', 's'],
        ['h', 's', 'h', 'i', ' ', 'i', 'h', 's', 'h'],
        ['s', 's', 'i', 'h', 'g', 'h', 'i', 's', 's'],
        ['i', 'h', ' ', 'g', 'h', 'g', ' ', 'h', 'i'],
        ['s', 's', 'i', 'h', 'g', 'h', 'i', 's', 's'],
        ['h', 's', 'h', 'i', ' ', 'i', 'h', 's', 'h'],
        ['s', 'h', ' ', 's', 'h', 's', ' ', 'h', 's'],
        ['h', 's', 's', 's', 'i', 's', 's', 's', 'h'],
    ]
];
