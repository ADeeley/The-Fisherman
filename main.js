var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

window.addEventListener("keydown", eventHandler, false);

var keys = {
    SPACE : 32,
}

var gradient = ctx.createLinearGradient(0, canvas.height/2 ,0, 500); 
gradient.addColorStop(0, "#1658EA");
gradient.addColorStop(1, "black");

function Game() {
    this.startScreen = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "40pt Ariel";
        ctx.fillStyle = "#EEF2FB";
        ctx.fillText("The Fisherman", canvas.height/2-140, 100);
        this.drawBackground();
    }
    this.gameLoop = function() {
    }
    this.deathScreen = function() {
        ctx.font = "40pt Ariel";
        ctx.fillStyle = "#c2c4ae";
        ctx.fillText("You died!", canvas.width/4, canvas.height/4);
    }
    this.victory = function() {
        ctx.font = "40pt Ariel";
        ctx.fillStyle = "#c2c4ae";
        ctx.fillText("You won!", canvas.width/4, canvas.height/4);
    }
    this.drawBackground = function() {
        ctx.beginPath();
        ctx.rect(0, canvas.height/2, canvas.width, canvas.height);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();
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
        }
    }
    else if (stateHandler.gameLoop) {
        if (e.keyCode == keys.SPACE) {

        }
    }
    else if (stateHandler.deathSequence) {
        if (e.keyCode == keys.SPACE) {
        }
    }
}

// Object assignments to variables
var stateHandler;
var game;

function setup() {
    // Object instantiations
    stateHandler = new StateHandler();
    game         = new Game();

}

function draw() {
    // The main loop - checks the stateHandler and runs the appropriate loop
    if (stateHandler.startScreen) {
        game.startScreen();
    }
    else if (stateHandler.gameLoop) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.log("here");
        game.gameLoop();
    }
    else if (stateHandler.dead) {
        game.deathScreen();
    }
}

// call draw every 10ms
setup();        
setInterval(draw, 10);
