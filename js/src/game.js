'use strict';

const utilsModule = require('./utils.js');
const ctx = utilsModule.ctx;
const canvas = utilsModule.canvas;
const MYAPP = utilsModule.MYAPP;
const gradient = ctx.createLinearGradient(0, canvas.height/2, 0, 500);
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

game.startScreen = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    ctx.font = game.largeFont;
    ctx.fillStyle = 'white';
    ctx.fillText('You died!', canvas.width/4, canvas.height/4);
    game.drawBackground();
};

game.victoryScreen = function() {
    ctx.font = game.largeFont;
    ctx.fillStyle = 'white';
    ctx.fillText('You won!', canvas.width/4, canvas.height/4);
};

game.drawBackground = function() {
    ctx.beginPath();
    ctx.rect(0, canvas.height/2, canvas.width, canvas.height);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.closePath();
};

game.drawTitle = function() {
    ctx.font = game.largeFont;
    ctx.fillStyle = 'white';
    ctx.fillText('The', 20, canvas.height/2 - 5);
    ctx.fillText('Fisherman', 20, (canvas.height/2) + 40);
};

game.drawScore = function() {
    ctx.font = game.mediumFont;
    ctx.fillStyle = 'white';
    ctx.fillText(game.score, 20, 40);
};

module.exports = {
    Game: {
        getScore: game.getScore,
        incrementScore: game.incrementScore,
        decrementScore: game.decrementScore,
        startScreen: game.startScreen,
        gameLoop: game.gameLoop,
        deathScreen: game.deathScreen,
        victoryScreen: game.victoryScreen,
        drawBackground: game.drawBackground,
        drawTitle: game.drawTitle,
        drawScore: game.drawScore,
    },
};
