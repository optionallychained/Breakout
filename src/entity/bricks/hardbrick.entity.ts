import { Color, Vec2 } from 'aura-2d';
import { Brick } from './abstractbrick.entity';

export class HardBrick extends Brick {

    constructor(position: Vec2, scale: Vec2, color: Color) {
        // greatly increased power chance, slightly reduced coin chance
        super('hardbrick', position, scale, color, { points: 2, health: 2, coinChance: 5, powerChance: 15 });
    }
}
