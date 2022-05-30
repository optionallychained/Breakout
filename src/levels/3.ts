import { Level } from './level';

/**
 * Layouts for the third stage in a level cycle; higher complexity/difficulty
 *
 * 9x9 grids incorporating simple, hard, invincible and gold brick types as well as gaps
 */
export const LEVEL_THREES: Array<Level> = [
    [
        ['s', 's', 's', 's', 's', 's', 's', 's', 's'],
        ['s', 'h', ' ', 's', 'g', 's', ' ', 'h', 's'],
        ['s', 's', 'h', ' ', 'h', ' ', 'h', 's', 's'],
        ['s', 'h', 's', 'h', 'h', 'h', 's', 'h', 's'],
        ['s', 'g', 'h', 'i', 'i', 'i', 'h', 'g', 's'],
        ['s', 'h', 's', 'h', 'h', 'h', 's', 'h', 's'],
        ['s', 's', 'h', ' ', 'h', ' ', 'h', 's', 's'],
        ['s', 'h', ' ', 's', 'g', 's', ' ', 'h', 's'],
        ['s', 's', 's', 's', 's', 's', 's', 's', 's'],
    ],
    [
        ['s', 's', 's', 's', 's', 's', 's', 's', 's'],
        ['s', 's', ' ', 's', 'g', 's', ' ', 's', 's'],
        ['s', 's', 's', 'h', 'h', 'h', 's', 's', 's'],
        ['h', ' ', 'h', 'h', 'i', 'h', 'h', ' ', 'h'],
        ['s', 'g', 's', 'h', 'i', 'h', 's', 'g', 's'],
        ['h', ' ', 'h', 'h', 'i', 'h', 'h', ' ', 'h'],
        ['s', 's', 's', 'h', 'h', 'h', 's', 's', 's'],
        ['s', 's', ' ', 's', 'g', 's', ' ', 's', 's'],
        ['s', 's', 's', 's', 's', 's', 's', 's', 's'],
    ],
    [
        ['h', 's', 's', 's', 's', 's', 's', 's', 'h'],
        ['s', 'h', ' ', 's', 'i', 's', ' ', 'h', 's'],
        ['h', 's', 'h', 's', 's', 's', 'h', 's', 'h'],
        ['s', 's', 's', 'h', 'g', 'h', 's', 's', 's'],
        ['s', 'i', ' ', 'g', 'h', 'g', ' ', 'i', 's'],
        ['s', 's', 's', 'h', 'g', 'h', 's', 's', 's'],
        ['h', 's', 'h', 's', 's', 's', 'h', 's', 'h'],
        ['s', 'h', ' ', 's', 'i', 's', ' ', 'h', 's'],
        ['h', 's', 's', 's', 's', 's', 's', 's', 'h'],
    ]
];
