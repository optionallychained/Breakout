import { BoxCollider, Entity, Game, Transform, Vec2 } from 'aura-2d';

export class Explosion extends Entity {

    constructor(position: Vec2, scale: Vec2) {
        super({
            tag: 'explosion',
            components: [
                new Transform(position, Vec2.scale(scale, 7.5)),
                new BoxCollider(),
            ]
        });
    }

    public onCollisionStart(game: Game): void {
        game.world.removeEntity(this);
    }
}
