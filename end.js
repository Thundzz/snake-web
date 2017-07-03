var endState = {
	create: function() {
		gameOver = game.add.text(game.world.centerX,
			game.world.centerY-35,
			"Game Over", {
				font: "64px Arial",
				fill: "#FFFFFF",
				align: "center"
			});
		gameOver.anchor.setTo(0.5, 0.5);

		scoreText = game.add.text(game.world.centerX,
			game.world.centerY+35,
			`${score} points earned.`, {
				font: "42px Arial",
				fill: "#FFFFFF",
				align: "center"
			});
		scoreText.anchor.setTo(0.5, 0.5);

		commands = game.add.text(game.world.centerX,
			game.world.centerY+100,
			`Press enter to restart the game.`, {
				font: "42px Arial",
				fill: "#ffffcc",
				align: "center"
			});
		commands.anchor.setTo(0.5, 0.5);

		this.registerInputHandlers();
	},
	registerInputHandlers: function() {
		key1 = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		key1.onDown.add(this.restartGame, this);
	},
	restartGame: function() {
		game.state.start('game');
	}


};
