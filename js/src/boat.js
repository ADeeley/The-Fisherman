'use strict';
const utilsModule = require('./utils.js'),
CTX = utilsModule.CTX,
CANVAS = utilsModule.CANVAS,
MYAPP = utilsModule.MYAPP;
const left = -1;
const right = 1;

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
        CTX.drawImage(boatSprite, 50, 0, boat.width, boat.height, boat.x, boat.y - boat.height, boat.width, boat.height);
    }
}

/**
 * Moves the boat around the screen according to the direction and
 * buttons pressed.
 */
function move() {
    if (MYAPP.withinCanvasBounds(boat)) {
        if (MYAPP.keyDown.left) {
            if (boat.direction !== left) {
                boat.direction = left;
            }
            boat.x--;
        } else if (MYAPP.keyDown.right) {
            if (boat.direction !== right) {
                boat.direction = right;
            }
            boat.x++;
        }
    }
    /*
    if (MYAPP.keyDown.left && boat.x >= 0) {
    boat.x--;
    // console.log('left');
        if (boat.direction !== 0) {
            boat.direction = 0;
        }
    } else if (MYAPP.keyDown.right && boat.x <= CANVAS.width - boat.width) {
    boat.x++;
        if (boat.direction !== 1) {
            boat.direction = 1;
        }
    }
    */
}

module.exports = {
    getX: getX,
    y: boat.y,
    width: boat.width,
    height: boat.height,
    draw: draw,
    move: move,
};
