import { Angle, BoxCollider, Color, Entity, FlatColor, Game, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';
import { Effect } from '../component/effect.component';
import { PowerHandler } from '../system/powerHandler.system';

export class PowerUp extends Entity {

    constructor(position: Vec2) {
        super({
            tag: 'powerup',
            components: [
                new Transform(position, new Vec2(30, 30), 0, new Vec2(0, 0)),
                new Model(Geometries.HEXAGON),
                new Shader(ShaderPrograms.BASIC),
                new FlatColor(Color.green()),
                new BoxCollider(),
                new Effect()
            ]
        })
    }

    public tick(game: Game, frameDelta: number): void {
        const transform = this.getComponent<Transform>('Transform');

        transform.rotate(Angle.toRadians(1));
        transform.translate(new Vec2(0, -100 * frameDelta / 1000));

        if (transform.position.y <= -game.world.dimensions.y / 2 - transform.scale.y / 2) {
            game.world.removeEntity(this);
        }
    }

    public onCollisionStart(game: Game, other: Entity): void {
        if (other.tag === 'paddle') {
            game.world.removeEntity(this);

            PowerHandler.activatePower(this.getComponent<Effect>('Effect').power, game);
        }
    }
}
