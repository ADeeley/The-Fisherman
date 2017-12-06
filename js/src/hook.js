'use strict';

const utilsModule = require('./utils.js');
const CTX = utilsModule.CTX;
const CANVAS = utilsModule.CANVAS;
const MYAPP = utilsModule.MYAPP;

let hook = {
    hookSprite: new Image(),
    collisionDetected: MYAPP.collisionDetected,
    dropped: false,
    raising: false,
    hookSz: 20,
    fishHooked: false,
    ropeLen: 20,
    x: null,
    y: CANVAS.height / 2,
    height: 248,
    width: 20,
    sx: 0,
    sy: height - ropeLen,
};

hookSprite.src = 'img/hook.png';
/**
 * Returns the height of the hook.
 * @return {Number} The hook height.
 */
function getRopeLen() {
    return hook.ropeLen;
};

/**
 * Sets the drop state to true;
 */
function drop() {
    hook.dropped = true;
};

/**
 * Handles the collision detection for hook.
 */
function collision() {
    let i = 0,
        f = null,
        shoalLen = MYAPP.shoal.fish.length,
        evilShoalLen = MYAPP.shoal.evilFish.length;

    // Make a callback function to return true
    if (!fishHooked) {
        for (i; i < shoalLen; i++) {
            f = MYAPP.shoal.fish[i];
            hook.x = MYAPP.boat.getX() + MYAPP.boat.width / 3 + hookSz;

            if (hook.x < f.x + f.width && hook.x + hook.width > f.x &&
                hook.y < f.y + f.height && hook.width + hook.y > f.y) {
                console.log('Caught one');
                f.caught = true;
                hook.raising = true;
                hook.fishHooked = true;
            }
        }

        for (i = 0; i < evilShoalLen; i++) {
            f = MYAPP.shoal.evilFish[i];
            if (hook.x < f.x + f.width && hook.x + hook.width > f.x &&
                hook.y < f.y + f.height && hook.width + hook.y > f.y) {
                console.log('Caught one');
                f.caught = true;
                hook.raising = true;
                hook.fishHooked = true;
            }
        }
    }
};

/**
 * Draws the hook to the canvas.
 */
function _draw() {
    hook.x = MYAPP.boat.getX() + MYAPP.boat.width / 3;
    hook.sy = hook.height - hook.ropeLen;
    CTX.drawImage(hook.hookSprite, hook.sx, hook.sy, hook.width, hook.ropeLen, hook.x, hook.y,
    hook.width, hook.ropeLen);
}

/**
 * Manages the hook depending upon the state of the parameters.
 */
function update() {
    /* DEBUG ====================
    let data = 'sprite height: ' + height + ' dropped: ' + dropped + ' raising ' + raising +
    ' fishHooked ' + fishHooked + ' ropeLen ' + ropeLen;
    console.log('HookDebug: ' + data);
    */
    if (hook.dropped) {
        _draw();
        collision();
    }
    // Move the MYAPP.hook up and down
    if (hook.ropeLen < hook.height && hook.dropped && !hook.raising) {
        hook.ropeLen++;
        // console.log('increment height');
    } else if (hook.dropped && hook.raising) {
        hook.ropeLen--;
        // console.log('decrement height');
    }

    // Raise the MYAPP.hook upon reaching the sea bed
    if (hook.ropeLen >= CANVAS.height/2 && hook.dropped) {
        hook.raising = true;
    }

    // Reset the MYAPP.hook upon reaching the MYAPP.boat again
    if (hook.ropeLen <= hook.hookSz && hook.dropped) {
        hook.dropped = false;
        hook.raising = false;
        hook.fishHooked = false;

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
