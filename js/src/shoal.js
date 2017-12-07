'use strict';

const utilsModule = require('./utils.js');
const Fish = require('./fish.js').Fish;
const CANVAS = utilsModule.CANVAS;
const MYAPP = utilsModule.MYAPP;

/**
 * Stores the evil fish array and good fish array and associated
 * methods.
 * @param {Number} numGoodFish The number of good fish required
 * @param {Number} numEvilFish The number of evil fish required
 */
function Shoal(numGoodFish, numEvilFish) {
    let goodFishSprite = new Image(),
        evilFishSprite = new Image(),
        i = 0,
        x = null,
        y = null,
        width = 30,
        height = 20,
        xDelta = CANVAS.width-30,
        yDelta = (CANVAS.height/2-20);

    evilFishSprite.src = 'img/evilfish.png';
    goodFishSprite.src = 'img/goldfish.png';

    this.fish = (() => {
        let fishArr = [];

        for (i; i < numGoodFish; i++) {
            x = Math.floor(Math.random() * xDelta),
            y = Math.floor(Math.random() * yDelta) + CANVAS.height/2;
            fishArr.push(new Fish(x, y, width, height, goodFishSprite, 'good'));
        }

        for (i; i < numEvilFish; i++) {
            x = Math.floor(Math.random() * xDelta),
            y = Math.floor(Math.random() * yDelta) + CANVAS.height/2;
            fishArr.push(new Fish(x, y, width, height, evilFishSprite, 'evil'));
        }

        return fishArr;
    })();

    this.drawAll = () => {
        for (i = 0; i < this.fish.length; i++) {
            this.fish[i].draw();
        }
    };

    this.removeFish = () => {
        for (i = 0; i < this.fish.length; i++) {
            if (this.fish[i].caught) {
                this.fish.splice(i, 1);
                console.log('Sliced fish array');
                // Add check for evil fish to decrement score.
                MYAPP.game.incrementScore();
            }
        }
    };
    this.allGoodFishCaught = () => {
        for (i = 0; i < this.fish.length; i++) {
            if (this.fish[i].species === 'good') {
                return false;
            }
        }
        return true;
    };
}


module.exports = {
    Shoal: Shoal,
};
