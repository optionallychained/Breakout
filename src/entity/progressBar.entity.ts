import { Color, Entity, FlatColor, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';

export class ProgressBar extends Entity {

    constructor(position: Vec2, width: number) {
        super({
            tag: 'progressbar',
            components: [
                new Transform(position, new Vec2(width, 20)),
                new Shader(ShaderPrograms.BASIC),
                new Model(Geometries.Wireframe.SQUARE),
                new FlatColor(Color.white())
            ]
        });
    }
}
