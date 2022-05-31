import { BoxCollider, Color, Entity, FlatColor, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';

export class Wall extends Entity {

    constructor(position: Vec2, scale: Vec2, vert: boolean, temp = false) {
        super({
            tag: `wall-${temp ? 'temp' : vert ? 'vert' : 'hor'}`,
            components: [
                new Transform(position, scale),
                new Model(Geometries.Wireframe.SQUARE),
                new Shader(ShaderPrograms.BASIC),
                new FlatColor(Color.white()),
                new BoxCollider()
            ]
        });
    }
}
