import { Color, Geometries, Vec2 } from 'aura-2d';
import { Invincible } from '../../component/invincible.component';
import { Brick } from './abstractbrick.entity';

export class InvincibleBrick extends Brick {

    constructor(position: Vec2, scale: Vec2) {
        super('invinciblebrick', position, scale, Color.white(), { geometry: Geometries.Wireframe.SQUARE });

        this.addComponent(new Invincible());
    }
}
