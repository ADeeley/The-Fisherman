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
const Boat = (function() {
    let x = CANVAS.width/2,
        y = CANVAS.height/2,
        speed = 3,
        w = 50,
        h = 30,
        // 0 represents left, 1 represents right
        direction = 0,
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
        if (direction === 0) {
            // Draw left sprite
            CTX.drawImage(boatSprite, 0, 0, w, h,
                    x, y - h, w, h);
        } else if (direction === 1) {
            // Draw right sprite
            CTX.drawImage(boatSprite, 50, 0, w, h,
                    x, y - h, w, h);
        }
    };

    /**
     * Moves the boat in the direction dictated by the arrow keys.
     */
    function move() {
        if (MYAPP.keyDown.left && x >= 0) {
        x--;
        // console.log('left');
            if (direction !== 0) {
                direction = 0;
            }
        } else if (MYAPP.keyDown.right && x <= CANVAS.width - w) {
        x++;
            if (direction !== 1) {
                direction = 1;
            }
        }
    };

    return {
        getX: getX,
        getY: getY,
        speed: speed,
        w: w,
        h: h,
        direction: direction,
        getSpeed: getSpeed,
        draw: draw,
        move: move,
        boatSprite: boatSprite,
    };
})();

module.exports = {
    Boat: Boat,
};
