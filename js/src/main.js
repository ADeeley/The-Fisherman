'use strict';

const debugModule = require('./debugControls.js');
const game = require('./game.js');
const boat = require('./boat.js');
const hook = require('./hook.js');
const shoal = require('./shoal.js');
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
    MYAPP.boat = boat;
    MYAPP.hook = hook;
    MYAPP.shoal = shoal;
    MYAPP.shoal.init();
};

/**
 * Key press handler. Chooses the correct keyevents depending upon
 * the current state
 * @param {Number} e The key that was pressed.
 */
function keyDownEventHandler(e) {
    switch (e.keyCode) {
    case MYAPP.keys.SPACE:
        switch (MYAPP.state) {
        case 'startScreen':
            MYAPP.game.resetScore();
            MYAPP.shoal.init();
            MYAPP.stateToStartGame();
            break;
        case 'gameLoop':
            MYAPP.hook.drop();
            break;
        case 'victory':
            MYAPP.stateToStartScreen();
            break;
        }
        break;
    case MYAPP.keys.A_KEY:
            MYAPP.keyDown.left = true;
        break;
    case MYAPP.keys.D_KEY:
            MYAPP.keyDown.right = true;
        break;
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
    switch (e.keyCode) {
    case MYAPP.keys.A_KEY:
        MYAPP.keyDown.left = false;
        break;
    case MYAPP.keys.D_KEY:
        MYAPP.keyDown.right = false;
        break;
    }
};

/**
 * Handles the in game functions and draws everything to the canvas.
 */
function gameLoop() {
    MYAPP.game.drawBackground();
    MYAPP.game.drawScore();
    MYAPP.boat.draw();
    MYAPP.boat.move();
    MYAPP.shoal.drawAll();
    MYAPP.hook.update();
    // End the game if no good fish remain
    if (MYAPP.shoal.allGoodFishCaught()) {
        MYAPP.stateToVictory();
    };
};

/**
 * The main loop - checks the MYAPP.stateHandler and runs the appropriate loop
 */
function mainLoop() {
    switch (MYAPP.state) {
    case 'startScreen':
        MYAPP.game.startScreen();
        break;
    case 'gameLoop':
        CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
        gameLoop();
        break;
    case 'death':
        MYAPP.game.deathScreen();
        break;
    case 'victory':
        MYAPP.game.victoryScreen();
        break;
    default:
        console.log('Main loop state error: ' + MYAPP.state);
    }
};

setup();
setInterval(mainLoop, 10);
