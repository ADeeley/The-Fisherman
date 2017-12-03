'use strict';

const utils_module = require('./utils.js'),
    ctx = utils_module.ctx,
    canvas = utils_module.canvas,
    MYAPP = utils_module.MYAPP;

function Fish(x, y, w, h, sprite) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h; 
    this.sprite = sprite;
    this.dir = 1;
    this.caught = false;

    this.move = function() {
        // Swim the fish in the specified direction
        if (this.caught) {
            this.y = MYAPP.boat.y + MYAPP.hook.height; 
            this.x = MYAPP.boat.x + MYAPP.boat.w/3;
            console.log('Raising fishie!');
        }
        if (this.x >= 0 && this.x <= canvas.width - this.w) {
            if (this.dir === 1) {
                this.x++;
            } else if (this.dir === -1) {
                this.x--;
            }

            // Randomly change direction
            if (Math.random() > 0.99) {
                this.dir *= -1;
            }
        } else {
            this.dir *= -1;
            if (this.dir === 1) {
                this.x += 2;
            } else if (this.dir === -1) {
                this.x -= 2;
            }
        }
    }

    this.draw = function() {
        if (this.dir === 1) {
            ctx.drawImage(this.sprite, this.w, 0, this.w, this.h, this.x, this.y, 
                          this.w, this.h);
        } else {
            ctx.drawImage(this.sprite, 0, 0, this.w, this.h, this.x, this.y, 
                          this.w, this.h);
        }
        this.move();
    }
}

module.exports = {
    Fish: Fish,
}