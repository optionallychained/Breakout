import { BoxCollider, Color, Entity, FlatColor, Game, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';

export class Ball extends Entity {

    private attached = true;
    private didCollide = false;

    constructor() {
        super({
            tag: 'ball',
            components: [
                new Transform(new Vec2(), new Vec2(25, 25)),
                new Model(Geometries.CIRCLE),
                new Shader(ShaderPrograms.BASIC),
                new FlatColor(Color.white()),
                new BoxCollider(new Vec2(20, 20))
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

        // always reset same-frame collision-cancelling mechanism
        this.didCollide = false;
    }

    public onCollisionStart(game: Game, other: Entity): void {
        const ball = this.getComponent<Transform>('Transform');

        if (other.tag === 'paddle') {
            // TODO only if hit top of paddle? - bounce off for left/right as brick?

            ball.velocity.setY(-ball.velocity.y);
            game.setData('multiplier', 1);
        }
        else if (other.tag === 'wall-vert') {
            ball.velocity.setX(-ball.velocity.x);
        }
        else if (other.tag === 'wall-hor') {
            ball.velocity.setY(-ball.velocity.y);
        }
        else if (other.tag === 'brick') {
            // add points
            // every brick hit in sequence (between paddle hits) yields more points
            const multiplier = game.getData<number>('multiplier');
            game.setData('points', game.getData<number>('points') + multiplier);
            game.setData('multiplier', multiplier + 1);

            // cancel velocity changes for second+ of multiple collisions on a single frame
            if (this.didCollide) {
                return;
            }
            this.didCollide = true;

            const brick = other.getComponent<Transform>('Transform');

            // direction from brick center => ball center
            const offset = Vec2.normalize(Vec2.sub(ball.position, brick.position));

            // if the ball is on the right or left of the brick, the y offset will be small enough to round to 0
            // this will be true as long as the bricks and balls do not differ too greatly in height
            if (Math.round(offset.y) === 0) {
                ball.velocity.setX(-ball.velocity.x);
            }
            else {
                ball.velocity.setY(-ball.velocity.y);
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
