'use strict';

const utilsModule = require('./utils.js');
const ctx = utilsModule.ctx;
const canvas = utilsModule.canvas;
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
    let dir = 1;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.caught = false;

    this.move = function() {
        // Swim the fish in the specified direction
        if (this.caught) {
            this.y = MYAPP.boat.y + MYAPP.hook.height;
            this.x = MYAPP.boat.x + MYAPP.boat.w/3;
            console.log('Raising fishie!');
        }
        if (this.x >= 0 && this.x <= canvas.width - this.w) {
            if (dir === 1) {
                this.x++;
            } else if (dir === -1) {
                this.x--;
            }

            // Randomly change direction
            if (Math.random() > 0.99) {
                dir *= -1;
            }
        } else {
            dir *= -1;
            if (dir === 1) {
                this.x += 2;
            } else if (dir === -1) {
                this.x -= 2;
            }
        }
    };

    this.draw = function() {
        if (dir === 1) {
            ctx.drawImage(sprite, this.w, 0, this.w, this.h, this.x, this.y,
                          this.w, this.h);
        } else {
            ctx.drawImage(sprite, 0, 0, this.w, this.h, this.x, this.y,
                          this.w, this.h);
        }
        this.move();
    };
}

module.exports = {
    Fish: Fish,
};
