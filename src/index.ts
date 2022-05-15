import { Game, ShaderPrograms, Vec2 } from 'aura-2d';
import { GAME_OVER_STATE } from './state/gameOver.state';
import { GAME_STATE } from './state/game.state';
import { MENU_STATE } from './state/menu.state';
import { WIN_STATE } from './state/win.state';

const game = new Game({
    canvasDimensions: new Vec2(1024, 768),
    controlScheme: 'both'
});

game.registerShader(ShaderPrograms.BASIC);
game.registerShader(ShaderPrograms.TEXTURE_COLORED);

game.setData('lives', 3);
game.setData('points', 0);
game.setData('multiplier', 1);
game.setData('wallSize', 20);
game.setData('brickRows', 8);
game.setData('brickColumns', 10);
game.setData('brickPadding', 10);
game.setData('brickMargin', 75);

game.addStates(MENU_STATE, GAME_STATE, GAME_OVER_STATE, WIN_STATE);
game.start(MENU_STATE.name);
