import { Game, ShaderPrograms, Vec2 } from 'aura-2d';
import { GAME_OVER_STATE } from './state/gameOver.state';
import { GAME_STATE } from './state/game.state';
import { GAME_SETUP_STATE } from './state/gameSetup.state';

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

// TODO would be nice to have pause as a state, but may require a "to"/"from" in state end/init for conditional logic on gamestate
game.setData('paused', false);

game.canvas!.style.cursor = 'none';

game.addStates(GAME_SETUP_STATE, GAME_STATE, GAME_OVER_STATE);
game.start(GAME_SETUP_STATE.name);
