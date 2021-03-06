import { BoxCollider, Color, Entity, FlatColor, Game, Geometries, Geometry, Model, Shader, ShaderPrograms, Transform, Vec2 } from 'aura-2d';
import { Health } from '../../component/health.component';
import { Points } from '../../component/points.component';
import { PowerHandler } from '../../system/powerHandler.system';
import { Coin } from '../coin.entity';
import { Power } from '../power.entity';

interface BrickConfig {
    points?: number,
    health?: number,
    coinChance?: number,
    powerChance?: number;
    geometry?: Geometry;
}

const brickConfigDefaults: Required<BrickConfig> = {
    points: 2,
    health: 1,
    coinChance: 10,
    powerChance: 10,
    geometry: Geometries.SQUARE
}

export abstract class Brick extends Entity {

    private brickConfig;

    constructor(tag: string, position: Vec2, scale: Vec2, color: Color, brickConfig?: BrickConfig) {

        super({
            tag,
            components: [
                new Transform(position, scale),
                new Model(brickConfig?.geometry ?? brickConfigDefaults.geometry),
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
        let sound = '';

        if (!this.hasComponent('Invincible') && (other.tag.includes('ball') || other.tag === 'explosion' || other.tag === 'bullet')) {
            sound = 'brickhit';

            if (!--this.getComponent<Health>('Health').value || other.hasComponent('Invincible')) {
                // add points
                // every brick hit in sequence (between paddle hits) yields more points
                const multiplier = game.getData<number>('multiplier');
                game.setData('points', game.getData<number>('points') + (this.getComponent<Points>('Points').value * multiplier));
                game.setData('multiplier', multiplier + 1);

                this.spawnContents(game);

                game.world.removeEntity(this);

                sound = 'brickdestroy';
            }
        }
        else {
            sound = 'paddlewall';
        }

        game.audio.play(sound);
    }

    protected spawnContents(game: Game): void {
        // spawn powers/coins
        const { position } = this.getComponent<Transform>('Transform');

        const coin = Math.random() * 100 <= this.brickConfig.coinChance;
        if (coin) {
            game.world.addEntity(new Coin(position, this.getComponent<Points>('Points').value * 10 * game.getData<number>('level')));
            game.audio.play('coinpowerspawn');
        }
        else if (
            Math.random() * 100 <= this.brickConfig.powerChance
            &&
            !game.getSystem<PowerHandler>('PowerHandler').isPowerActive()
            &&
            !game.world.filterEntitiesByTag('power').length
        ) {

            game.world.addEntity(new Power(position));
            game.audio.play('coinpowerspawn');
        }
    }
}
