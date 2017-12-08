'use strict';

const utilsModule = require('./utils.js');
const CTX = utilsModule.CTX;
const CANVAS = utilsModule.CANVAS;
const MYAPP = utilsModule.MYAPP;
const left = MYAPP.left;
const right = MYAPP.right;

/**
 * Fish constructor function
 * @param {Number} x The X coordinate
 * @param {Number} y The Y coordinate
 * @param {Number} width The widthidth of the fish
 * @param {Number} height The height of the fish
 * @param {Image} sprite A sprite image object
 * @param {String} species The species of the fish
 */
function Fish(x, y, width, height, sprite, species) {
    this.direction = 1;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.caught = false;
    this.species = species,

    this._followHookCoordinates = function() {
        this.y = MYAPP.boat.y + MYAPP.hook.getRopeLen();
        this.x = MYAPP.boat.getX() + MYAPP.boat.width/3;
    };

    this._randomDirectionChange = function() {
        if (this.x < 5 || this.x > CANVAS.width - 6) {
            return;
        }
        if (Math.random() > 0.99) {
            this.direction *= left;
        }
    };

    this._aboutTurn = function() {
        if (this.direction === right) {
            this.x--;
            this.direction = left;
        } else if (this.direction === left) {
            this.x++;
            this.direction = right;
        }
    };

    this.move = () => {
        if (this.caught) {
            this._followHookCoordinates();
            console.log('Raising fishie!');
        } else if (MYAPP.withinCanvasBounds(this)) {
            MYAPP.moveInGivenDirection(this, this.direction);
            this._randomDirectionChange();
        } else {
            this._aboutTurn();
        }
    };

    this.draw = () => {
        if (this.direction === right) {
            CTX.drawImage(sprite, this.width, 0, this.width, this.height, this.x, this.y,
                          this.width, this.height);
        } else {
            CTX.drawImage(sprite, 0, 0, this.width, this.height, this.x, this.y,
                          this.width, this.height);
        }
        this.move();
    };
}

module.exports = {
    Fish: Fish,
};
