var boxWidth = 101;
var boxHeight = 83;
var bugY = 60;

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //Math random return a number 0 to 1. So this give us 
    //Speeds of 100 to 1100
    this.speed = Math.floor(Math.random()*(1000)+100);
    //X and Y are the location of the player
    this.x = x;
    this.y = y;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x > boxWidth*5) {
        this.x = -boxWidth
    } else {
        this.x += dt * this.speed
    }

    if (!(this.x >= player.x + boxWidth ||
          this.x + boxWidth < player.x ||
          this.y >= player.y + boxHeight ||
          this.y + boxHeight < player.y))
    {
        console.log('Player died');
        player.reset()
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
}

Player.prototype.update = function(dt) {

}

Player.prototype.reset = function() {
    this.x = boxWidth*2;
    this.y = boxWidth*4;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key){
    switch(key) {
        case 'up':
            if (this.y > 0) {
                this.y -= boxHeight;
            }
            break;
        case 'down':
            if (this.y < boxWidth*4) {
                this.y += boxHeight;
            }
            break;
        case 'left':
            if (this.x > 0) {
                this.x -= boxWidth;
            }
            break;
        case 'right':
            if (this.x < boxWidth*4) {
                this.x += boxWidth;
            }
            break;
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var en = new Enemy(0, bugY+boxHeight);
var en2 = new Enemy(0, bugY);
var en3 = new Enemy(0, bugY+boxHeight*2);

var allEnemies = [en, en2, en3];

var player = new Player(boxWidth*2,boxWidth*4)



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
