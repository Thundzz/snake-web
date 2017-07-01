var snakeSize = 32;
mapLength = 25;
mapHeight = 19;

var game = new Phaser.Game(snakeSize * mapLength, snakeSize * mapHeight, Phaser.CANVAS, 'phaser-example');
game.state.add('game', gameState);
game.state.start('game'); 
