import { BoxCollider, Color, Entity, FlatColor, Game, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';
import { BRICK_TAGS } from './bricks/brickInfo';

export class Bullet extends Entity {

    constructor(position: Vec2) {
        super({
            tag: 'bullet',
            components: [
                new Transform(position, new Vec2(10, 40), 0, new Vec2(0, 500)),
                new Shader(ShaderPrograms.BASIC),
                new Model(Geometries.SQUARE),
                new FlatColor(Color.rgba(50, 255, 75)),
                new BoxCollider()
            ]
        });
    }

    public onCollisionStart(game: Game, other: Entity): void {
        if (BRICK_TAGS.includes(other.tag)) {
            game.world.removeEntity(this);
        }
    }
}
