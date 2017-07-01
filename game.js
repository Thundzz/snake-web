var gameState = {
	preload: preload,
	create: create,
	update: update,
	render: render
};

var c = 0;

function preload() {
	game.load.image('square', 'square.png');
	game.load.image('food', 'food.png');
}

var snakeHead;
var snakeSection = new Array();
var snakePath = new Array();
var snakeGroup;
var move = null;
var food = null;
var score = 0;
var pendingBlock = null;

var text;
var SCORE_TEXT = "Score : ";


function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.world.setBounds(0, 0, snakeSize * mapLength, snakeSize * mapHeight);
	snakeGroup = game.add.physicsGroup();

	cursors = game.input.keyboard.createCursorKeys();
	initializeSnake();
	initializeScore();
	registerInputHandlers();
	move = moveRight;
	game.physics.enable(snakeGroup, Phaser.Physics.ARCADE);
}

function initializeScore() {
	text = game.add.text(snakeSize * (mapLength - 1), snakeSize, SCORE_TEXT, {
		font: "24px Arial",
		fill: "#777777",
		align: "center"
	});
	text.anchor.setTo(1, 0);
}

function moveLeft(sprite) {
	sprite.x -= 32;
	sprite.x = (sprite.x + 32 * mapLength) % (32 * mapLength);
}

function moveRight(sprite) {
	sprite.x += 32;
	sprite.x = sprite.x % (32 * mapLength);
}

function moveUp(sprite) {
	sprite.y -= 32;
	sprite.y = (sprite.y + 32 * mapHeight) % (32 * mapHeight);
}

function moveDown(sprite) {
	sprite.y += 32;
	sprite.y = sprite.y % (32 * mapHeight);
}


function registerInputHandlers() {

	key1 = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	key1.onDown.add(setMovementUp, this);
	key1 = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	key1.onDown.add(setMovementDown, this);
	key1 = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	key1.onDown.add(setMovementLeft, this);
	key1 = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	key1.onDown.add(setMovementRight, this);

}

function setMovementUp() {
	if (move != moveDown && played) {
		move = moveUp;
		played = false;
	}
}

function setMovementDown() {
	if (move != moveUp && played) {
		move = moveDown;
		played = false;
	}
}

function setMovementLeft() {
	if (move != moveRight && played) {
		move = moveLeft;
		played = false;
	}
}

function setMovementRight() {
	if (move != moveLeft && played) {
		move = moveRight;
		played = false;
	}
}

function initializeSnake() {
	for (var i = 0; i < 3; i++) {
		snakeSection[i] = game.add.sprite(Math.floor(mapLength / 2) * 32 - 32 * i, Math.floor(mapHeight / 2) * 32, 'square');
		snakeSection[i].anchor.setTo(0, 0);
		snakeGroup.add(snakeSection[i]);
	}
	snakeHead = snakeSection[0];
}

function is_eating() {
	if (food != null && snakeSection[0].position.x === food.position.x && snakeSection[0].position.y === food.position.y) {
		return true;
	}
	return false;
}

function spawn_food() {
	if (food == null) {

		var coord = pickCoordinate();
		food = game.add.sprite(coord.x, coord.y, 'food');
		food.anchor.setTo(0, 0);
	}
}

function update() {
	if (c % 10 == 0) {
		game.physics.arcade.collide(snakeGroup, snakeGroup, endGame);
		spawn_food();
		for (var i = snakeSection.length - 1; i > 0; i--) {
			snakeSection[i].x = snakeSection[i - 1].x;
			snakeSection[i].y = snakeSection[i - 1].y;
		}
		move(snakeSection[0]);
		played = true;

		if (pendingBlock !== null) {
			snakeGroup.add(pendingBlock);
			pendingBlock = null;
		}
		if (is_eating()) {
			food.destroy();
			food = null;
			score += 1;
			var last_element = snakeSection[snakeSection.length - 1];
			var newSnakeSection = game.add.sprite(last_element.position.x, last_element.position.y, 'square');
			pendingBlock = newSnakeSection;
			snakeSection.push(newSnakeSection);
		}
		text.setText(SCORE_TEXT + score);
	}
	c++;
}

function endGame(){
	game.state.start('end'); 
}

function render() {}

function map2pix(px) {
	return px * 32;
}

function pickCoordinate() {
	return {
		x: map2pix(cocorico(0, mapLength)),
		y: map2pix(cocorico(0, mapHeight))
	};
}

function cocorico(min, max) {
	return (Math.floor((max - min) * Math.random()) + min);
}