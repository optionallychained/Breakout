import { BoxCollider, Color, Entity, FlatColor, Game, Geometries, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';
import { Health } from '../../component/health.component';
import { Points } from '../../component/points.component';
import { PowerHandler } from '../../system/powerHandler.system';
import { Coin } from '../coin.entity';
import { Power } from '../power.entity';

interface BrickConfig {
    points?: number,
    health?: number,
    coinChance?: number,
    powerChance?: number
}

const brickConfigDefaults: Required<BrickConfig> = {
    points: 1,
    health: 1,
    coinChance: 7.5,
    powerChance: 7.5
}

export abstract class Brick extends Entity {

    private brickConfig;

    constructor(tag: string, position: Vec2, scale: Vec2, color: Color, brickConfig?: BrickConfig) {

        super({
            tag,
            components: [
                new Transform(position, scale),
                new Model(Geometries.SQUARE),
                new Shader(ShaderPrograms.BASIC),
                new FlatColor(color),
                new BoxCollider(),
                new Health(brickConfig?.health ?? brickConfigDefaults.health),
                new Points(brickConfig?.points ?? brickConfigDefaults.points)
            ]
        });

        this.brickConfig = Object.assign({}, brickConfigDefaults, brickConfig);
    }

    public tick(game: Game): void {
        const health = this.getComponent<Health>('Health').value;

        if (!this.hasComponent('Invincible') && health > 1) {
            const { position, scale } = this.getComponent<Transform>('Transform');

            game.text.addString(
                `${health}`,
                position,
                Vec2.scale(scale, 0.5),
                Color.white()
            );
        }
    }

    public onCollisionStart(game: Game, other: Entity): void {
        if (!this.hasComponent('Invincible') && (other.tag.includes('ball') || other.tag === 'explosion' || other.tag === 'bullet')) {
            if (!--this.getComponent<Health>('Health').value) {
                // add points
                // every brick hit in sequence (between paddle hits) yields more points
                const multiplier = game.getData<number>('multiplier');
                game.setData('points', game.getData<number>('points') + (this.getComponent<Points>('Points').value * multiplier));
                game.setData('multiplier', multiplier + 1);

                this.spawnContents(game);

                game.world.removeEntity(this);
            }
        }
    }

    protected spawnContents(game: Game): void {
        // spawn powers/coins
        const { position } = this.getComponent<Transform>('Transform');

        const coin = Math.random() * 100 <= this.brickConfig.coinChance;
        if (coin) {
            game.world.addEntity(new Coin(position, this.getComponent<Points>('Points').value * 10 * game.getData<number>('level')));
        }
        else if (
            Math.random() * 100 <= this.brickConfig.powerChance
            &&
            !PowerHandler.isPowerActive()
            &&
            !game.world.filterEntitiesByTag('power').length
        ) {

            game.world.addEntity(new Power(position));
        }
    }
}
