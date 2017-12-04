'use strict';

const utilsModule = require('./utils.js');
const CTX = utilsModule.CTX;
const CANVAS = utilsModule.CANVAS;
const MYAPP = utilsModule.MYAPP;

/**
 * Hook constructor function.
 */
const hook = (function() {
    let hookSprite = new Image(),
        spriteHeight = 248,
        dropped = false,
        raising = false,
        hookSz = 20,
        fishHooked = false,
        height = 20;

    hookSprite.src = 'img/hook.png';

    /**
     * Returns the height of the hook.
     * @return {Number} The hook height.
     */
    function getHeight() {
        return height;
    }

    /**
     * Sets the drop state to true;
     */
    function drop() {
        dropped = true;
    };

    /**
     * Get the current dropping state of the hook.
     * @return {Boolean} the raising state of the hook.
     */
    function hasDropped() {
        return dropped;
    };

    /**
     * Get the current raising state of the hook.
     * @return {Boolean} the raising state of the hook.
     */
    function isRaising() {
        return raising;
    };

    /**
     * Returns true if the hook has caught a fish
     * @return {Boolean} If a fish has been hooked.
     */
    function hasHookedFish() {
        return fishHooked;
    };

    /**
     * Handles the collision detection for hook.
     */
    function collision() {
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
                right = MYAPP.boat.getX() + MYAPP.boat.w / 3;
                bottom = MYAPP.boat.getY() + height;
                left = MYAPP.boat.getX() + MYAPP.boat.w / 3 + hookSz;

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
                right = MYAPP.boat.getX() + MYAPP.boat.w / 3;
                bottom = MYAPP.boat.getY() + height;
                left = MYAPP.boat.getX() + MYAPP.boat.w / 3 + hookSz;

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

    /**
     * Draws the hook to the canvas.
     */
    function draw() {
        if (dropped) {
            console.log('Boat x where it matters: ' + MYAPP.boat.getY());
            CTX.drawImage(hookSprite, 0, spriteHeight - height, 20,
                          height, MYAPP.boat.getX() + MYAPP.boat.w / 3,
                          MYAPP.boat.getY(), 20, height);
            MYAPP.hook.collision();
        }
        // Move the MYAPP.hook up and down
        if (height < spriteHeight && dropped && !raising) {
            height++;
            // console.log('increment height');
        } else if (dropped && raising) {
            height--;
            // console.log('decrement height');
        }

        // Raise the MYAPP.hook upon reaching the sea bed
        if (height >= CANVAS.height/2 && dropped) {
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
    };

    return {
        hookSprite: hookSprite,
        spriteHeight: spriteHeight,
        hasDropped: hasDropped,
        isRaising: isRaising,
        hookSz: hookSz,
        hasHookedFish: hasHookedFish,
        getHeight: getHeight,
        drop: drop,
        hasDropped: hasDropped,
        isRaising: isRaising,
        collision: collision,
        draw: draw,
    };
})();

module.exports = {
    hook: hook,
};
