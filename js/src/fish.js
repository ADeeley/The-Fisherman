'use strict';

const utilsModule = require('./utils.js');
const CTX = utilsModule.CTX;
const CANVAS = utilsModule.CANVAS;
const MYAPP = utilsModule.MYAPP;

/**
 * Fish constructor function
 * @param {Number} x The X coordinate
 * @param {Number} y The Y coordinate
 * @param {Number} w The width of the fish
 * @param {Number} h The height of the fish
 * @param {Image} sprite A sprite image object
 */
function Fish(x, y, w, h, sprite) {
    let direction = 1,
        right = 1,
        left = -1,
        speed = 2;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.caught = false;

    this.move = () => {
        // Swim the fish in the specified directionection
        if (this.caught) {
            this.y = MYAPP.boat.getY() + MYAPP.hook.getHeight();
            this.x = MYAPP.boat.getX() + MYAPP.boat.width/3;
            console.log('Raising fishie!');
        }
        if (this.x >= 0 && this.x <= CANVAS.width - this.w) {
            if (direction === right) {
                this.x++;
            } else if (direction === left) {
                this.x--;
            }

            // Randomly change directionection
            if (Math.random() > 0.99) {
                direction *= left;
            }
        } else {
            direction *= left;
            if (direction === right) {
                this.x += speed;
            } else if (direction === left) {
                this.x -= speed;
            }
        }
    };

    this.draw = () => {
        if (direction === 1) {
            CTX.drawImage(sprite, this.w, 0, this.w, this.h, this.x, this.y,
                          this.w, this.h);
        } else {
            CTX.drawImage(sprite, 0, 0, this.w, this.h, this.x, this.y,
                          this.w, this.h);
        }
        this.move();
    };
}

module.exports = {
    Fish: Fish,
};
