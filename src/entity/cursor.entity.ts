import { Angle, Color, Entity, FlatColor, Game, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';

export class Cursor extends Entity {

    constructor() {
        super({
            tag: 'cursor',
            components: [
                new Transform(new Vec2(), new Vec2(10, 10), Angle.toRadians(45)),
                new Model(Geometries.SQUARE),
                new Shader(ShaderPrograms.BASIC),
                new FlatColor(Color.white()),
            ]
        });
    }

    public tick(game: Game): void {
        const transform = this.getComponent<Transform>('Transform');
        const { x: mouseX, y: mouseY } = game.input.mousePos;
        const { x: worldX, y: worldY } = game.world.dimensions;

        transform.position.set(mouseX - worldX / 2, worldY / 2 - mouseY);
    }
}
