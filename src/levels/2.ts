import { Level } from './level';

/**
 * Layouts for the first stage in a level cycle; medium complexity/difficulty
 *
 * 8x8 grids incorporating simple, hard and invincible brick types as well as gaps
 */
export const LEVEL_TWOS: Array<Level> = [
    [
        ['s', 's', 's', 's', 's', 's', 's', 's'],
        ['s', 'i', 's', 's', 's', 's', 'i', 's'],
        ['s', 'h', 'h', 'h', 'h', 'h', 'h', 's'],
        ['s', 'h', ' ', 's', 's', ' ', 'h', 's'],
        ['s', 'h', ' ', 's', 's', ' ', 'h', 's'],
        ['s', 'h', 'h', 'h', 'h', 'h', 'h', 's'],
        ['s', 'i', 's', 's', 's', 's', 'i', 's'],
        ['s', 's', 's', 's', 's', 's', 's', 's']
    ],
    [
        ['s', 's', 's', 's', 's', 's', 's', 's'],
        ['s', 'h', 'h', 's', 's', 'h', 'h', 's'],
        ['s', ' ', ' ', 'i', 'i', ' ', ' ', 's'],
        ['s', 'h', 'h', 's', 's', 'h', 'h', 's'],
        ['s', 'h', 'h', 's', 's', 'h', 'h', 's'],
        ['s', ' ', ' ', 'i', 'i', ' ', ' ', 's'],
        ['s', 'h', 'h', 's', 's', 'h', 'h', 's'],
        ['s', 's', 's', 's', 's', 's', 's', 's']
    ],
    [
        ['s', 's', 's', 's', 's', 's', 's', 's'],
        ['s', 's', 'i', 'h', 'h', 'i', 's', 's'],
        ['s', 's', ' ', 'h', 'h', ' ', 's', 's'],
        ['s', 's', 'h', 'h', 'h', 'h', 's', 's'],
        ['s', 's', 'h', 'h', 'h', 'h', 's', 's'],
        ['s', 's', ' ', 'h', 'h', ' ', 's', 's'],
        ['s', 's', 'i', 'h', 'h', 'i', 's', 's'],
        ['s', 's', 's', 's', 's', 's', 's', 's']
    ]
];
