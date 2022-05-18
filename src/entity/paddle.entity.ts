import { BoxCollider, Color, Entity, FlatColor, Game, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';

export class Paddle extends Entity {

    constructor(worldY: number, wallSize: number) {
        super({
            tag: 'paddle',
            components: [
                new Transform(new Vec2(0, wallSize * 2 - worldY), new Vec2(110, 25)),
                new Model(Geometries.SQUARE),
                new Shader(ShaderPrograms.BASIC),
                new FlatColor(Color.rgba(50, 255, 75)),
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
