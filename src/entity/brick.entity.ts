import { BoxCollider, Color, Entity, FlatColor, Game, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';

export class Brick extends Entity {

    constructor(position: Vec2, scale: Vec2, color: Color) {
        super({
            tag: 'brick',
            components: [
                new Transform(position, scale),
                new Model(Geometries.SQUARE),
                new Shader(ShaderPrograms.BASIC),
                new FlatColor(color),
                new BoxCollider()
            ]
        });
    }

    public onCollisionStart(game: Game, other: Entity): void {
        if (!this.hasComponent('Invincible') && (other.tag.includes('ball') || other.tag === 'explosion')) {
            game.world.removeEntity(this);

            // add points
            // every brick hit in sequence (between paddle hits) yields more points
            const multiplier = game.getData<number>('multiplier');
            game.setData('points', game.getData<number>('points') + multiplier);
            game.setData('multiplier', multiplier + 1);
        }
    }
}
