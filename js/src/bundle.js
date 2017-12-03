(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
let utils_module = require('./utils.js')
let ctx = utils_module.ctx;
let canvas = utils_module.canvas;
MYAPP = utils_module.MYAPP;

/**
 *  Constructor function for the boat object.
 */
function Boat() {
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    this.speed = 3;
    this.w = 50;
    this.h = 30;
    // 0 represents left, 1 represents right
    this.direction = 0;
    // Boat sprite setup
    this.boatSprite = new Image();
    this.boatSprite.src = 'img/boat.png';

    this.draw = function() {
        if (this.direction === 0) {
            // Draw left sprite
            ctx.drawImage(this.boatSprite, 0, 0, this.w, this.h, this.x, this.y - this.h, this.w, this.h);
        } else if (this.direction === 1) {
            // Draw right sprite
            ctx.drawImage(this.boatSprite, 50, 0, this.w, this.h, this.x, this.y - this.h, this.w, this.h);
        }
    }
    this.move = function() {
        if (MYAPP.keyDown.left && this.x >= 0) {
        this.x--;
        // console.log('left');
            if (this.direction !== 0) {
                this.direction = 0;
            }
        } else if (MYAPP.keyDown.right && this.x <= canvas.width - this.w) {
        this.x++;
            if (this.direction !== 1) {
                this.direction = 1;
            }
        }
    }
}

module.exports = {
    Boat: Boat,
}


},{"./utils.js":8}],2:[function(require,module,exports){
let utils_module = require('./utils.js')
let ctx = utils_module.ctx;
let canvas = utils_module.canvas;
MYAPP = utils_module.MYAPP;

function Fish(x, y, w, h, sprite) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h; 
    this.sprite = sprite;
    this.dir = 1;
    this.caught = false;

    this.move = function() {
        // Swim the fish in the specified direction
        if (this.caught) {
            this.y = MYAPP.boat.y + MYAPP.hook.height; 
            this.x = MYAPP.boat.x + MYAPP.boat.w/3;
            console.log('Raising fishie!');
        }
        if (this.x >= 0 && this.x <= canvas.width - this.w) {
            if (this.dir === 1) {
                this.x++;
            }
            else if (this.dir === -1) {
                this.x--;
            }

            // Randomly change direction
            if (Math.random() > 0.99) {
                this.dir *= -1;
            }
        } 
        else {
            this.dir *= -1;
            if (this.dir === 1) {
                this.x += 2;
            }
            else if (this.dir === -1) {
                this.x -= 2;
            }
        }
    }

    this.draw = function() {
        if (this.dir === 1) {
            ctx.drawImage(this.sprite, this.w, 0, this.w, this.h, this.x, this.y, 
                          this.w, this.h);
        }
        else {
            ctx.drawImage(this.sprite, 0, 0, this.w, this.h, this.x, this.y, 
                          this.w, this.h);
        }
        this.move();
    }
}

module.exports = {
    Fish: Fish,
}
},{"./utils.js":8}],3:[function(require,module,exports){
let utils_module = require('./utils.js')
let ctx = utils_module.ctx;
let canvas = utils_module.canvas;
MYAPP = utils_module.MYAPP;

// Gradient variable for the ocean
var gradient = ctx.createLinearGradient(0, canvas.height/2 ,0, 500); 
gradient.addColorStop(0, '#1658EA');
gradient.addColorStop(1, 'black');
/**
 * 
 */
function Game() {
    this.score = 0;
    /**
     * The main MYAPP.game loop
     */
    this.startScreen = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawBackground();
        this.drawTitle();
        MYAPP.boat.draw();
    }
    this.gameLoop = function() {
        this.drawBackground();
        this.drawScore();
        MYAPP.boat.draw();
        MYAPP.boat.move();
        MYAPP.shoal.drawAll();
        MYAPP.hook.draw();
        // End the MYAPP.game if no good fish remain
        if (MYAPP.shoal.fish.length == 0) {
            MYAPP.stateToVictory();
        } 
    }
    this.deathScreen = function() {
        ctx.font = '40pt Ariel';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('You died!', canvas.width/4, canvas.height/4);
        this.drawBackground();
    }
    this.victoryScreen = function() {
        ctx.font = '40pt Ariel';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('You won!', canvas.width/4, canvas.height/4);
    }

    // General methods
    this.drawBackground = function() {
        ctx.beginPath();
        ctx.rect(0, canvas.height/2, canvas.width, canvas.height);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();
    }
    this.drawTitle = function() {
        ctx.font = '40pt Ariel';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('The', 20, canvas.height/2 - 5);
        ctx.fillText('Fisherman', 20, (canvas.height/2) + 40);
    }
    this.drawScore = function() {
        ctx.font = '20pt Ariel';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(this.score, 20, 40);
    }
}

module.exports = {
    Game: Game,
}
},{"./utils.js":8}],4:[function(require,module,exports){
let utils_module = require('./utils.js')
let ctx = utils_module.ctx;
let canvas = utils_module.canvas;
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
        let i = 0;
        let f = null;
        let tip = null;

        if (!this.fishHooked) {
            for (i; i < MYAPP.shoal.fish.length; i++) {
                f = MYAPP.shoal.fish[i];
                tip = MYAPP.boat.y + this.height;

                if (!(MYAPP.boat.x + MYAPP.boat.w / 3 + this.hookSz < f.x || MYAPP.boat.x + MYAPP.boat.w / 3 > f.x + f.w || 
                      tip < f.y || tip - this.hookSz > f.y + f.h)) {
                          console.log('Caught one');
                          f.caught = true;
                          this.raising = true;
                          this.fishHooked = true;
                }
            }
            for (i = 0; i < MYAPP.shoal.evilFish.length; i++) {
                f = MYAPP.shoal.evilFish[i];
                tip = MYAPP.boat.y + this.height;

                if (!(MYAPP.boat.x + MYAPP.boat.w / 3 + this.hookSz < f.x || MYAPP.boat.x + MYAPP.boat.w / 3 > f.x + f.w || 
                      tip < f.y || tip - this.hookSz > f.y + f.h)) {
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
        }
        else if (this.dropped && this.raising) {
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
},{"./utils.js":8}],5:[function(require,module,exports){
let setup = require('./setup.js').setup;
var utils_module = require('./utils.js')
var ctx = utils_module.ctx;
var canvas = utils_module.canvas;
MYAPP = utils_module.MYAPP;

window.addEventListener('keydown', keyDownEventHandler, false);
window.addEventListener('keyup', keyUpEventHandler, false);

function keyDownEventHandler(e) {
    /**
     * Chooses the correct keyevents depending upon the current state
     */
    //Check the current state
    if (e.keyCode === MYAPP.keys.SPACE) {
        if (MYAPP.state === 'startScreen') {
            MYAPP.stateToStartGame();
        }
        else if (MYAPP.state === 'gameLoop') {
            MYAPP.hook.drop();
        }
        else if (MYAPP.state === 'victory') {
            MYAPP.stateToStartScreen();
        }
    }
    else if (e.keyCode === MYAPP.keys.A_KEY && MYAPP.state === 'gameLoop') {
            MYAPP.keyDown.left = true;
        }
        else if (e.keyCode === MYAPP.keys.D_Key && MYAPP.state === 'gameLoop') {
            MYAPP.keyDown.right = true;
        }
}

function keyUpEventHandler(e) {
    /**
     * Reverts the relevant MYAPP.keys in keyDown dict to false when the button is released
     */
    if (e.keyCode === MYAPP.keys.A_KEY) {
        MYAPP.keyDown.left = false;
    }
    else if (e.keyCode === MYAPP.keys.D_Key) {
        MYAPP.keyDown.right = false;
    }
}

function draw() {
    // The main loop - checks the MYAPP.stateHandler and runs the appropriate loop
    if (MYAPP.state === 'startScreen') {
        MYAPP.game.startScreen();
        setup();        
    }
    else if (MYAPP.state === 'gameLoop') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        MYAPP.game.gameLoop();
    }
    else if (MYAPP.state === 'death') {
        MYAPP.game.deathScreen();
    }
    else if (MYAPP.state === 'victory') {
        MYAPP.game.victoryScreen();
    }
    else {
        console.log(MYAPP.state);
    }
}

// call draw every 10ms
setup();        
setInterval(draw, 10);
},{"./setup.js":6,"./utils.js":8}],6:[function(require,module,exports){
let Game = require('./game.js').Game;
let Boat = require('./boat.js').Boat;
var Hook = require('./hook.js').Hook;
var Shoal = require('./shoal.js').Shoal;

/**
 * 
 */
function setup() {
    MYAPP.game = new Game();
    MYAPP.boat = new Boat();
    MYAPP.hook = new Hook();
    MYAPP.shoal = new Shoal(1, 4);
}

module.exports = {
    setup: setup,
}
},{"./boat.js":1,"./game.js":3,"./hook.js":4,"./shoal.js":7}],7:[function(require,module,exports){
let utils_module = require('./utils.js')
var Fish = require('./fish.js').Fish;
let ctx = utils_module.ctx;
let canvas = utils_module.canvas;
MYAPP = utils_module.MYAPP;

function Shoal(n, e) {
    this.fish = [];
    this.evilFish = [];
    this.sprite = new Image();
    this.sprite.src = 'img/goldfish.png';
    this.eSprite = new Image();
    this.eSprite.src = 'img/evilfish.png';
    let i = 0;

    // Fill the fish array
    for (i; i < n; i++) {
        this.fish.push(new Fish(Math.floor(Math.random() * (canvas.width-30)),
                                Math.floor((Math.random() * (canvas.height/2-20)))
                                + canvas.height/2, 30, 20, this.sprite))
    }
    // Fill the evilFish array
    for (i = 0; i < e; i++) {
        this.evilFish.push(new Fish(Math.floor(Math.random() * (canvas.width-30)),
                                Math.floor((Math.random() * (canvas.height/2-20)))
                                + canvas.height/2, 30, 20, this.eSprite))
    }

    this.drawAll = function(){
        let i = 0;
        for (i; i < this.fish.length; i++) {
            this.fish[i].draw();
        }
        for (i = 0; i < this.evilFish.length; i++) {
            this.evilFish[i].draw();
        }
    }

    this.removeFish = function(){
    //Removes a fish from the relevant array
        let i = 0;

        for (i; i < this.fish.length; i++) {
            if (this.fish[i].caught) {
                this.fish.splice(i, 1);
                console.log('Sliced fish array');
                MYAPP.game.score++;
            }
        }
        for (i = 0; i < this.evilFish.length; i++) {
            if (this.evilFish[i].caught) {
                this.evilFish.splice(i, 1);
                console.log('Sliced fish array');
                MYAPP.game.score--;
            }
        }
    }
}

module.exports = {
    Shoal: Shoal,
}
},{"./fish.js":2,"./utils.js":8}],8:[function(require,module,exports){
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const MYAPP = {
    keyDown: {
        left: false,
        right: false,
    },
    keys: {
        SPACE: 32,
        A_KEY: 65,
        D_Key: 68,
        LEFT_KEY: 37,
        RIGHT_KEY: 39
    },
    state: 'startScreen',
    game: null,
    boat: null, 
    hook: null,
    shoal: null
}

MYAPP.stateToStartScreen = function() {
    MYAPP.state = 'startScreen';
}

MYAPP.stateToStartGame = function() {
    MYAPP.state = 'gameLoop';
}

MYAPP.stateToDeath = function() {
    MYAPP.state = 'death';
}

MYAPP.stateToVictory = function() {
    MYAPP.state = 'victory';
}

module.exports = {
    MYAPP: MYAPP,
    canvas: canvas,
    ctx: ctx,
}

},{}]},{},[5,1]);
