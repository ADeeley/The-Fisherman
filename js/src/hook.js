'use strict';

const utils_module = require('./utils.js'),
    ctx = utils_module.ctx,
    canvas = utils_module.canvas,
    MYAPP = utils_module.MYAPP;

function Hook() {
    let hookSprite = new Image(),
        spriteHeight = 248,
        dropped = false,
        raising = false,
        hookSz = 20,
        fishHooked = false,
        height = 20;

    hookSprite.src = 'img/hook.png';
    
    this.drop = function(){
        dropped = true;
    }
        
    this.collision = function() {
        let i = 0,
            f = null,
            tip = null,
            top = null,
            right = null, 
            bottom = null,
            left = null,
            shoalLen = MYAPP.shoal.fish.length,
            evilShoalLen = MYAPP.shoal.evilFish.length;

        // Make a callback function to return true if the critereon are fulfilled
        if (!fishHooked) {
            for (i; i < shoalLen; i++) {
                f = MYAPP.shoal.fish[i];
                top = bottom - hookSz;
                right = MYAPP.boat.x + MYAPP.boat.w / 3;
                bottom = MYAPP.boat.y + height;
                left = MYAPP.boat.x + MYAPP.boat.w / 3 + hookSz;

                if (!(left < f.x || right > f.x + f.w || bottom < f.y || top > f.y + f.h)) {
                    console.log('Caught one');
                    f.caught = true;
                    raising = true;
                    fishHooked = true;
                }
            }
            for (i = 0; i < MYAPP.shoal.evilFish.length; i++) {
                f = MYAPP.shoal.evilFish[i];
                top = bottom - hookSz;
                right = MYAPP.boat.x + MYAPP.boat.w / 3;
                bottom = MYAPP.boat.y + height;
                left = MYAPP.boat.x + MYAPP.boat.w / 3 + hookSz;

                if (!(left < f.x || right > f.x + f.w || bottom < f.y || top > f.y + f.h)) {
                    console.log('Caught one');
                    f.caught = true;
                    raising = true;
                    fishHooked = true;
                }
            }
        }
    }
    this.draw = function(){
        if (dropped) {
            ctx.drawImage(hookSprite, 0, spriteHeight - height, 20, 
                          height, MYAPP.boat.x + MYAPP.boat.w / 3, MYAPP.boat.y, 20, height);
            MYAPP.hook.collision();
        }
        // Move the MYAPP.hook up and down
        if (height < spriteHeight && dropped && !raising) {
            height++;
            //console.log('increment height');
        } else if (dropped && raising) {
            height--;
            //console.log('decrement height');
        }
        
        // Raise the MYAPP.hook upon reaching the sea bed
        if (height >= canvas.height/2 && dropped) {
            raising = true;
        }

        // Reset the MYAPP.hook upon reaching the MYAPP.boat again
        if (height <= 0 && dropped) {
            dropped = false;
            raising = false;
            fishHooked = false;

            // Remove any caught fish from the MYAPP.shoal
            MYAPP.shoal.removeFish();
        }
    }
}

module.exports = {
    Hook: Hook,
}