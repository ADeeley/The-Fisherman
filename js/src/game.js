'use strict';

const utilsModule = require('./utils.js');
const CTX = utilsModule.CTX;
const CANVAS = utilsModule.CANVAS;
const MYAPP = utilsModule.MYAPP;
const gradient = CTX.createLinearGradient(0, CANVAS.height/2, 0, 500);
gradient.addColorStop(0, '#1658EA');
gradient.addColorStop(1, 'black');

/**
 * Game constructor function
 */
const game = {
    largeFont: '40pt Ariel',
    mediumFont: '20pt Ariel',
    score: 0,
};

game.getScore = function() {
    return game.score;
};

game.incrementScore = function() {
    game.score++;
};

game.decrementScore = function() {
    game.score--;
};

game.resetScore = function() {
    game.score = 0;
};

game.startScreen = function() {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    game.drawBackground();
    game.drawTitle();
    MYAPP.boat.draw();
};

game.gameLoop = function() {
    game.drawBackground();
    game.drawScore();
    MYAPP.boat.draw();
    MYAPP.boat.move();
    MYAPP.shoal.drawAll();
    MYAPP.hook.draw();
    // End the game if no good fish remain
    if (MYAPP.shoal.fish.length == 0) {
        MYAPP.stateToVictory();
    };
};

game.deathScreen = function() {
    CTX.font = game.largeFont;
    CTX.fillStyle = 'white';
    CTX.fillText('You died!', CANVAS.width/4, CANVAS.height/4);
    game.drawBackground();
};

game.victoryScreen = function() {
    CTX.font = game.largeFont;
    CTX.fillStyle = 'white';
    CTX.fillText('You won!', CANVAS.width/4, CANVAS.height/4);
};

game.drawBackground = function() {
    CTX.beginPath();
    CTX.rect(0, CANVAS.height/2, CANVAS.width, CANVAS.height);
    CTX.fillStyle = gradient;
    CTX.fill();
    CTX.closePath();
};

game.drawTitle = function() {
    CTX.font = game.largeFont;
    CTX.fillStyle = 'white';
    CTX.fillText('The', 20, CANVAS.height/2 - 5);
    CTX.fillText('Fisherman', 20, (CANVAS.height/2) + 40);
};

game.drawScore = function() {
    CTX.font = game.mediumFont;
    CTX.fillStyle = 'white';
    CTX.fillText(game.score, 20, 40);
};

module.exports = {
    Game: {
        getScore: game.getScore,
        incrementScore: game.incrementScore,
        decrementScore: game.decrementScore,
        resetScore: game.resetScore,
        startScreen: game.startScreen,
        gameLoop: game.gameLoop,
        deathScreen: game.deathScreen,
        victoryScreen: game.victoryScreen,
        drawBackground: game.drawBackground,
        drawTitle: game.drawTitle,
        drawScore: game.drawScore,
    },
};
