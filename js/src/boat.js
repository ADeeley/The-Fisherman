'use strict';
const utilsModule = require('./utils.js');
const CTX = utilsModule.CTX;
const CANVAS = utilsModule.CANVAS;
const MYAPP = utilsModule.MYAPP;

/**
 *  Constructor function for the boat object.
 * @return {Boat} A boat object with only public properties and methods
 * visible.
 */
const boat = (function() {
    let x = CANVAS.width/2,
        y = CANVAS.height/2,
        speed = 3,
        width = 50,
        height = 30,
        left = -1,
        right = 1,
        // -1 represents left, 1 represents right
        direction = left,
        // Boat sprite setup
        boatSprite = new Image();
        boatSprite.src = 'img/boat.png';

    /**
     * Getter for the speed of the boat,
     * @return {Number} The speed of the boat.
     */
    function getSpeed() {
        return speed;
    }
    /**
     * Getter for the x coordinate of the boat,
     * @return {Number} The x coordinate of the boat.
     */
    function getX() {
        return x;
    }
    /**
     * Getter for the y coordinate of the boat,
     * @return {Number} The y coordinate of the boat.
     */
    function getY() {
        return y;
    }
    /**
     * Draws the boat to the CANVAS.
     */
    function draw() {
        if (direction === left) {
            // Draw left sprite
            CTX.drawImage(boatSprite, 0, 0, width, height,
                    x, y - height, width, height);
        } else if (direction === right) {
            // Draw right sprite
            CTX.drawImage(boatSprite, 50, 0, width, height,
                    x, y - height, width, height);
        }
    };

    /**
     * Moves the boat in the direction dictated by the arrow keys.
     */
    function move() {
        if (MYAPP.keyDown.left && x >= 0) {
        x--;
        // console.log('left');
            if (direction !== left) {
                direction = left;
            }
        } else if (MYAPP.keyDown.right && x <= CANVAS.width - width) {
        x++;
            if (direction !== right) {
                direction = right;
            }
        }
    };

    return {
        getX: getX,
        getY: getY,
        speed: speed,
        width: width,
        height: height,
        direction: direction,
        getSpeed: getSpeed,
        draw: draw,
        move: move,
        boatSprite: boatSprite,
    };
})();

module.exports = {
    boat: boat,
};
