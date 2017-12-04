'use strict';

const utilsModule = require('./utils.js');
const ctx = utilsModule.ctx;
const canvas = utilsModule.canvas;
const MYAPP = utilsModule.MYAPP;

/**
 * Hook constructor function.
 */
function Hook() {
    let hookSprite = new Image(),
        spriteHeight = 248,
        dropped = false,
        raising = false,
        hookSz = 20,
        fishHooked = false;

    this.height = 20;
    hookSprite.src = 'img/hook.png';

    this.drop = function() {
        dropped = true;
    };

    this.collision = function() {
        let i = 0,
            f = null,
            top = null,
            right = null,
            bottom = null,
            left = null,
            shoalLen = MYAPP.shoal.fish.length,
            evilShoalLen = MYAPP.shoal.evilFish.length;

        // Make a callback function to return true
        if (!fishHooked) {
            for (i; i < shoalLen; i++) {
                f = MYAPP.shoal.fish[i];
                top = bottom - hookSz;
                right = MYAPP.boat.x + MYAPP.boat.w / 3;
                bottom = MYAPP.boat.y + this.height;
                left = MYAPP.boat.x + MYAPP.boat.w / 3 + hookSz;

                if (!(left < f.x || right > f.x + f.w ||
                     bottom < f.y || top > f.y + f.h)) {
                    console.log('Caught one');
                    f.caught = true;
                    raising = true;
                    fishHooked = true;
                }
            }

            for (i = 0; i < evilShoalLen; i++) {
                f = MYAPP.shoal.evilFish[i];
                top = bottom - hookSz;
                right = MYAPP.boat.x + MYAPP.boat.w / 3;
                bottom = MYAPP.boat.y + this.height;
                left = MYAPP.boat.x + MYAPP.boat.w / 3 + hookSz;

                if (!(left < f.x || right > f.x + f.w ||
                     bottom < f.y || top > f.y + f.h)) {
                    console.log('Caught one');
                    f.caught = true;
                    raising = true;
                    fishHooked = true;
                }
            }
        }
    };

    this.draw = function() {
        if (dropped) {
            ctx.drawImage(hookSprite, 0, spriteHeight - this.height, 20,
                          this.height, MYAPP.boat.x + MYAPP.boat.w / 3,
                          MYAPP.boat.y, 20, this.height);
            MYAPP.hook.collision();
        }
        // Move the MYAPP.hook up and down
        if (this.height < spriteHeight && dropped && !raising) {
            this.height++;
            // console.log('increment height');
        } else if (dropped && raising) {
            this.height--;
            // console.log('decrement height');
        }

        // Raise the MYAPP.hook upon reaching the sea bed
        if (this.height >= canvas.height/2 && dropped) {
            raising = true;
        }

        // Reset the MYAPP.hook upon reaching the MYAPP.boat again
        if (this.height <= 0 && dropped) {
            dropped = false;
            raising = false;
            fishHooked = false;

            // Remove any caught fish from the MYAPP.shoal
            MYAPP.shoal.removeFish();
        }
    };
}

module.exports = {
    Hook: Hook,
};
