const utils_module = require('./utils.js'),
    ctx = utils_module.ctx,
    canvas = utils_module.canvas,
    MYAPP = utils_module.MYAPP;

/**
 *  Constructor function for the boat object.
 */
function Boat() {
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    this.speed = 3;
    this.w = 50;
    this.h = 30;
    // 0 represents left, 1 represents right
    this.direction = 0;
    // Boat sprite setup
    this.boatSprite = new Image();
    this.boatSprite.src = 'img/boat.png';

    this.draw = function() {
        if (this.direction === 0) {
            // Draw left sprite
            ctx.drawImage(this.boatSprite, 0, 0, this.w, this.h, this.x, this.y - this.h, this.w, this.h);
        } else if (this.direction === 1) {
            // Draw right sprite
            ctx.drawImage(this.boatSprite, 50, 0, this.w, this.h, this.x, this.y - this.h, this.w, this.h);
        }
    }
    this.move = function() {
        if (MYAPP.keyDown.left && this.x >= 0) {
        this.x--;
        // console.log('left');
            if (this.direction !== 0) {
                this.direction = 0;
            }
        } else if (MYAPP.keyDown.right && this.x <= canvas.width - this.w) {
        this.x++;
            if (this.direction !== 1) {
                this.direction = 1;
            }
        }
    }
}

module.exports = {
    Boat: Boat,
}

