(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
const utilsModule = require('./utils.js');
const CTX = utilsModule.CTX;
const CANVAS = utilsModule.CANVAS;
const MYAPP = utilsModule.MYAPP;

/**
 *  Constructor function for the boat object.
 * @return {Boat} A boat object with only public properties and methods
 * visible.
 */
const boat = (function() {
    let x = CANVAS.width/2,
        y = CANVAS.height/2,
        speed = 3,
        w = 50,
        h = 30,
        // 0 represents left, 1 represents right
        direction = 0,
        // Boat sprite setup
        boatSprite = new Image();
        boatSprite.src = 'img/boat.png';

    /**
     * Getter for the speed of the boat,
     * @return {Number} The speed of the boat.
     */
    function getSpeed() {
        return speed;
    }
    /**
     * Getter for the x coordinate of the boat,
     * @return {Number} The x coordinate of the boat.
     */
    function getX() {
        return x;
    }
    /**
     * Getter for the y coordinate of the boat,
     * @return {Number} The y coordinate of the boat.
     */
    function getY() {
        return y;
    }
    /**
     * Draws the boat to the CANVAS.
     */
    function draw() {
        if (direction === 0) {
            // Draw left sprite
            CTX.drawImage(boatSprite, 0, 0, w, h,
                    x, y - h, w, h);
        } else if (direction === 1) {
            // Draw right sprite
            CTX.drawImage(boatSprite, 50, 0, w, h,
                    x, y - h, w, h);
        }
    };

    /**
     * Moves the boat in the direction dictated by the arrow keys.
     */
    function move() {
        if (MYAPP.keyDown.left && x >= 0) {
        x--;
        // console.log('left');
            if (direction !== 0) {
                direction = 0;
            }
        } else if (MYAPP.keyDown.right && x <= CANVAS.width - w) {
        x++;
            if (direction !== 1) {
                direction = 1;
            }
        }
    };

    return {
        getX: getX,
        getY: getY,
        speed: speed,
        w: w,
        h: h,
        direction: direction,
        getSpeed: getSpeed,
        draw: draw,
        move: move,
        boatSprite: boatSprite,
    };
})();

module.exports = {
    boat: boat,
};

},{"./utils.js":7}],2:[function(require,module,exports){
'use strict';

const utilsModule = require('./utils.js');
const CTX = utilsModule.CTX;
const CANVAS = utilsModule.CANVAS;
const MYAPP = utilsModule.MYAPP;

/**
 * Fish constructor function
 * @param {Number} x The X coordinate
 * @param {Number} y The Y coordinate
 * @param {Number} w The width of the fish
 * @param {Number} h The height of the fish
 * @param {Image} sprite A sprite image object
 */
function Fish(x, y, w, h, sprite) {
    let dir = 1;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.caught = false;

    this.move = function() {
        // Swim the fish in the specified direction
        if (this.caught) {
            this.y = MYAPP.boat.getY() + MYAPP.hook.getHeight();
            this.x = MYAPP.boat.getX() + MYAPP.boat.w/3;
            console.log('Raising fishie!');
        }
        if (this.x >= 0 && this.x <= CANVAS.width - this.w) {
            if (dir === 1) {
                this.x++;
            } else if (dir === -1) {
                this.x--;
            }

            // Randomly change direction
            if (Math.random() > 0.99) {
                dir *= -1;
            }
        } else {
            dir *= -1;
            if (dir === 1) {
                this.x += 2;
            } else if (dir === -1) {
                this.x -= 2;
            }
        }
    };

    this.draw = function() {
        if (dir === 1) {
            CTX.drawImage(sprite, this.w, 0, this.w, this.h, this.x, this.y,
                          this.w, this.h);
        } else {
            CTX.drawImage(sprite, 0, 0, this.w, this.h, this.x, this.y,
                          this.w, this.h);
        }
        this.move();
    };
}

module.exports = {
    Fish: Fish,
};

},{"./utils.js":7}],3:[function(require,module,exports){
'use strict';

const utilsModule = require('./utils.js');
const CTX = utilsModule.CTX;
const CANVAS = utilsModule.CANVAS;
const MYAPP = utilsModule.MYAPP;
const gradient = CTX.createLinearGradient(0, CANVAS.height/2, 0, 500);
gradient.addColorStop(0, '#1658EA');
gradient.addColorStop(1, 'black');

/**
 * Game constructor function
 */
const game = (function() {
    let largeFont = '40pt Ariel',
        mediumFont = '20pt Ariel',
        score = 0;

    /**
     * Getter for the score.
     * @return {Number} the current score.
     */
    function getScore() {
        return score;
    };

    /**
     * Increments the score.
     */
    function incrementScore() {
        score++;
    };

    /**
     * Decrements the score.
     */
    function decrementScore() {
        score--;
    };

    /**
     * Resets the score to 0.
     */
    function resetScore() {
        score = 0;
    };

    /**
     * Draws the startScreen to the canvas.
     */
    function startScreen() {
        CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
        drawBackground();
        drawTitle();
        MYAPP.boat.draw();
    };

    /**
     * Handles the in game functions and draws everything to the canvas.
     */
    function gameLoop() {
        drawBackground();
        drawScore();
        MYAPP.boat.draw();
        MYAPP.boat.move();
        MYAPP.shoal.drawAll();
        MYAPP.hook.draw();
        // End the game if no good fish remain
        if (MYAPP.shoal.fish.length == 0) {
            MYAPP.stateToVictory();
        };
    };
    /**
     * Draws the death screen to the canvas.
     */
    function deathScreen() {
        CTX.font = largeFont;
        CTX.fillStyle = 'white';
        CTX.fillText('You died!', CANVAS.width/4, CANVAS.height/4);
        drawBackground();
    };

    /**
     * Draws the victory screen to the canvas.
     */
    function victoryScreen() {
        CTX.font = largeFont;
        CTX.fillStyle = 'white';
        CTX.fillText('You won!', CANVAS.width/4, CANVAS.height/4);
    };

    /**
     * Draws the standard background to the canvas.
     */
    function drawBackground() {
        CTX.beginPath();
        CTX.rect(0, CANVAS.height/2, CANVAS.width, CANVAS.height);
        CTX.fillStyle = gradient;
        CTX.fill();
        CTX.closePath();
    };

    /**
     * Draws the title to the canvas.
     */
    function drawTitle() {
        CTX.font = largeFont;
        CTX.fillStyle = 'white';
        CTX.fillText('The', 20, CANVAS.height/2 - 5);
        CTX.fillText('Fisherman', 20, (CANVAS.height/2) + 40);
    };

    /**
     * Draws the score to the canvas.
     */
    function drawScore() {
        CTX.font = mediumFont;
        CTX.fillStyle = 'white';
        CTX.fillText(score, 20, 40);
    };

    return {
        getScore: getScore,
        incrementScore: incrementScore,
        decrementScore: decrementScore,
        resetScore: resetScore,
        startScreen: startScreen,
        gameLoop: gameLoop,
        deathScreen: deathScreen,
        victoryScreen: victoryScreen,
        drawBackground: drawBackground,
        drawTitle: drawTitle,
        drawScore: drawScore,
    };
})();

module.exports = {
    game: game,
};

},{"./utils.js":7}],4:[function(require,module,exports){
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

},{"./utils.js":7}],5:[function(require,module,exports){
'use strict';

const game = require('./game.js').game;
const boat = require('./boat.js').boat;
const hook = require('./hook.js').hook;
const Shoal = require('./shoal.js').Shoal;
const utilsModule = require('./utils.js');
const CTX = utilsModule.CTX;
const CANVAS = utilsModule.CANVAS;
const MYAPP = utilsModule.MYAPP;

window.addEventListener('keydown', keyDownEventHandler, false);
window.addEventListener('keyup', keyUpEventHandler, false);

/**
 * Instantiates all the game objects.
 */
function setup() {
    MYAPP.game = game;
    MYAPP.game.resetScore();
    MYAPP.boat = boat;
    MYAPP.hook = hook;
    MYAPP.shoal = new Shoal(3, 4);
};

/**
 * Key press handler. Chooses the correct keyevents depending upon
 * the current state
 * @param {Number} e The key that was pressed.
 */
function keyDownEventHandler(e) {
    if (e.keyCode === MYAPP.keys.SPACE) {
        if (MYAPP.state === 'startScreen') {
            MYAPP.stateToStartGame();
        } else if (MYAPP.state === 'gameLoop') {
            MYAPP.hook.drop();
        } else if (MYAPP.state === 'victory') {
            MYAPP.stateToStartScreen();
        }
    } else if (e.keyCode === MYAPP.keys.A_KEY && MYAPP.state === 'gameLoop') {
            MYAPP.keyDown.left = true;
        } else if (e.keyCode === MYAPP.keys.D_Key &&
            MYAPP.state === 'gameLoop') {
                MYAPP.keyDown.right = true;
        }
};

/**
 * Key press handler. Chooses the correct keyevents depending upon
 * the current state
 * Reverts the relevant MYAPP.keys in keyDown dict to false when
 * the button is released
 * @param {Number} e The key that was pressed.
 */
function keyUpEventHandler(e) {
    if (e.keyCode === MYAPP.keys.A_KEY) {
        MYAPP.keyDown.left = false;
    } else if (e.keyCode === MYAPP.keys.D_Key) {
        MYAPP.keyDown.right = false;
    }
};

/**
 * The main loop - checks the MYAPP.stateHandler and runs the appropriate loop
 */
function mainLoop() {
    if (MYAPP.state === 'startScreen') {
        MYAPP.game.startScreen();
        setup();
    } else if (MYAPP.state === 'gameLoop') {
        CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
        MYAPP.game.gameLoop();
    } else if (MYAPP.state === 'death') {
        MYAPP.game.deathScreen();
    } else if (MYAPP.state === 'victory') {
        MYAPP.game.victoryScreen();
    } else {
        console.log('Main loop state error: ' + MYAPP.state);
    }
};

setup();
setInterval(mainLoop, 10);

},{"./boat.js":1,"./game.js":3,"./hook.js":4,"./shoal.js":6,"./utils.js":7}],6:[function(require,module,exports){
'use strict';

const utilsModule = require('./utils.js');
const Fish = require('./fish.js').Fish;
const CANVAS = utilsModule.CANVAS;
const MYAPP = utilsModule.MYAPP;

/**
 * Stores the evil fish array and good fish array and associated
 * methods.
 * @param {Number} numGoodFish The number of good fish required
 * @param {Number} numEvilFish The number of evil fish required
 */
function Shoal(numGoodFish, numEvilFish) {
    let goodFishSprite = new Image(),
        evilFishSprite = new Image(),
        i = 0,
        x = null,
        y = null,
        xDelta = CANVAS.width-30,
        yDelta = (CANVAS.height/2-20);

    evilFishSprite.src = 'img/evilfish.png';
    goodFishSprite.src = 'img/goldfish.png';

    this.fish = (() => {
        let fishArr = [];

        for (i; i < numGoodFish; i++) {
            x = Math.floor(Math.random() * xDelta),
            y = Math.floor(Math.random() * yDelta) + CANVAS.height/2;
            fishArr.push(new Fish(x, y, 30, 20, goodFishSprite));
        }

        return fishArr;
    })();

    this.evilFish = (() => {
        let evilFishArr = [];

        for (i; i < numEvilFish; i++) {
            x = Math.floor(Math.random() * xDelta),
            y = Math.floor(Math.random() * yDelta) + CANVAS.height/2;
            evilFishArr.push(new Fish(x, y, 30, 20, evilFishSprite));
        }

        return evilFishArr;
    })();


    this.drawAll = function() {
        i = 0;
        for (i; i < this.fish.length; i++) {
            this.fish[i].draw();
        }
        for (i = 0; i < this.evilFish.length; i++) {
            this.evilFish[i].draw();
        }
    };

    this.removeFish = function() {
        i = 0;

        for (i; i < this.fish.length; i++) {
            if (this.fish[i].caught) {
                this.fish.splice(i, 1);
                console.log('Sliced fish array');
                MYAPP.game.incrementScore();
            }
        }
        for (i = 0; i < this.evilFish.length; i++) {
            if (this.evilFish[i].caught) {
                this.evilFish.splice(i, 1);
                console.log('Sliced fish array');
                MYAPP.game.decrementScore();
            }
        }
    };
}

module.exports = {
    Shoal: Shoal,
};

},{"./fish.js":2,"./utils.js":7}],7:[function(require,module,exports){
'use strict';

const CANVAS = document.getElementById('myCanvas'),
    CTX = CANVAS.getContext('2d'),
    MYAPP = {
    keyDown: {
        left: false,
        right: false,
    },
    keys: {
        SPACE: 32,
        A_KEY: 65,
        D_Key: 68,
        LEFT_KEY: 37,
        RIGHT_KEY: 39,
    },
    state: 'startScreen',
    game: null,
    boat: null,
    hook: null,
    shoal: null,
};

MYAPP.stateToStartScreen = function() {
    MYAPP.state = 'startScreen';
};

MYAPP.stateToStartGame = function() {
    MYAPP.state = 'gameLoop';
};

MYAPP.stateToDeath = function() {
    MYAPP.state = 'death';
};

MYAPP.stateToVictory = function() {
    MYAPP.state = 'victory';
};

module.exports = {
    MYAPP: MYAPP,
    CANVAS: CANVAS,
    CTX: CTX,
};

},{}]},{},[5,1]);
