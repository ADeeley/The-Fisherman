'use strict';

const game = require('./game.js').game;
const boat = require('./boat.js').boat;
const hook = require('./hook.js').hook;
const Shoal = require('./shoal.js').Shoal;
const utilsModule = require('./utils.js');
const CTX = utilsModule.CTX;
const CANVAS = utilsModule.CANVAS;
const MYAPP = utilsModule.MYAPP;

window.addEventListener('keydown', keyDownEventHandler, false);
window.addEventListener('keyup', keyUpEventHandler, false);

/**
 * Instantiates all the game objects.
 */
function setup() {
    MYAPP.game = game;
    MYAPP.game.resetScore();
    MYAPP.boat = boat;
    MYAPP.hook = hook;
    MYAPP.shoal = new Shoal(3, 4);
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
        CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
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
