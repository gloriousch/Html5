// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// player image
var playerReady = false;
var playerImage = new Image();
playerImage.onload = function () {
    playerReady = true;
};
playerImage.src = "images/player.png";

// food image
var foodReady = false;
var foodImage = new Image();
foodImage.onload = function () {
    foodReady = true;
};
foodImage.src = "images/food.png";

// Game objects
var player = {
	speed: 256 // movement in pixels per second
};
var food = {};
var foodsCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a food
var reset = function () {
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;

	// Throw the food somewhere on the screen randomly
    food.x = 32 + (Math.random() * (canvas.width - 64));
    food.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
        player.y -= player.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
        player.y += player.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
        player.x -= player.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
        player.x += player.speed * modifier;
	}

	// Are they touching?
	if (
        player.x <= (food.x + 32)
		&& food.x <= (player.x + 32)
		&& player.y <= (food.y + 32)
		&& food.y <= (player.y + 32)
	) {
		++foodsCaught;
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (playerReady) {
		ctx.drawImage(playerImage, player.x, player.y);
	}

	if (foodReady) {
		ctx.drawImage(foodImage, food.x, food.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Cherry caught: " + foodsCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};


if(player.x > canvas.width){
    player.x = 512;
}
if(player.x < 512){
    player.x = canvas.width -512;
}

if(player.y > canvas.height){
    player.y = 32;
}
if(player.y < 32){
    player.y = canvas.width -32;
}
// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
