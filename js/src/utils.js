'use strict';

const collisionModule = require('./collisionDetection.js');
const CANVAS = document.getElementById('myCanvas'),
    CTX = CANVAS.getContext('2d'),
    MYAPP = {
        keyDown: {
            left: false,
            right: false,
        },
        keys: {
            SPACE: 32,
            A_KEY: 65,
            D_KEY: 68,
            LEFT_KEY: 37,
            RIGHT_KEY: 39,
        },
        state: 'startScreen',
    game: null,
    boat: null,
    hook: null,
    shoal: null,
    collisionDetected: collisionModule.collisionDetected,
};

MYAPP.stateToStartScreen = () => {
    MYAPP.state = 'startScreen';
};

MYAPP.stateToStartGame = () => {
    MYAPP.state = 'gameLoop';
};

MYAPP.stateToDeath = () => {
    MYAPP.state = 'death';
};

MYAPP.stateToVictory = () => {
    MYAPP.state = 'victory';
};

module.exports = {
    MYAPP: MYAPP,
    CANVAS: CANVAS,
    CTX: CTX,
};
