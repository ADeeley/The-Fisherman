(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
const utilsModule = require('./utils.js'),
CTX = utilsModule.CTX,
CANVAS = utilsModule.CANVAS,
MYAPP = utilsModule.MYAPP;

let x = CANVAS.width/2,
    y = CANVAS.height/2,
    speed = 3,
    width = 50,
    height = 30,
    // 0 represents left, 1 represents right
    direction = 0,
// Boat sprite setup
boatSprite = new Image();
boatSprite.src = 'img/boat.png';

/**
 * Provides X as a reference, instead of a number literal.
 * @return {Number} The x coordinate of boat.
 */
function getX() {
    return x;
}
/**
 * Draws the boat to the CANVAS.
 */
function draw() {
    if (direction === 0) {
        // Draw left sprite
        CTX.drawImage(boatSprite, 0, 0, width, height, x, y - height, width, height);
    } else if (direction === 1) {
        // Draw right sprite
        CTX.drawImage(boatSprite, 50, 0, width, height, x, y - height, width, height);
    }
}

/**
 * Moves the boat around the screen according to the direction and
 * buttons pressed.
 */
function move() {
    if (MYAPP.keyDown.left && x >= 0) {
    x--;
    // console.log('left');
        if (direction !== 0) {
            direction = 0;
        }
    } else if (MYAPP.keyDown.right && x <= CANVAS.width - width) {
    x++;
        if (direction !== 1) {
            direction = 1;
        }
    }
}

module.exports = {
    getX: getX,
    y: y,
    width: width,
    height: height,
    draw: draw,
    move: move,
};

},{"./utils.js":9}],2:[function(require,module,exports){
/**
 * Checks if objects a and b are colliding.
 * Assumes that both objects have x, y, width and height parameters.
 * @param {*} a The first object
 * @param {*} b The second object
 * @return {Boolean} The result.
 */
function collisionDetected(a, b) {
if (a.x < b.x + b.width && a.x + a.width > b.x &&
    a.y < b.y + b.height && a.height + a.y > b.y) {
        // Collision
        return true;
    }
    // No collision
    return false;
};

module.exports = {
    collisionDetected: collisionDetected,
};

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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
function Fish(x, y, width, height, sprite, species) {
    let direction = 1,
        right = 1,
        left = -1,
        speed = 2;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.caught = false;
    this.species = species,

    this.move = () => {
        // Swim the fish in the specified directionection
        if (this.caught) {
            this.y = MYAPP.boat.y + MYAPP.hook.getRopeLen();
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
        if (direction === right) {
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

},{"./utils.js":9}],5:[function(require,module,exports){
'use strict';

const utilsModule = require('./utils.js');
const CTX = utilsModule.CTX;
const CANVAS = utilsModule.CANVAS;
const MYAPP = utilsModule.MYAPP;
const gradient = CTX.createLinearGradient(0, CANVAS.height/2, 0, 500);

gradient.addColorStop(0, '#1658EA');
gradient.addColorStop(1, 'black');

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

module.exports = {
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

},{"./utils.js":9}],6:[function(require,module,exports){
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
    CTX.drawImage(hook.hookSprite, hook.sx, hook.sy, hook.width, hook.ropeLen, hook.x, seaLevel,
    hook.width, hook.ropeLen);
}

/**
 * Manages the hook depending upon the state of the parameters.
 */
function update() {
    let data = 'sprite height: ' + hook.height + ' dropped: ' + hook.dropped + ' raising ' + hook.raising +
    ' fishHooked ' + hook.fishHooked + ' ropeLen ' + hook.ropeLen + ' Hook.y ' + hook.y + ' sy ' + hook.sy + 
    ' sx ' + hook.sx + ' hookSprite' + hook.hookSprite + ' hook.x ' + hook.x;
    console.log('HookDebug: ' + data);
    if (hook.dropped) {
        _draw();
        collision();
    }
    // Move the MYAPP.hook up and down
    if (hook.ropeLen < hook.ropeOrigin && hook.dropped && !hook.raising) {
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

},{"./utils.js":9}],7:[function(require,module,exports){
'use strict';

const debugModule = require('./debugControls.js');
const game = require('./game.js');
const boat = require('./boat.js');
const hook = require('./hook.js');
const shoal = require('./shoal.js');
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
    MYAPP.boat = boat;
    MYAPP.hook = hook;
    MYAPP.shoal = shoal;
    MYAPP.shoal.init();
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
            MYAPP.game.resetScore();
            MYAPP.shoal.init();
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
    if (MYAPP.shoal.allGoodFishCaught()) {
        MYAPP.stateToVictory();
    };
};

/**
 * The main loop - checks the MYAPP.stateHandler and runs the appropriate loop
 */
function mainLoop() {
    if (MYAPP.state === 'startScreen') {
        MYAPP.game.startScreen();
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

},{"./boat.js":1,"./debugControls.js":3,"./game.js":5,"./hook.js":6,"./shoal.js":8,"./utils.js":9}],8:[function(require,module,exports){
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
let numGoodFish = 3,
    numEvilFish = 1,
    goodFishSprite = new Image(),
    evilFishSprite = new Image(),
    fish = [],
    i = 0,
    x = null,
    y = null,
    width = 30,
    height = 20,
    xDelta = CANVAS.width-30,
    yDelta = (CANVAS.height/2-20);

evilFishSprite.src = 'img/evilfish.png';
goodFishSprite.src = 'img/goldfish.png';

/**
 * Initialises the array with the specified number of fish.
 * Resets the array if called again.
 */
function init() {
    fish = [];
    for (i = 0; i < numGoodFish; i++) {
        x = Math.floor(Math.random() * xDelta),
        y = Math.floor(Math.random() * yDelta) + CANVAS.height/2;
        fish.push(new Fish(x, y, width, height, goodFishSprite, 'good'));
    }

    for (i = 0; i < numEvilFish; i++) {
        x = Math.floor(Math.random() * xDelta),
        y = Math.floor(Math.random() * yDelta) + CANVAS.height/2;
        fish.push(new Fish(x, y, width, height, evilFishSprite, 'evil'));
    }
};

/**
 * Draws all of the fish in fish array to the canvas.
 */
function drawAll() {
    for (i = 0; i < fish.length; i++) {
        fish[i].draw();
    }
};

/**
 * Removes a single fish from the fish array.
 */
function removeFish() {
    for (i = 0; i < fish.length; i++) {
        if (fish[i].caught) {
            fish.splice(i, 1);
            console.log('Sliced fish array');
            // Add check for evil fish to decrement score.
            MYAPP.game.incrementScore();
        }
    }
};

/**
 * Returns true if all the good fish in the array have been removed.
 * @return {Boolean} The result
 */
function allGoodFishCaught() {
    for (i = 0; i < fish.length; i++) {
        if (fish[i].species === 'good') {
            return false;
        }
    }
    return true;
};

/**
 * @return {Number} The length of the fish array.
 */
function getShoalLen() {
    return fish.length;
}

/**
 * @param {Number} n index of the fish required;
 * @return {Fish} The fish array.
 */
function getFish(n) {
    return fish[n];
}

module.exports = {
    init: init,
    drawAll: drawAll,
    removeFish: removeFish,
    allGoodFishCaught: allGoodFishCaught,
    getShoalLen: getShoalLen,
    getFish: getFish,

};

},{"./fish.js":4,"./utils.js":9}],9:[function(require,module,exports){
'use strict';

const collisionModule = require('./collisionDetection.js');
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
    collisionDetected: collisionModule.collisionDetected,
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

},{"./collisionDetection.js":2}]},{},[7,1]);
