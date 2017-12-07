'use strict';
const utilsModule = require('./utils.js'),
CTX = utilsModule.CTX,
CANVAS = utilsModule.CANVAS,
MYAPP = utilsModule.MYAPP;

let x = CANVAS.width/2,
    y = CANVAS.height/2,
    speed = 3,
    width = 50,
    height = 30,
    // 0 represents left, 1 represents right
    direction = 0,
// Boat sprite setup
boatSprite = new Image();
boatSprite.src = 'img/boat.png';

/**
 * Provides X as a reference, instead of a number literal.
 * @return {Number} The x coordinate of boat.
 */
function getX() {
    return x;
}
/**
 * Draws the boat to the CANVAS.
 */
function draw() {
    if (direction === 0) {
        // Draw left sprite
        CTX.drawImage(boatSprite, 0, 0, width, height, x, y - height, width, height);
    } else if (direction === 1) {
        // Draw right sprite
        CTX.drawImage(boatSprite, 50, 0, width, height, x, y - height, width, height);
    }
}

/**
 * Moves the boat around the screen according to the direction and
 * buttons pressed.
 */
function move() {
    if (MYAPP.keyDown.left && x >= 0) {
    x--;
    // console.log('left');
        if (direction !== 0) {
            direction = 0;
        }
    } else if (MYAPP.keyDown.right && x <= CANVAS.width - width) {
    x++;
        if (direction !== 1) {
            direction = 1;
        }
    }
}

module.exports = {
    getX: getX,
    y: y,
    width: width,
    height: height,
    draw: draw,
    move: move,
};
