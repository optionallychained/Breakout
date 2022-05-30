import { Color, Geometries, Vec2 } from 'aura-2d';
import { Brick } from './abstractbrick.entity';

export class GoldBrick extends Brick {

    constructor(position: Vec2, scale: Vec2) {
        // always spawn a coin
        super('goldbrick', position, scale, Color.yellow(), {
            points: 10,
            health: 3,
            coinChance: 100,
            powerChance: 0,
            geometry: Geometries.Wireframe.HEXAGON
        });
    }
}
