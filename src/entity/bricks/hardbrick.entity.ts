import { Color, Geometries, Vec2 } from 'aura-2d';
import { Brick } from './abstractbrick.entity';

export class HardBrick extends Brick {

    constructor(position: Vec2, scale: Vec2) {
        // greatly increased power chance, slightly reduced coin chance
        super('hardbrick', position, scale, Color.red(), {
            points: 5,
            health: 2,
            coinChance: 5,
            powerChance: 20,
            geometry: Geometries.Wireframe.SQUARE
        });
    }
}
