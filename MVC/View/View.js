var View = function() {

	return this;
};

View.prototype.render = function() {
	var interactive = true;
	var stage = new PIXI.Stage(0x66FF99, interactive);

	var renderer = PIXI.autoDetectRenderer(840, 500);

	document.getElementById("output").appendChild(renderer.view);

	var text = new PIXI.Text("Dealer Cards:\n\n\n\n\nYour Cards:", {
		font : "bold italic 35px Desyrel",
		align : "center"
	});
	text.position.x = 280;
	text.position.y = 70;
	text.anchor.x = 0.5;

	stage.addChild(text);

	var pointText = new PIXI.Text("10\n\n\n18", {
		font : "bold italic 60px Desyrel",
		align : "center"
	});
	pointText.position.x = 280;
	pointText.position.y = 120;
	pointText.anchor.x = 0.5;

	stage.addChild(pointText);

	var hitButton = new MEButton(417, 430, 80, 30, "HIT", stage, function(data) {
		console.log("HIT button clicked");
	});
	var standButton = new MEButton(607, 430, 80, 30, "STAND", stage, function(data) {
		console.log("STAND button clicked");
	});

	function animate() {
		renderer.render(stage);
		requestAnimFrame(animate);
	}

	requestAnimFrame(animate);

	var cards = new Array();

	this.setDealerPointsText = function(points) {
		var splitStr = pointText.text.split("\n\n\n");
		pointText.setText(points + "\n\n\n" + splitStr[1]);
	}

	this.setPlayerPointsText = function(points) {
		var splitStr = pointText.text.split("\n\n\n");
		pointText.setText(splitStr[0] + "\n\n\n" + points);
	}

	this.giveCardToDealer = function(text) {

	}
	this.addCard = function(x, y, text) {
		var cardView = new CardView(x, y, stage);
		cardView.setCard(text);

		cards.push(cardView);
		return cardView;
	}
	this.removeCard = function(CardText) {
		var position = this.cards.indexOf(findCard(CardText));
		if (~position)
			cards.slice(position, 1);
		card.destroy();
		/*
		 var tag_story = [1, 3, 56, 6, 8, 90], id_tag = 56, position = tag_story.indexOf(id_tag);
		 if (~position)
		 tag_story.splice(position, 1);
		 */
	}

	this.turnFaceUp = function(CardText) {
		findCard(CardText).turnFaceUp();
	}

	this.turnFaceDown = function(CardText) {
		findCard(CardText).turnFaceDown();
	}
	
	var findCard = function(CardText) {
		for (var i = 0; i < cards.length; i++) {
			if (cards[i].text() == CardText) {
				return cards[i];
			}
		}
	}
};
