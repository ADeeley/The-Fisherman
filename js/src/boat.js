'use strict';
const utilsModule = require('./utils.js'),
CTX = utilsModule.CTX,
CANVAS = utilsModule.CANVAS,
MYAPP = utilsModule.MYAPP;
const left = MYAPP.left;
const right = MYAPP.right;

// Boat sprite setup


let boat = {
    x: CANVAS.width/2,
    y: CANVAS.height/2,
    speed: 3,
    width: 50,
    height: 30,
    // 0 represents left, 1 represents right
    direction: left,
    },
    boatSprite = new Image();

boatSprite.src = 'img/boat.png';
/**
 * Provides X as a reference, instead of a number literal.
 * @return {Number} The x coordinate of boat.
 */
function getX() {
    return boat.x;
}
/**
 * Draws the boat to the CANVAS.
 */
function draw() {
    if (boat.direction === left) {
        // Draw left sprite
        CTX.drawImage(boatSprite, 0, 0, boat.width, boat.height,
            boat.x, boat.y - boat.height, boat.width, boat.height);
    } else if (boat.direction === right) {
        // Draw right sprite
        CTX.drawImage(boatSprite, 50, 0, boat.width, boat.height, 
            boat.x, boat.y - boat.height, boat.width, boat.height);
    }
}

/**
 * Moves the boat around the screen according to the direction and
 * buttons pressed.
 */
function move() {
    if (MYAPP.keyDown.left) {
        if (boat.direction !== left) {
            boat.direction = left;
        }
        MYAPP.moveInGivenDirection(boat, boat.direction);
    } else if (MYAPP.keyDown.right) {
        if (boat.direction !== right) {
            boat.direction = right;
        }
        MYAPP.moveInGivenDirection(boat, boat.direction);
    }
}

module.exports = {
    getX: getX,
    y: boat.y,
    width: boat.width,
    height: boat.height,
    draw: draw,
    move: move,
};
