		var Gifcontainer = function(){
			this.needshelp =   {
			"response_type": "ephemeral",
		    "text": ":ghost: *Hey! These are the rules to the game: /ttt [commands]* ",
		    "attachments": [{
		        "color": "#36a64f",
		        "text":
		        "Order: start->playcall name -> mark # \nformat: cmnd [available to]\nhelp: see the full guide for all available commands\n see board: privately view the current state of the TTT board [all] \n start: initiate the board\nmark #: the position you want to mark with either X or O on the TTT Board [players only]\n playcall name: start a match and define players as you and name [all] \nrematch: restart the game, you have to create the board again![players] \n ",
		        "image_url": "http://i.giphy.com/U1Y2zn1vyzNGE.gif",
		        "footer": "TTT Game"
		    }]
		};

			this.startgame = {
				"response_type": "in_channel",
				"text": "Hi! So you want to play some tic-tac-toe huh :sunglasses:?",
				"fallback": "Error, well this is embarrassing :sob:! ",
				"attachments": [{
					"text": "Let's get ready for some!!!! ",
					"image_url": "http://i.giphy.com/ZOkZMEY7SgozC.gif"
				}]
			};

			this.nocommand = {
			        "response_type": "ephemeral",
			        "text": "Yeah...:smirk: you might want to input a command!",
			        "attachments": [{
			                "title": ":joy_cat:  LOL we are so getting fired today while playing!!!",
			                "fallback": "You are unable to choose a game",
			                "callback_id": "wopr_game",
			                "image_url": "http://i.giphy.com/l46CyJmS9KUbokzsI.gif",
			                "color": "#3AA3E3",
			                "attachment_type": "default"
			            }]
			};

			this.duelset = {
				"response_type": "in_channel",
			 "attachments": [{
			"text": ":ghost: Let the match begin! FIGHT!",
			"image_url": "http://i.giphy.com/w5FSoU86sXRFm.gif"
			 }]
		};

		this.rematch ={
	"response_type": "in_channel",
	"text": "It's over lol :joy: why would you do this",
	"fallback": "Error, well this is embarrassing :sob:! ",
	"attachments": [{
		"text": "I guess you really do want a rematch",
		"image_url": "http://i.giphy.com/qwctxOlLzSEes.gif"
	}]
};

this.outofbounds = {
			"response_type": "ephemeral",
			"text": "Uh...:confused: the board says 0-8",
        "attachments": [{
                "title": ":joy: 0, 1, 2, 3, 4, 5, 6, 7, 8 in case you forgot",
                "fallback": "You are unable to choose a game",
                "image_url": "http://i.giphy.com/LnKa2WLkd6eAM.gif",
                "color": "danger",
                "attachment_type": "default"
            }]
};

 this.gameover = {
	"response_type": "in_channel",
	"text": ":sob: game is over ",
	"fallback": "Error, well this is embarrassing :sob:! ",
	"attachments": [{
		"text": "you can do a rematch by doing [rematch]",
		"image_url": "http://i.giphy.com/13S0cgc6oDYqPK.gif"
	}]
};

this.sorewinner = {
	"response_type": "ephemeral",
	"text": "Come on, don't be a sore winnre now :sunglasses:?",
	"fallback": "Error, well this is embarrassing :sob:! ",
	"attachments": [{
		"image_url": "http://i.giphy.com/3oEdvcmfA5k080WcUg.gif"
	}]
};
this.losercalls ={
	"response_type": "ephemeral",
	"text": "It's over lol :joy: don't be a sore loser :angry:",
	"fallback": "Error, well this is embarrassing :sob:! ",
	"attachments": [{
		"text": "Maybe next time :smirk:",
		"image_url": "http://i.giphy.com/UAxRZkxU68IAU.gif"
	}]
};

	}
	module.exports = Gifcontainer;
