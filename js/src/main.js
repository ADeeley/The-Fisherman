'use strict';

const Game = require('./game.js').Game;
const Boat = require('./boat.js').Boat;
const Hook = require('./hook.js').Hook;
const Shoal = require('./shoal.js').Shoal;
const utilsModule = require('./utils.js');
const ctx = utilsModule.ctx;
const canvas = utilsModule.canvas;
const MYAPP = utilsModule.MYAPP;

window.addEventListener('keydown', keyDownEventHandler, false);
window.addEventListener('keyup', keyUpEventHandler, false);

/**
 * Instantiates all the game objects.
 */
function setup() {
    MYAPP.game = new Game();
    MYAPP.boat = new Boat();
    MYAPP.hook = new Hook();
    MYAPP.shoal = new Shoal(1, 4);
};

/**
 * Key press handler. Chooses the correct keyevents depending upon
 * the current state
 * @param {Number} e The key that was pressed.
 */
function keyDownEventHandler(e) {
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
        } else if (e.keyCode === MYAPP.keys.D_Key &&
            MYAPP.state === 'gameLoop') {
                MYAPP.keyDown.right = true;
        }
};

/**
 * Key press handler. Chooses the correct keyevents depending upon
 * the current state
 * Reverts the relevant MYAPP.keys in keyDown dict to false when
 * the button is released
 * @param {Number} e The key that was pressed.
 */
function keyUpEventHandler(e) {
    if (e.keyCode === MYAPP.keys.A_KEY) {
        MYAPP.keyDown.left = false;
    } else if (e.keyCode === MYAPP.keys.D_Key) {
        MYAPP.keyDown.right = false;
    }
};

/**
 * The main loop - checks the MYAPP.stateHandler and runs the appropriate loop
 */
function mainLoop() {
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
        console.log('Main loop state error: ' + MYAPP.state);
    }
};

setup();
setInterval(mainLoop, 10);
