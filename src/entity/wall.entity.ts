import { BoxCollider, Color, Entity, FlatColor, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';

export class Wall extends Entity {

    constructor(position: Vec2, scale: Vec2, vert: boolean) {
        super({
            tag: `wall-${vert ? 'vert' : 'hor'}`,
            components: [
                new Transform(position, scale),
                new Model(Geometries.SQUARE),
                new Shader(ShaderPrograms.BASIC),
                new FlatColor(Color.rgba(50, 255, 75)),
                new BoxCollider()
            ]
        });
    }
}
