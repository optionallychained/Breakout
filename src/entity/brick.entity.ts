import { BoxCollider, Color, Entity, FlatColor, Game, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';

export class Brick extends Entity {

    constructor(position: Vec2, scale: Vec2) {
        super({
            tag: 'brick',
            components: [
                new Transform(position, scale),
                new Model(Geometries.SQUARE),
                new Shader(ShaderPrograms.BASIC),
                new FlatColor(Color.random()),
                new BoxCollider()
            ]
        });
    }

    public onCollisionStart(game: Game, other: Entity): void {
        if (other.tag === 'ball') {
            game.world.removeEntity(this);
        }
    }
}