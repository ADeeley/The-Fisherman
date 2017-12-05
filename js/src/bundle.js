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
        width = 50,
        height = 30,
        left = -1,
        right = 1,
        // -1 represents left, 1 represents right
        direction = left,
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
        if (direction === left) {
            // Draw left sprite
            CTX.drawImage(boatSprite, 0, 0, width, height,
                    x, y - height, width, height);
        } else if (direction === right) {
            // Draw right sprite
            CTX.drawImage(boatSprite, 50, 0, width, height,
                    x, y - height, width, height);
        }
    };

    /**
     * Moves the boat in the direction dictated by the arrow keys.
     */
    function move() {
        if (MYAPP.keyDown.left && x >= 0) {
        x--;
        // console.log('left');
            if (direction !== left) {
                direction = left;
            }
        } else if (MYAPP.keyDown.right && x <= CANVAS.width - width) {
        x++;
            if (direction !== right) {
                direction = right;
            }
        }
    };

    return {
        getX: getX,
        getY: getY,
        speed: speed,
        width: width,
        height: height,
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

},{"./utils.js":8}],2:[function(require,module,exports){
'use strict';
const DEBUG_DIV = 'debug_controls';

/**
 * Iterates over the properties of an objet and displays them to the debug
 * area of the page.
 * @param {String} object The object to be iterated over.
 */
function displayDebug(object) {
    let target = document.getElementById(DEBUG_DIV),
        debugData = '',
        property = '';

    for (property in object) {
        if (object.hasOwnProperty(property)) {
            debugData += property;
            debugData += ' ' + object[property] + ' ';
        }
    }
    console.log(debugData);
    target.innerHTML = debugData;
};


module.exports = {
    debugMode: true,
    displayDebug: displayDebug,
};

},{}],3:[function(require,module,exports){
'use strict';

const utilsModule = require('./utils.js');
const CTX = utilsModule.CTX;
const CANVAS = utilsModule.CANVAS;
const MYAPP = utilsModule.MYAPP;

/**
 * Fish constructor function
 * @param {Number} x The X coordinate
 * @param {Number} y The Y coordinate
 * @param {Number} width The widthidth of the fish
 * @param {Number} height The height of the fish
 * @param {Image} sprite A sprite image object
 */
function Fish(x, y, width, height, sprite) {
    let direction = 1,
        right = 1,
        left = -1,
        speed = 2;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.caught = false;

    this.move = () => {
        // Swim the fish in the specified directionection
        if (this.caught) {
            this.y = MYAPP.boat.getY() + MYAPP.hook.getRopeLen();
            this.x = MYAPP.boat.getX() + MYAPP.boat.width/3;
            console.log('Raising fishie!');
        }
        if (this.x >= 0 && this.x <= CANVAS.width - this.width) {
            if (direction === right) {
                this.x++;
            } else if (direction === left) {
                this.x--;
            }

            // Randomly change directionection
            if (Math.random() > 0.99) {
                direction *= left;
            }
        } else {
            direction *= left;
            if (direction === right) {
                this.x += speed;
            } else if (direction === left) {
                this.x -= speed;
            }
        }
    };

    this.draw = () => {
        if (direction === 1) {
            CTX.drawImage(sprite, this.width, 0, this.width, this.height, this.x, this.y,
                          this.width, this.height);
        } else {
            CTX.drawImage(sprite, 0, 0, this.width, this.height, this.x, this.y,
                          this.width, this.height);
        }
        this.move();
    };
}

module.exports = {
    Fish: Fish,
};

},{"./utils.js":8}],4:[function(require,module,exports){
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

},{"./utils.js":8}],5:[function(require,module,exports){
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

},{"./utils.js":8}],6:[function(require,module,exports){
'use strict';

const debugModule = require('./debugControls.js');
const game = require('./game.js').game;
const boat = require('./boat.js').boat;
const hook = require('./hook.js');
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
    switch (e.keyCode) {
    case MYAPP.keys.SPACE:
        switch (MYAPP.state) {
        case 'startScreen':
            MYAPP.stateToStartGame();
            break;
        case 'gameLoop':
            MYAPP.hook.drop();
            break;
        case 'victory':
            MYAPP.stateToStartScreen();
            break;
        }
        break;
    case MYAPP.keys.A_KEY:
            MYAPP.keyDown.left = true;
        break;
    case MYAPP.keys.D_KEY:
            MYAPP.keyDown.right = true;
        break;
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
    switch (e.keyCode) {
    case MYAPP.keys.A_KEY:
        MYAPP.keyDown.left = false;
        break;
    case MYAPP.keys.D_KEY:
        MYAPP.keyDown.right = false;
        break;
    }
};

/**
 * Handles the in game functions and draws everything to the canvas.
 */
function gameLoop() {
    MYAPP.game.drawBackground();
    MYAPP.game.drawScore();
    MYAPP.boat.draw();
    MYAPP.boat.move();
    MYAPP.shoal.drawAll();
    MYAPP.hook.update();
    // End the game if no good fish remain
    if (MYAPP.shoal.fish.length == 0) {
        MYAPP.stateToVictory();
    };
};

/**
 * The main loop - checks the MYAPP.stateHandler and runs the appropriate loop
 */
function mainLoop() {
    if (MYAPP.state === 'startScreen') {
        MYAPP.game.startScreen();
        // setup();
    } else if (MYAPP.state === 'gameLoop') {
        CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
        gameLoop();
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

},{"./boat.js":1,"./debugControls.js":2,"./game.js":4,"./hook.js":5,"./shoal.js":7,"./utils.js":8}],7:[function(require,module,exports){
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
        width = 30,
        height = 20,
        xDelta = CANVAS.width-30,
        yDelta = (CANVAS.height/2-20);

    evilFishSprite.src = 'img/evilfish.png';
    goodFishSprite.src = 'img/goldfish.png';

    this.fish = (() => {
        let fishArr = [];

        for (i; i < numGoodFish; i++) {
            x = Math.floor(Math.random() * xDelta),
            y = Math.floor(Math.random() * yDelta) + CANVAS.height/2;
            fishArr.push(new Fish(x, y, width, height, goodFishSprite));
        }

        return fishArr;
    })();

    this.evilFish = (() => {
        let evilFishArr = [];

        for (i; i < numEvilFish; i++) {
            x = Math.floor(Math.random() * xDelta),
            y = Math.floor(Math.random() * yDelta) + CANVAS.height/2;
            evilFishArr.push(new Fish(x, y, width, height, evilFishSprite));
        }

        return evilFishArr;
    })();


    this.drawAll = () => {
        i = 0;
        for (i; i < this.fish.length; i++) {
            this.fish[i].draw();
        }
        for (i = 0; i < this.evilFish.length; i++) {
            this.evilFish[i].draw();
        }
    };

    this.removeFish = () => {
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

},{"./fish.js":3,"./utils.js":8}],8:[function(require,module,exports){
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
        D_KEY: 68,
        LEFT_KEY: 37,
        RIGHT_KEY: 39,
    },
    state: 'startScreen',
    game: null,
    boat: null,
    hook: null,
    shoal: null,
};

MYAPP.stateToStartScreen = () => {
    MYAPP.state = 'startScreen';
};

MYAPP.stateToStartGame = () => {
    MYAPP.state = 'gameLoop';
};

MYAPP.stateToDeath = () => {
    MYAPP.state = 'death';
};

MYAPP.stateToVictory = () => {
    MYAPP.state = 'victory';
};

module.exports = {
    MYAPP: MYAPP,
    CANVAS: CANVAS,
    CTX: CTX,
};

},{}]},{},[6,1]);
