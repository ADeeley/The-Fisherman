var canvas     = document.getElementById("myCanvas");
var ctx        = canvas.getContext("2d");

window.addEventListener("keydown", keyDownEventHandler, false);
window.addEventListener("keyup", keyUpEventHandler, false);

var keyDown = {
    /**
     * Keeps a track of buttons being held down
     */
    left  : false,
    right : false
}
var keys = {
    /**
     * An enumeration for key codes
     */
    SPACE     : 32,
    A_KEY     : 65,
    D_Key     : 68,
    LEFT_KEY  : 37,
    RIGHT_KEY : 39
}

// Gradient variable for the ocean
var gradient = ctx.createLinearGradient(0, canvas.height/2 ,0, 500); 
gradient.addColorStop(0, "#1658EA");
gradient.addColorStop(1, "black");

function Game() {
    this.score = 0;
    /**
     * The main game loop
     */
    this.startScreen = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawBackground();
        this.drawTitle();
        boat.draw();
    }
    this.gameLoop = function() {
        this.drawBackground();
        this.drawScore();
        boat.draw();
        boat.move();
        shoal.drawAll();
        hook.draw();
    }
    this.deathScreen = function() {
        ctx.font = "40pt Ariel";
        ctx.fillStyle = "#c2c4ae";
        ctx.fillText("You died!", canvas.width/4, canvas.height/4);
        this.drawBackground();
    }
    this.victory = function() {
        ctx.font = "40pt Ariel";
        ctx.fillStyle = "#c2c4ae";
        ctx.fillText("You won!", canvas.width/4, canvas.height/4);
        this.drawBackground();
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
        ctx.font = "40pt Ariel";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("The", 20, canvas.height/2 - 5);
        ctx.fillText("Fisherman", 20, (canvas.height/2) + 40);
    }
    this.drawScore = function() {
        ctx.font = "20pt Ariel";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(this.score, 20, 40);
    }
}

function StateHandler() {
    this.startScreen     = true;
    this.gameLoop        = false;
    this.dead            = false;

    this.returnToStartScreen = function() {
        this.startScreen = true;
        this.gameLoop    = false;
        this.dead        = false;
        //Reset all class instances to default
        setup();        
    }

    this.startGame = function() {
        this.startScreen = false;
        this.gameLoop    = true;
        this.dead        = false;
    }

    this.deathSequence = function() {
        this.startScreen = false;
        this.gameLoop    = false;
        this.dead        = true;
    }
}

function keyDownEventHandler(e) {
    /**
     * Chooses the correct keyevents depending upon the current state
     */
    //Check the current state
    if (stateHandler.startScreen) {

        if (e.keyCode == keys.SPACE) {
            stateHandler.startGame();
        }
    }
    else if (stateHandler.gameLoop) {
        if (e.keyCode == keys.A_KEY) {
            keyDown.left = true;
        }
        else if (e.keyCode == keys.D_Key) {
            keyDown.right = true;
        }
        else if (e.keyCode == keys.SPACE) {
            hook.drop();
        } 
    }
    else if (stateHandler.deathSequence) {
        if (e.keyCode == keys.SPACE) {
        }
    }
}

function keyUpEventHandler(e) {
    /**
     * Reverts the relevant keys in keyDown dict to false when the button is released
     */
    if (e.keyCode == keys.A_KEY) {
        keyDown.left = false;
    }
    else if (e.keyCode == keys.D_Key) {
        keyDown.right = false;
    }
}

function Boat() {
    this.x              = canvas.width/2;
    this.y              = canvas.height/2;
    this.speed          = 3;
    this.w              = 50;
    this.h              = 30;
    // 0 represents left, 1 represents right
    this.direction      = 0;
    //Boat sprite setup
    this.boatSprite     = new Image();
    this.boatSprite.src = "boat.bmp";

    this.draw = function() {
        if (this.direction == 0) {
            //Draw left sprite
            ctx.drawImage(this.boatSprite, 0, 0, this.w, this.h, 
                          this.x, this.y - this.h, this.w, this.h);
        }
        else if (this.direction == 1) {
            //Draw right sprite
            ctx.drawImage(this.boatSprite, 50, 0, this.w, this.h, 
                          this.x, this.y - this.h, this.w, this.h);
        }
    }
    
    this.move = function() {
        if (keyDown.left && this.x >= 0) {
        this.x--;
        //console.log("left");
            if (this.direction != 0) {
                this.direction = 0;
            }
        }
        else if (keyDown.right && this.x <= canvas.width - this.w) {
        this.x++;
            if (this.direction != 1) {
                this.direction = 1;
            }
        }
    }
}

function Hook() {
    this.hookSprite     = new Image();
    this.hookSprite.src = "hook.bmp";
    this.dropped        = false;
    this.raising        = false;
    this.spriteHeight   = 248;
    this.hookSz         = 20;

    //Keep a track of the rope length
    this.height         = 20;
    
    this.drop = function(){
        this.dropped = true;
        //console.log("Drop");
    }
        
    this.collision = function() {
        for (var i=0; i<shoal.fish.length; i++) {
            var f   = shoal.fish[i];
            var tip = boat.y + this.height;

            if (!(boat.x + boat.w/3 + this.hookSz < f.x || boat.x + boat.w/3 > f.x + f.w || 
                  tip < f.y || tip - this.hookSz > f.y + f.h)) {
                      console.log("Caught one");
                      f.caught = true;
                      this.raising = true;
            }
        }
    }
    this.draw = function(){
        if (this.dropped) {
            ctx.drawImage(this.hookSprite, 0, this.spriteHeight - this.height, 20, 
                          this.height, boat.x + boat.w/3, boat.y, 20, this.height);
        }
        // Move the hook up and down
        if (this.height < this.spriteHeight && this.dropped && !this.raising) {
            this.height++;
            //console.log("increment height");
        }
        else if (this.dropped && this.raising) {
            this.height--;
            //console.log("decrement height");
        }
        
        // Raise the hook upon reaching the sea bed
        if (this.height >= canvas.height/2 && this.dropped) {
            this.raising = true;
        }

        // Reset the hook upon reaching the boat again
        if (this.height <= 0 && this.dropped) {
            this.dropped = false;
            this.raising = false;

            // Remove any caught fish from the shoal
            for (var i = 0; i<shoal.fish.length; i++) {
                if (shoal.fish[i].caught) {
                    shoal.fish.splice(i, 1);
                    console.log("Sliced fish array");
                    game.score++;
                }
            }
        }
        hook.collision();
    }

}

function Fish(x, y, w, h, sprite) {
    this.x      = x;
    this.y      = y;
    this.w      = w;
    this.h      = h; 
    this.sprite = sprite;
    this.dir    = 1;
    this.caught = false;

    this.move = function() {
        // Swim the fish in the specified direction
        if (this.caught) {
            this.y = boat.y + hook.height; 
            this.x = boat.x + boat.w/3;
            console.log("Raising fishie!");
        }
        if (this.x >= 0 && this.x <= canvas.width - this.w) {
            if (this.dir == 1) {
                this.x++;
            }
            else if (this.dir == -1) {
                this.x--;
            }

            // Randomly change direction
            if (Math.random() > 0.99) {
                this.dir *= -1;
            }
        }
        else {
            this.dir *= -1;
            if (this.dir == 1) {
                this.x++;
            }
            else if (this.dir == -1) {
                this.x--;
            }
        }
    }

    this.draw = function() {
        if (this.dir == 1) {
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

function Shoal(n) {
    this.fish        = [];
    this.sprite      = new Image();
    this.sprite.src  = "goldfish.bmp";

    for (var i=0; i < n; i++) {
        this.fish.push(new Fish(Math.floor(Math.random() * (canvas.width-30)),
                                Math.floor((Math.random() * (canvas.height/2-20)))
                                + canvas.height/2, 30, 20, this.sprite))
    }

    this.drawAll = function(){
        for (var i=0; i<this.fish.length; i++) {
            this.fish[i].draw();
        }
    }

}


// Object assignments to variables
var stateHandler;
var game;
var boat;
var hook;
var shoal;

function setup() {
    // Object instantiations
    stateHandler = new StateHandler();
    game         = new Game();
    boat         = new Boat();
    hook         = new Hook();
    shoal        = new Shoal(5);

}

function draw() {
    // The main loop - checks the stateHandler and runs the appropriate loop
    if (stateHandler.startScreen) {
        game.startScreen();
    }
    else if (stateHandler.gameLoop) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.gameLoop();
    }
    else if (stateHandler.dead) {
        game.deathScreen();
    }
}

// call draw every 10ms
setup();        
setInterval(draw, 10);
