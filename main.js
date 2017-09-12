var canvas     = document.getElementById("myCanvas");
var ctx        = canvas.getContext("2d");

window.addEventListener("keydown", eventHandler, false);

var keys = {
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
    this.startScreen = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawBackground();
        this.drawTitle();
        boat.draw();
    }
    this.gameLoop = function() {
        this.drawBackground();
        boat.draw();
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

function eventHandler(e) {
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
            boat.moveLeft();
        }
        else if (e.keyCode == keys.D_Key) {
            boat.moveRight();
        }
    }
    else if (stateHandler.deathSequence) {
        if (e.keyCode == keys.SPACE) {
        }
    }
}

function Boat() {
    this.x         = canvas.width/2;
    this.y         = canvas.height/2;
    this.height    = 30;
    this.speed     = 3;

       
    //Boat sprite setup
    this.boatSprite = new Image();
    this.boatSprite.src = "boat.bmp";

    this.draw = function() {
        ctx.drawImage(this.boatSprite, this.x, this.y - this.height);
    }
    
    this.moveLeft = function() {
        this.x -= this.speed;
        console.log("left");
    }
    this.moveRight = function() {
        this.x += this.speed;
        console.log("right");
    }
}

// Object assignments to variables
var stateHandler;
var game;
var boat;

function setup() {
    // Object instantiations
    stateHandler = new StateHandler();
    game         = new Game();
    boat         = new Boat();

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
