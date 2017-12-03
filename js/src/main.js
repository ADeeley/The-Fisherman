'use strict';

const Game = require('./game.js').Game,
    Boat = require('./boat.js').Boat,
    Hook = require('./hook.js').Hook,
    Shoal = require('./shoal.js').Shoal,
    utils_module = require('./utils.js'),
    ctx = utils_module.ctx,
    canvas = utils_module.canvas,
    MYAPP = utils_module.MYAPP;

window.addEventListener('keydown', keyDownEventHandler, false);
window.addEventListener('keyup', keyUpEventHandler, false);

function setup() {
    MYAPP.game = new Game();
    MYAPP.boat = new Boat();
    MYAPP.hook = new Hook();
    MYAPP.shoal = new Shoal(1, 4);
}

function keyDownEventHandler(e) {
    /**
     * Chooses the correct keyevents depending upon the current state
     */
    //Check the current state
    if (e.keyCode === MYAPP.keys.SPACE) {
        if (MYAPP.state === 'startScreen') {
            MYAPP.stateToStartGame();
        } else if (MYAPP.state === 'gameLoop') {
            MYAPP.hook.drop();
        } else if (MYAPP.state === 'victory') {
            MYAPP.stateToStartScreen();
        }
    } else if (e.keyCode === MYAPP.keys.A_KEY && MYAPP.state === 'gameLoop') {
            MYAPP.keyDown.left = true;
        } else if (e.keyCode === MYAPP.keys.D_Key && MYAPP.state === 'gameLoop') {
            MYAPP.keyDown.right = true;
        }
}

function keyUpEventHandler(e) {
    /**
     * Reverts the relevant MYAPP.keys in keyDown dict to false when the button is released
     */
    if (e.keyCode === MYAPP.keys.A_KEY) {
        MYAPP.keyDown.left = false;
    } else if (e.keyCode === MYAPP.keys.D_Key) {
        MYAPP.keyDown.right = false;
    }
}

function mainLoop() {
    // The main loop - checks the MYAPP.stateHandler and runs the appropriate loop
    if (MYAPP.state === 'startScreen') {
        MYAPP.game.startScreen();
        setup();        
    } else if (MYAPP.state === 'gameLoop') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        MYAPP.game.gameLoop();
    } else if (MYAPP.state === 'death') {
        MYAPP.game.deathScreen();
    } else if (MYAPP.state === 'victory') {
        MYAPP.game.victoryScreen();
    } else {
        console.log("Main loop state error: " + MYAPP.state);
    }
}

setup();        
setInterval(mainLoop, 10);
