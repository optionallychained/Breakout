import { BoxCollider, Color, Entity, FlatColor, Game, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';

export class Ball extends Entity {

    private attached = true;
    private didCollide = false;
    private defaultVelocity = new Vec2(300, 300);
    private maxVelocity = new Vec2(550, 550);

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
        const ot = other.getComponent<Transform>('Transform');

        // velocity changes
        let velMultX = 1, velMultY = 1, velChange = 0;

        if (other.tag === 'wall-vert') {
            velMultX = -1;
        }
        else if (other.tag === 'wall-hor') {
            velMultY = -1;
        }
        else if (other.tag === 'paddle') {
            game.setData('multiplier', 1);

            velMultY = -1;

            // increase speed a little
            velChange = 10;

            // reverse ball if hit left + moving right or hit right + moving left
            if (
                (ball.position.x <= ot.position.x - ot.scale.x / 8 && ball.velocity.x > 0)
                ||
                (ball.position.x >= ot.position.x + ot.scale.x / 8 && ball.velocity.x < 0)
            ) {
                velMultX = -1;
            }
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

            // TODO this still has edge cases; mostly corner hits
            // direction from brick center => ball center
            const offset = Vec2.normalize(Vec2.sub(ball.position, ot.position));

            // if the ball is on the right or left of the brick, the y offset will be small enough to round to 0
            // this will be true as long as the bricks and balls do not differ too greatly in height
            if (Math.round(offset.y) === 0) {
                velMultX = -1;
            }
            else {
                velMultY = -1;
            }

            // increase speed a little
            velChange = 10;
        }

        this.changeVelocity(velChange);
        this.applyVelocityMultipliers(velMultX, velMultY);
    }

    public isAttached(): boolean {
        return this.attached;
    }

    public toggleAttached(): void {
        this.attached = !this.attached;

        const transform = this.getComponent<Transform>('Transform');
        if (this.attached) {
            transform.velocity.set();
        }
        else {
            // random start direction on x
            transform.velocity.set(this.defaultVelocity.x * (Math.random() <= 0.5 ? -1 : 1), this.defaultVelocity.y);
        }
    }

    private changeVelocity(delta: number): void {
        const transform = this.getComponent<Transform>('Transform');
        const newVelocity = this.getClampedVelocity(
            new Vec2(
                transform.velocity.x > 0 ? transform.velocity.x + delta : transform.velocity.x - delta,
                transform.velocity.y > 0 ? transform.velocity.y + delta : transform.velocity.y - delta,
            )
        );

        transform.velocity.set(newVelocity.x, newVelocity.y);
    }

    private applyVelocityMultipliers(x: number, y: number): void {
        const transform = this.getComponent<Transform>('Transform');
        const newVelocity = this.getClampedVelocity(Vec2.mult(transform.velocity, new Vec2(x, y)));

        transform.velocity.set(newVelocity.x, newVelocity.y);
    }

    private getClampedVelocity(newVelocity: Vec2): Vec2 {
        const clamped = newVelocity.clone();

        if (Math.abs(clamped.x) >= Math.abs(this.maxVelocity.x)) {
            clamped.setX(clamped.x > 0 ? this.maxVelocity.x : -this.maxVelocity.x);
        }
        if (Math.abs(clamped.y) >= Math.abs(this.maxVelocity.y)) {
            clamped.setY(newVelocity.y > 0 ? this.maxVelocity.y : -this.maxVelocity.y);
        }

        return clamped;
    }
}
