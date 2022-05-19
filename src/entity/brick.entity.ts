import { BoxCollider, Color, Entity, FlatColor, Game, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';
import { Coin } from './coin.entity';

export class Brick extends Entity {

    constructor(position: Vec2, scale: Vec2, color: Color) {
        super({
            tag: 'brick',
            components: [
                new Transform(position, scale),
                new Model(Geometries.SQUARE),
                new Shader(ShaderPrograms.BASIC),
                new FlatColor(color),
                new BoxCollider()
            ]
        });
    }

    public onCollisionStart(game: Game, other: Entity): void {
        if (other.tag === 'ball') {
            game.world.removeEntity(this);
        }

        if (Math.random() <= 0.075) {
            game.world.addEntity(new Coin(this.getComponent<Transform>('Transform').position));
        }
    }
}
