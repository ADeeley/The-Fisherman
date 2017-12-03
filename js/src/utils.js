const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const MYAPP = {
    keyDown: {
        left: false,
        right: false,
    },
    keys: {
        SPACE: 32,
        A_KEY: 65,
        D_Key: 68,
        LEFT_KEY: 37,
        RIGHT_KEY: 39
    },
    state: 'startScreen',
    game: null,
    boat: null, 
    hook: null,
    shoal: null
}

MYAPP.stateToStartScreen = function() {
    MYAPP.state = 'startScreen';
}

MYAPP.stateToStartGame = function() {
    MYAPP.state = 'gameLoop';
}

MYAPP.stateToDeath = function() {
    MYAPP.state = 'death';
}

MYAPP.stateToVictory = function() {
    MYAPP.state = 'victory';
}

module.exports = {
    MYAPP: MYAPP,
    canvas: canvas,
    ctx: ctx,
}
