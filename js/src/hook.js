'use strict';

const utilsModule = require('./utils.js');
const CTX = utilsModule.CTX;
const CANVAS = utilsModule.CANVAS;
const MYAPP = utilsModule.MYAPP;
let collisionDetected = MYAPP.collisionDetected,
    seaLevel = CANVAS.height / 2;


let hook = {
    hookSprite: new Image(),
    dropped: false,
    raising: false,
    hookSz: 20,
    fishHooked: false,
    ropeLen: 20,
    x: null,
    y: seaLevel,
    ropeOrigin: 248,
    height: 20,
    width: 20,
    sx: 0,
};
hook.sy = hook.ropeOrigin - hook.ropeLen,

hook.hookSprite.src = 'img/hook.png';

/**
 * Resets the parameters of hook to default state.
 */
function _resetHook() {
    hook.dropped = false;
    hook.raising = false;
    hook.fishHooked = false;
}

/**
 * Handles the reeling in and out of the hook sprite.
 */
function _moveHook() {
    if (hook.ropeLen < hook.ropeOrigin && hook.dropped &! hook.raising) {
        hook.ropeLen++;
    } else if (hook.dropped && hook.raising) {
        hook.ropeLen--;
    }
    // Raise the MYAPP.hook upon reaching the sea bed
    if (hook.ropeLen >= CANVAS.height/2 && hook.dropped) {
        hook.raising = true;
    }

    // Reset the MYAPP.hook upon reaching the MYAPP.boat again
    if (hook.ropeLen <= hook.hookSz && hook.dropped) {
        _resetHook();
        MYAPP.shoal.removeFish();
    }
};
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
        shoalLen = MYAPP.shoal.getShoalLen();

    // Make a callback function to return true
    if (!hook.fishHooked) {
        for (i; i < shoalLen; i++) {
            f = MYAPP.shoal.getFish(i);

            if (collisionDetected(hook, f)) {
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
    hook.y = seaLevel + hook.ropeLen;
    hook.sy = hook.ropeOrigin - hook.ropeLen;
    CTX.drawImage(hook.hookSprite, hook.sx, hook.sy, hook.width, hook.ropeLen,
         hook.x, seaLevel, hook.width, hook.ropeLen);
}

/**
 * Manages the hook depending upon the state of the parameters.
 */
function update() {
    /*
    let data = 'sprite height: ' + hook.height + ' dropped: ' + hook.dropped +
     ' raising ' + hook.raising + ' fishHooked ' + hook.fishHooked + ' ropeLen ' +
      hook.ropeLen + ' Hook.y ' + hook.y + ' sy ' + hook.sy + ' sx ' + hook.sx + 
      ' hookSprite' + hook.hookSprite + ' hook.x ' + hook.x;
    console.log('HookDebug: ' + data);
    */
    if (hook.dropped) {
        _draw();
        collision();
    }
    _moveHook();
};

module.exports = {
    getRopeLen: getRopeLen,
    drop: drop,
    collision: collision,
    update: update,
};
