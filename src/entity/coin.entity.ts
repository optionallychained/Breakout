import { BoxCollider, Color, Entity, FlatColor, Game, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';
import { Points } from '../component/points.component';

export class Coin extends Entity {

    constructor(position: Vec2, points: number) {
        super({
            tag: 'coin',
            components: [
                new Transform(position, new Vec2(25, 25), 0, new Vec2(0, -150)),
                new Model(Geometries.OCTAGON),
                new Shader(ShaderPrograms.BASIC),
                new FlatColor(Color.yellow()),
                new BoxCollider(new Vec2(20, 20)),
                new Points(points)
            ]
        });
    }

    public tick(game: Game, frameDelta: number): void {
        const transform = this.getComponent<Transform>('Transform');

        if (transform.position.y <= -game.world.dimensions.y / 2 - transform.scale.y / 2) {
            game.world.removeEntity(this);
        }
    }

    public onCollisionStart(game: Game, other: Entity): void {
        if (other.tag === 'paddle') {
            game.world.removeEntity(this);
            game.setData('points', game.getData<number>('points') + this.getComponent<Points>('Points').value * 10);
        }
    }
}
