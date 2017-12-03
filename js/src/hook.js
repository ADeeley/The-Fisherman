const utils_module = require('./utils.js')
    ctx = utils_module.ctx,
    canvas = utils_module.canvas,
    MYAPP = utils_module.MYAPP;

function Hook() {
    this.hookSprite = new Image();
    this.hookSprite.src = 'img/hook.png';
    this.dropped = false;
    this.raising = false;
    this.spriteHeight = 248;
    this.hookSz = 20;
    this.fishHooked = false;
    this.height = 20;
    
    this.drop = function(){
        this.dropped = true;
    }
        
    this.collision = function() {
        let i = 0,
        f = null,
        tip = null,
        top = null,
        right = null, 
        bottom = null,
        left = null,
        shoalLen = MYAPP.shoal.fish.length;
        evilShoalLen = MYAPP.shoal.evilFish.length;

        if (!this.fishHooked) {
            for (i; i < shoalLen; i++) {
                f = MYAPP.shoal.fish[i];
                top = bottom - this.hookSz;
                right = MYAPP.boat.x + MYAPP.boat.w / 3;
                bottom = MYAPP.boat.y + this.height;
                left = MYAPP.boat.x + MYAPP.boat.w / 3 + this.hookSz;

                if (!(left < f.x || right > f.x + f.w || bottom < f.y || top > f.y + f.h)) {
                    console.log('Caught one');
                    f.caught = true;
                    this.raising = true;
                    this.fishHooked = true;
                }
            }
            for (i = 0; i < MYAPP.shoal.evilFish.length; i++) {
                f = MYAPP.shoal.evilFish[i];
                top = bottom - this.hookSz;
                right = MYAPP.boat.x + MYAPP.boat.w / 3;
                bottom = MYAPP.boat.y + this.height;
                left = MYAPP.boat.x + MYAPP.boat.w / 3 + this.hookSz;

                if (!(left < f.x || right > f.x + f.w || bottom < f.y || top > f.y + f.h)) {
                    console.log('Caught one');
                    f.caught = true;
                    this.raising = true;
                    this.fishHooked = true;
                }
            }
        }
    }
    this.draw = function(){
        if (this.dropped) {
            ctx.drawImage(this.hookSprite, 0, this.spriteHeight - this.height, 20, 
                          this.height, MYAPP.boat.x + MYAPP.boat.w / 3, MYAPP.boat.y, 20, this.height);
            MYAPP.hook.collision();
        }
        // Move the MYAPP.hook up and down
        if (this.height < this.spriteHeight && this.dropped && !this.raising) {
            this.height++;
            //console.log('increment height');
        } else if (this.dropped && this.raising) {
            this.height--;
            //console.log('decrement height');
        }
        
        // Raise the MYAPP.hook upon reaching the sea bed
        if (this.height >= canvas.height/2 && this.dropped) {
            this.raising = true;
        }

        // Reset the MYAPP.hook upon reaching the MYAPP.boat again
        if (this.height <= 0 && this.dropped) {
            this.dropped = false;
            this.raising = false;
            this.fishHooked = false;

            // Remove any caught fish from the MYAPP.shoal
            MYAPP.shoal.removeFish();
        }
    }
}

module.exports = {
    Hook: Hook,
}