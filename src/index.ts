import { Game, ShaderPrograms, Vec2 } from 'aura-2d';
import { GAME_OVER_STATE } from './state/gameOver.state';
import { GAME_STATE } from './state/game.state';
import { GAME_SETUP_STATE } from './state/gameSetup.state';
import { Sounds } from './sounds';
import { PAUSED_STATE } from './state/paused.state';
import { PowerHandler } from './system/powerHandler.system';
import { Paddle } from './entity/paddle.entity';
import { Wall } from './entity/wall.entity';
import { Cursor } from './entity/cursor.entity';
import { Ball } from './entity/ball.entity';
import { BONUS_LEVEL_STATE } from './state/bonusLevel.state';

const game = new Game({
    canvasDimensions: new Vec2(1024, 768),
    controlScheme: 'both'
});

game.registerShader(ShaderPrograms.BASIC);
game.registerShader(ShaderPrograms.TEXTURE_COLORED);

game.canvas!.style.cursor = 'none';

// TODO port into Aura, add to game config
Sounds.add('paddlewall', 'res/paddlewall.wav');
Sounds.add('death', 'res/death.wav');
Sounds.add('brickhit', 'res/brickhit.wav');
Sounds.add('brickdestroy', 'res/brickdestroy.wav');
Sounds.add('coinpowerspawn', 'res/coinpowerspawn.wav');
Sounds.add('coincollect', 'res/coincollect.wav');
Sounds.add('powerup', 'res/powerup.wav');
Sounds.add('powerdown', 'res/powerdown.wav');
Sounds.add('shoot', 'res/shoot.wav');
Sounds.add('levelsetup', 'res/levelsetup.wav');

// TODO port into game config
game.addStates(GAME_SETUP_STATE, GAME_STATE, BONUS_LEVEL_STATE, PAUSED_STATE, GAME_OVER_STATE);

// set up some persistent game objects and systems and set some initial data
// TODO implies want for a configurable game init() &&/|| configurable initial data?
const wallSize = 20;
const worldX = game.world.dimensions.x / 2;
const worldY = game.world.dimensions.y / 2;

game.addSystem(new PowerHandler());
game.world.addEntities(
    new Paddle(worldY, wallSize),
    new Wall(new Vec2(-worldX + wallSize / 2, -wallSize / 2), new Vec2(wallSize, game.world.dimensions.y - wallSize), true),
    new Wall(new Vec2(worldX - wallSize / 2, -wallSize / 2), new Vec2(wallSize, game.world.dimensions.y - wallSize), true),
    new Wall(new Vec2(0, worldY - wallSize / 2), new Vec2(game.world.dimensions.x, wallSize), false),
    new Cursor(),
    new Ball()
);

game.setData('balls', 2);
game.setData('points', 0);
game.setData('wallSize', wallSize);
game.setData('brickPadding', 10);
game.setData('brickMargin', 75);
game.setData('level', 1);
game.setData('levelCycle', 0);
game.setData('levelCycleCap', 3);
game.setData('bonus', false);

// TODO only remains for use in LaserFire; all other pause-related functionality is possible without
//   to remove, require system retrieval from game
game.setData('paused', false);

game.start(GAME_SETUP_STATE.name);
