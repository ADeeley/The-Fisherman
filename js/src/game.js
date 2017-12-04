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
function Game() {
    this.score = 0;
    let largeFont = '40pt Ariel',
        mediumFont = '20pt Ariel';

    /**
     * The main MYAPP.game loop
     */
    this.startScreen = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawBackground();
        this.drawTitle();
        MYAPP.boat.draw();
    };

    this.gameLoop = function() {
        this.drawBackground();
        this.drawScore();
        MYAPP.boat.draw();
        MYAPP.boat.move();
        MYAPP.shoal.drawAll();
        MYAPP.hook.draw();
        // End the MYAPP.game if no good fish remain
        if (MYAPP.shoal.fish.length == 0) {
            MYAPP.stateToVictory();
        };
    };

    this.deathScreen = function() {
        ctx.font = largeFont;
        ctx.fillStyle = 'white';
        ctx.fillText('You died!', canvas.width/4, canvas.height/4);
        this.drawBackground();
    };

    this.victoryScreen = function() {
        ctx.font = largeFont;
        ctx.fillStyle = 'white';
        ctx.fillText('You won!', canvas.width/4, canvas.height/4);
    };

    this.drawBackground = function() {
        ctx.beginPath();
        ctx.rect(0, canvas.height/2, canvas.width, canvas.height);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();
    };

    this.drawTitle = function() {
        ctx.font = largeFont;
        ctx.fillStyle = 'white';
        ctx.fillText('The', 20, canvas.height/2 - 5);
        ctx.fillText('Fisherman', 20, (canvas.height/2) + 40);
    };

    this.drawScore = function() {
        ctx.font = mediumFont;
        ctx.fillStyle = 'white';
        ctx.fillText(this.score, 20, 40);
    };
}

module.exports = {
    Game: Game,
};
