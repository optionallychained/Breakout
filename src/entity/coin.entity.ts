import { BoxCollider, Color, Entity, FlatColor, Game, Geometries, Model, Random, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';

export class Coin extends Entity {

    private speed = 150 + Math.round(Random.between(50, 150));

    constructor(position: Vec2) {
        super({
            tag: 'coin',
            components: [
                new Transform(position, new Vec2(25, 25)),
                new Model(Geometries.OCTAGON),
                new Shader(ShaderPrograms.BASIC),
                new FlatColor(Color.yellow()),
                new BoxCollider(new Vec2(20, 20))
            ]
        });
    }

    public tick(game: Game, frameDelta: number): void {
        const transform = this.getComponent<Transform>('Transform');

        transform.translate(new Vec2(0, -this.speed * frameDelta / 1000));

        if (transform.position.y <= -game.world.dimensions.y / 2 - transform.scale.y / 2) {
            game.world.removeEntity(this);
        }
    }

    public onCollisionStart(game: Game, other: Entity): void {
        if (other.tag === 'paddle') {
            game.world.removeEntity(this);
            game.setData('points', game.getData<number>('points') + (game.getData<number>('multiplier') * 10));
        }
    }
}
