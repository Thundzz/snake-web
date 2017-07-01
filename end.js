var endState = {
	create: function() {
		text = game.add.text(game.world.centerX,
			game.world.centerY,
			`You lost\n${score} points earned.`, {
				font: "64px Arial",
				fill: "#FFFFFF",
				align: "center"
			});
		text.anchor.setTo(0.5, 0.5);
	}
};