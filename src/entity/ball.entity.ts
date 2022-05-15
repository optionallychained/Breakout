import { Color, Entity, FlatColor, Game, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';

export class Ball extends Entity {

    private attached = true;

    constructor() {
        super({
            tag: 'ball',
            components: [
                new Transform(new Vec2(0, 0), new Vec2(30, 30), 0, new Vec2(0, 0)),
                new Model(Geometries.CIRCLE),
                new Shader(ShaderPrograms.BASIC),
                new FlatColor(Color.white())
            ]
        });
    }

    public tick(game: Game): void {
        if (this.attached) {
            // ensure velocity 0
            const ballTransform = this.getComponent<Transform>('Transform');
            ballTransform.velocity.set(0, 0);

            // position above paddle
            const paddle = game.world.filterEntitiesByTag('paddle')[0];
            if (paddle) {
                const paddleTransform = paddle.getComponent<Transform>('Transform');

                const yPos = paddleTransform.position.y + 0.5 * (paddleTransform.scale.y + ballTransform.scale.y);

                ballTransform.position.set(paddleTransform.position.x, yPos);
            }
        }
    }

    public toggleAttached(): void {
        this.attached = !this.attached;
    }
}
