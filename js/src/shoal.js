const utils_module = require('./utils.js'),
    Fish = require('./fish.js').Fish,
    ctx = utils_module.ctx,
    canvas = utils_module.canvas,
    MYAPP = utils_module.MYAPP;

function Shoal(n, e) {
    this.fish = [];
    this.evilFish = [];
    this.sprite = new Image();
    this.sprite.src = 'img/goldfish.png';
    this.eSprite = new Image();
    this.eSprite.src = 'img/evilfish.png';
    let i = 0;

    // Fill the fish array
    for (i; i < n; i++) {
        this.fish.push(new Fish(Math.floor(Math.random() * (canvas.width-30)),
                                Math.floor((Math.random() * (canvas.height/2-20)))
                                + canvas.height/2, 30, 20, this.sprite))
    }
    // Fill the evilFish array
    for (i = 0; i < e; i++) {
        this.evilFish.push(new Fish(Math.floor(Math.random() * (canvas.width-30)),
                                Math.floor((Math.random() * (canvas.height/2-20)))
                                + canvas.height/2, 30, 20, this.eSprite))
    }

    this.drawAll = function(){
        let i = 0;
        for (i; i < this.fish.length; i++) {
            this.fish[i].draw();
        }
        for (i = 0; i < this.evilFish.length; i++) {
            this.evilFish[i].draw();
        }
    }

    this.removeFish = function(){
    //Removes a fish from the relevant array
        let i = 0;

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