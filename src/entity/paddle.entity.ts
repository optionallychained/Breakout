import { BoxCollider, Color, Entity, FlatColor, Game, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';

export class Paddle extends Entity {

    constructor(position: Vec2) {
        super({
            tag: 'paddle',
            components: [
                new Transform(position, new Vec2(150, 30)),
                new Model(Geometries.SQUARE),
                new Shader(ShaderPrograms.BASIC),
                new FlatColor(Color.red()),
                new BoxCollider()
            ]
        });
    }

    public tick(game: Game): void {
        const transform = this.getComponent<Transform>('Transform');

        const worldX = game.world.dimensions.x;
        const mouseX = game.input.mousePos.x;
        const dimX = transform.scale.x;
        const wallSize = game.getData<number>('wallSize');

        // move paddle with mouse, limit at screen edge
        const x = Math.min(Math.max((dimX - worldX) * 0.5 + wallSize, mouseX - worldX / 2), (worldX - dimX) * 0.5 - wallSize);

        this.getComponent<Transform>('Transform').position.setX(x);
    }
}
