'use strict';

const utils_module = require('./utils.js'),
    Fish = require('./fish.js').Fish,
    ctx = utils_module.ctx,
    canvas = utils_module.canvas,
    MYAPP = utils_module.MYAPP;

function Shoal(n, e) {
    this.sprite = new Image();
    this.sprite.src = 'img/goldfish.png';
    this.eSprite = new Image();
    this.eSprite.src = 'img/evilfish.png';
    let i = 0,
        x = null,
        y = null,
        xDelta = canvas.width-30,
        yDelta = (canvas.height/2-20);

    this.fish = (() => {
        let fishArr = [];

        for (i; i < n; i++) {
            x = Math.floor(Math.random() * xDelta),
            y = Math.floor(Math.random() * yDelta) + canvas.height/2;
            fishArr.push(new Fish(x, y, 30, 20, this.sprite))
        }

        return fishArr;
    })();

    this.evilFish = (() => {
        let evilFishArr = [];

        for (i; i < e; i++) {
            x = Math.floor(Math.random() * xDelta),
            y = Math.floor(Math.random() * yDelta) + canvas.height/2;
            evilFishArr.push(new Fish(x, y, 30, 20, this.eSprite))
        }

        return evilFishArr;
    })();


    this.drawAll = function(){
        i = 0;
        for (i; i < this.fish.length; i++) {
            this.fish[i].draw();
        }
        for (i = 0; i < this.evilFish.length; i++) {
            this.evilFish[i].draw();
        }
    }

    this.removeFish = function(){
    //Removes a fish from the relevant array
        i = 0;

        for (i; i < this.fish.length; i++) {
            if (this.fish[i].caught) {
                this.fish.splice(i, 1);
                console.log('Sliced fish array');
                MYAPP.game.score++;
            }
        }
        for (i = 0; i < this.evilFish.length; i++) {
            if (this.evilFish[i].caught) {
                this.evilFish.splice(i, 1);
                console.log('Sliced fish array');
                MYAPP.game.score--;
            }
        }
    }
}

module.exports = {
    Shoal: Shoal,
}
