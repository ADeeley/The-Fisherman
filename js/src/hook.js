'use strict';

const utilsModule = require('./utils.js');
const CTX = utilsModule.CTX;
const CANVAS = utilsModule.CANVAS;
const MYAPP = utilsModule.MYAPP;

let hookSprite = new Image(),
    spriteHeight = 248,
    spriteWidth = 20,
    dropped = false,
    raising = false,
    hookSz = 20,
    fishHooked = false,
    ropeLen = 20,
    x = null,
    y = CANVAS.height / 2,
    sx = 0,
    sy = spriteHeight - ropeLen;


hookSprite.src = 'img/hook.png';
/**
 * Returns the height of the hook.
 * @return {Number} The hook height.
 */
function getRopeLen() {
    return ropeLen;
}

/**
 * Sets the drop state to true;
 */
function drop() {
    dropped = true;
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
            right = MYAPP.boat.getX() + MYAPP.boat.width / 3;
            bottom = MYAPP.boat.getY() + ropeLen;
            left = MYAPP.boat.getX() + MYAPP.boat.width / 3 + hookSz;

            if (!(left < f.x || right > f.x + f.width ||
                    bottom < f.y || top > f.y + f.height)) {
                console.log('Caught one');
                f.caught = true;
                raising = true;
                fishHooked = true;
            }
        }

        for (i = 0; i < evilShoalLen; i++) {
            f = MYAPP.shoal.evilFish[i];
            top = bottom - hookSz;
            right = MYAPP.boat.getX() + MYAPP.boat.width / 3;
            bottom = MYAPP.boat.getY() + ropeLen;
            left = MYAPP.boat.getX() + MYAPP.boat.width / 3 + hookSz;

            if (!(left < f.x || right > f.x + f.width ||
                    bottom < f.y || top > f.y + f.height)) {
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
    x = MYAPP.boat.getX() + MYAPP.boat.width / 3;
    sy = spriteHeight - ropeLen;
    CTX.drawImage(hookSprite, sx, sy, spriteWidth, ropeLen, x, y,
    spriteWidth, ropeLen);
}

/**
 * Manages the hook depending upon the state of the parameters.
 */
function update() {
    /* DEBUG ====================
    let data = 'sprite height: ' + spriteHeight + ' dropped: ' + dropped + ' raising ' + raising +
    ' fishHooked ' + fishHooked + ' ropeLen ' + ropeLen;
    console.log('HookDebug: ' + data);
    */
    if (dropped) {
        draw();
        collision();
    }
    // Move the MYAPP.hook up and down
    if (ropeLen < spriteHeight && dropped && !raising) {
        ropeLen++;
        // console.log('increment height');
    } else if (dropped && raising) {
        ropeLen--;
        // console.log('decrement height');
    }

    // Raise the MYAPP.hook upon reaching the sea bed
    if (ropeLen >= CANVAS.height/2 && dropped) {
        raising = true;
    }

    // Reset the MYAPP.hook upon reaching the MYAPP.boat again
    if (ropeLen <= 20 && dropped) {
        dropped = false;
        raising = false;
        fishHooked = false;

        // Remove any caught fish from the MYAPP.shoal
        MYAPP.shoal.removeFish();
    }
};

module.exports = {
    getRopeLen: getRopeLen,
    drop: drop,
    collision: collision,
    update: update,
};
