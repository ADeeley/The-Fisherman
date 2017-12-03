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