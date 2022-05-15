import { BoxCollider, Color, Entity, FlatColor, Game, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';

export class Ball extends Entity {

    private attached = true;

    constructor() {
        super({
            tag: 'ball',
            components: [
                new Transform(new Vec2(), new Vec2(25, 25)),
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
                game.setData('balls', game.getData<number>('balls') - 1);

                // reset points multiplier
                game.setData('multiplier', 1);
            }
        }
    }

    public onCollisionStart(game: Game, other: Entity): void {
        const transform = this.getComponent<Transform>('Transform');

        if (other.tag === 'paddle') {
            // TODO only if hit top of paddle? - bounce off for left/right as brick?

            // invert y velocity for paddle
            transform.velocity.setY(-transform.velocity.y);

            // reset points multiplier
            game.setData('multiplier', 1);
        }
        else if (other.tag === 'wall-vert') {
            // invert x velocity for vertical wall
            transform.velocity.setX(-transform.velocity.x);
        }
        else if (other.tag === 'wall-hor') {
            // invert y velocity for horizontal wall
            transform.velocity.setY(-transform.velocity.y);
        }
        else if (other.tag === 'brick') {
            // TODO there are some edge cases associated with this logic
            //   eg: ball vel +y, side hit => weirdness
            // also issue with multiple near-simultaneous collisions

            const ot = other.getComponent<Transform>('Transform');

            const leftHit = (
                (transform.position.x < ot.position.x)
                &&
                (transform.position.y < ot.position.y + ot.scale.y / 2)
                &&
                (transform.position.y > ot.position.y - ot.scale.y / 2)
            );

            const rightHit = (
                (transform.position.x > ot.position.x)
                &&
                (transform.position.y < ot.position.y + ot.scale.y / 2)
                &&
                (transform.position.y > ot.position.y - ot.scale.y / 2)
            );

            // invert x only for left or right side hit, y only for top or bottom hit
            if (leftHit || rightHit) {
                transform.velocity.setX(-transform.velocity.x);
            }
            else {
                // always invert y
                transform.velocity.setY(-transform.velocity.y);
            }

            // add points
            // every brick hit in sequence (between paddle hits) yields more points
            const multiplier = game.getData<number>('multiplier');
            game.setData('points', game.getData<number>('points') + multiplier);
            game.setData('multiplier', multiplier + 1);
        }
    }

    public isAttached(): boolean {
        return this.attached;
    }

    public toggleAttached(): void {
        this.attached = !this.attached;
    }
}
