import { BoxCollider, Color, Entity, FlatColor, Game, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';

export class Ball extends Entity {

    private attached = true;

    constructor() {
        super({
            tag: 'ball',
            components: [
                new Transform(new Vec2(), new Vec2(30, 30), 0, new Vec2()),
                new Model(Geometries.CIRCLE),
                new Shader(ShaderPrograms.BASIC),
                new FlatColor(Color.white()),
                new BoxCollider()
            ]
        });
    }

    public tick(game: Game): void {
        const transform = this.getComponent<Transform>('Transform');

        if (this.attached) {
            // ensure velocity 0
            transform.velocity.set();

            // position above paddle
            const paddle = game.world.filterEntitiesByTag('paddle')[0];
            if (paddle) {
                const paddleTransform = paddle.getComponent<Transform>('Transform');

                const yPos = paddleTransform.position.y + 0.5 * (paddleTransform.scale.y + transform.scale.y);

                transform.position.set(paddleTransform.position.x, yPos);
            }
        }
        else {
            if (transform.position.y + transform.scale.y * 0.75 <= -game.world.dimensions.y / 2) {
                // death
                this.toggleAttached();
                game.setData('lives', game.getData<number>('lives') - 1);
            }
        }
    }

    public onCollisionStart(game: Game, other: Entity): void {
        const transform = this.getComponent<Transform>('Transform');

        if (other.tag === 'paddle') {
            // invert y velocity
            transform.velocity.setY(-transform.velocity.y);
        }
        else if (other.tag.includes('wall')) {
            // invert x for vertical wall, y for horizontal wall
            if (other.tag === 'wall-vert') {
                transform.velocity.setX(-transform.velocity.x);
            }
            else {
                transform.velocity.setY(-transform.velocity.y);
            }
        }
    }

    public isAttached(): boolean {
        return this.attached;
    }

    public toggleAttached(): void {
        this.attached = !this.attached;
    }
}
