import { Game, ShaderPrograms, Vec2 } from 'aura-2d';
import { GAME_STATE } from './state/game.state';
import { MENU_STATE } from './state/menu.state';

const game = new Game({
    canvasDimensions: new Vec2(1024, 768),
    controlScheme: 'both'
});

game.registerShader(ShaderPrograms.BASIC);
game.registerShader(ShaderPrograms.TEXTURE_COLORED);

game.addStates(MENU_STATE, GAME_STATE);
game.start(MENU_STATE.name);
