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
const game = (function() {
    let largeFont = '40pt Ariel',
        mediumFont = '20pt Ariel',
        score = 0;

    /**
     * Getter for the score.
     * @return {Number} the current score.
     */
    function getScore() {
        return score;
    };

    /**
     * Increments the score.
     */
    function incrementScore() {
        score++;
    };

    /**
     * Decrements the score.
     */
    function decrementScore() {
        score--;
    };

    /**
     * Resets the score to 0.
     */
    function resetScore() {
        score = 0;
    };

    /**
     * Draws the startScreen to the canvas.
     */
    function startScreen() {
        CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
        drawBackground();
        drawTitle();
        MYAPP.boat.draw();
    };

    /**
     * Draws the death screen to the canvas.
     */
    function deathScreen() {
        CTX.font = largeFont;
        CTX.fillStyle = 'white';
        CTX.fillText('You died!', CANVAS.width/4, CANVAS.height/4);
        drawBackground();
    };

    /**
     * Draws the victory screen to the canvas.
     */
    function victoryScreen() {
        CTX.font = largeFont;
        CTX.fillStyle = 'white';
        CTX.fillText('You won!', CANVAS.width/4, CANVAS.height/4);
    };

    /**
     * Draws the standard background to the canvas.
     */
    function drawBackground() {
        CTX.beginPath();
        CTX.rect(0, CANVAS.height/2, CANVAS.width, CANVAS.height);
        CTX.fillStyle = gradient;
        CTX.fill();
        CTX.closePath();
    };

    /**
     * Draws the title to the canvas.
     */
    function drawTitle() {
        CTX.font = largeFont;
        CTX.fillStyle = 'white';
        CTX.fillText('The', 20, CANVAS.height/2 - 5);
        CTX.fillText('Fisherman', 20, (CANVAS.height/2) + 40);
    };

    /**
     * Draws the score to the canvas.
     */
    function drawScore() {
        CTX.font = mediumFont;
        CTX.fillStyle = 'white';
        CTX.fillText(score, 20, 40);
    };

    return {
        getScore: getScore,
        incrementScore: incrementScore,
        decrementScore: decrementScore,
        resetScore: resetScore,
        startScreen: startScreen,
        deathScreen: deathScreen,
        victoryScreen: victoryScreen,
        drawBackground: drawBackground,
        drawTitle: drawTitle,
        drawScore: drawScore,
    };
})();

module.exports = {
    game: game,
};
