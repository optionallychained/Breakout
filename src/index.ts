import { Game, ShaderPrograms, Vec2 } from 'aura-2d';
import { GAME_OVER_STATE } from './state/gameOver.state';
import { GAME_STATE } from './state/game.state';
import { GAME_SETUP_STATE } from './state/gameSetup.state';
import { Sounds } from './sounds';
import { PAUSED_STATE } from './state/paused.state';
import { PowerHandler } from './system/powerHandler.system';

const game = new Game({
    canvasDimensions: new Vec2(1024, 768),
    controlScheme: 'both'
});

game.registerShader(ShaderPrograms.BASIC);
game.registerShader(ShaderPrograms.TEXTURE_COLORED);

// set some data
game.setData('wallSize', 20);
game.setData('brickPadding', 10);
game.setData('brickMargin', 75);
game.setData('level', 1);
game.setData('levelCycle', 0);
game.setData('levelCycleCap', 3);
game.setData('bonus', false);

// TODO only remains for use in LaserFire; all other pause-related functionality is possible without
//   to remove, require system retrieval from game
game.setData('paused', false);

game.canvas!.style.cursor = 'none';

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

game.addStates(GAME_SETUP_STATE, GAME_STATE, PAUSED_STATE, GAME_OVER_STATE);

game.addSystem(new PowerHandler());

game.start(GAME_SETUP_STATE.name);
