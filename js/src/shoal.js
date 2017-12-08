'use strict';

const utilsModule = require('./utils.js');
const Fish = require('./fish.js').Fish;
const CANVAS = utilsModule.CANVAS;
const MYAPP = utilsModule.MYAPP;
const seaLevel = MYAPP.seaLevel;

/**
 * Stores the evil fish array and good fish array and associated
 * methods.
 * @param {Number} numGoodFish The number of good fish required
 * @param {Number} numEvilFish The number of evil fish required
 */
let numGoodFish = 30,
    numEvilFish = 15,
    goodFishSprite = new Image(),
    evilFishSprite = new Image(),
    fish = [],
    i = 0,
    x = null,
    y = null,
    width = 30,
    height = 20,
    xDelta = CANVAS.width - width,
    yDelta = (CANVAS.height / 2 - height);

evilFishSprite.src = 'img/evilfish.png';
goodFishSprite.src = 'img/goldfish.png';

/**
 * Generates a random integer value between 0 and max.
 * @param {Number} max The maximum coordinate value
 * @return {Number} An integer coordinate.
 */
function generateRandomCoordinate(max) {
    return Math.floor(Math.random() * max);
};

/**
 * Adds fish to the fish array.
 * @param {Number} n The number of fish to populate to the array.
 * @param {Image} sprite The image to display to the canvas
 * @param {String} species The string representing the fishe's type
 */
function populateArray(n, sprite, species) {
    for (i = 0; i < n; i++) {
        x = generateRandomCoordinate(xDelta);
        y = generateRandomCoordinate(yDelta) + seaLevel;
        fish.push(new Fish(x, y, width, height, sprite, species));
    }
}
/**
 * Initialises the array with the specified number of fish.
 * Resets the array if called again.
 */
function init() {
    fish = [];
    populateArray(numGoodFish, goodFishSprite, 'good');
    populateArray(numEvilFish, evilFishSprite, 'evil');
};

/**
 * Draws all of the fish in fish array to the canvas.
 */
function drawAll() {
    for (i = 0; i < fish.length; i++) {
        fish[i].draw();
    }
};

/**
 * Removes a single fish from the fish array.
 */
function removeFish() {
    for (i = 0; i < fish.length; i++) {
        if (fish[i].caught) {
            fish.splice(i, 1);
            console.log('Sliced fish array');
            // Add check for evil fish to decrement score.
            MYAPP.game.incrementScore();
        }
    }
};

/**
 * Returns true if all the good fish in the array have been removed.
 * @return {Boolean} The result
 */
function allGoodFishCaught() {
    for (i = 0; i < fish.length; i++) {
        if (fish[i].species === 'good') {
            return false;
        }
    }
    return true;
};

/**
 * @return {Number} The length of the fish array.
 */
function getShoalLen() {
    return fish.length;
}

/**
 * @param {Number} n index of the fish required;
 * @return {Fish} The fish array.
 */
function getFish(n) {
    return fish[n];
}

module.exports = {
    init: init,
    drawAll: drawAll,
    removeFish: removeFish,
    allGoodFishCaught: allGoodFishCaught,
    getShoalLen: getShoalLen,
    getFish: getFish,

};
