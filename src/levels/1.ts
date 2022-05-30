import { Level } from './level';

/**
 * Layouts for the first stage in a level cycle; low complexity/difficulty
 *
 * 7x7 grids incorporating only simple and hard brick types
 */
export const LEVEL_ONES: Array<Level> = [
    [
        ['s', 's', 's', 's', 's', 's', 's'],
        ['s', 's', 's', 's', 's', 's', 's'],
        ['s', 's', 's', 'h', 's', 's', 's'],
        ['s', 's', 'h', 'h', 'h', 's', 's'],
        ['s', 's', 's', 'h', 's', 's', 's'],
        ['s', 's', 's', 's', 's', 's', 's'],
        ['s', 's', 's', 's', 's', 's', 's']
    ],
    [
        ['s', 's', 's', 's', 's', 's', 's'],
        ['s', 's', 's', 's', 's', 's', 's'],
        ['s', 's', 'h', 's', 'h', 's', 's'],
        ['s', 's', 's', 'h', 's', 's', 's'],
        ['s', 's', 'h', 's', 'h', 's', 's'],
        ['s', 's', 's', 's', 's', 's', 's'],
        ['s', 's', 's', 's', 's', 's', 's']
    ],
    [
        ['s', 's', 's', 's', 's', 's', 's'],
        ['s', 's', 's', 'h', 's', 's', 's'],
        ['s', 's', 's', 's', 's', 's', 's'],
        ['s', 'h', 's', 's', 's', 'h', 's'],
        ['s', 's', 's', 's', 's', 's', 's'],
        ['s', 's', 's', 'h', 's', 's', 's'],
        ['s', 's', 's', 's', 's', 's', 's']
    ]
];
