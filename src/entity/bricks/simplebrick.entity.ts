import { Color, Vec2 } from 'aura-2d';
import { Brick } from './abstractbrick.entity';

export class SimpleBrick extends Brick {

    constructor(position: Vec2, scale: Vec2, color: Color) {
        super('simplebrick', position, scale, color);
    }
}
