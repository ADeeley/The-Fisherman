'use strict';

const utilsModule = require('./utils.js');
const CTX = utilsModule.CTX;
const CANVAS = utilsModule.CANVAS;
const MYAPP = utilsModule.MYAPP;


/**
 * Fish constructor function
 * @param {Number} x The X coordinate
 * @param {Number} y The Y coordinate
 * @param {Number} width The widthidth of the fish
 * @param {Number} height The height of the fish
 * @param {Image} sprite A sprite image object
 */
function Fish(x, y, width, height, sprite, species) {
    let 
        right = 1,
        left = -1;
    this.direction = 1;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.caught = false;
    this.species = species,

    this._hookedY = function() {
        return MYAPP.boat.y + MYAPP.hook.getRopeLen();
    };

    this._hookedX = function() {
        return MYAPP.boat.getX() + MYAPP.boat.width/3;
    };
    /*

    this._swim = function() {
        if (direction === right) {
            this.x++;
        } else if (direction === left) {
            this.x--;
        }
    };
    */

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
        // Swim the fish in the specified directionection
        if (this.caught) {
            this.y = this._hookedY();
            this.x = this._hookedX();
            console.log('Raising fishie!');
        } else if (MYAPP.withinCanvasBounds(this)) {
        //    this._swim();
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
