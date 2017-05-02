//get all required modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var makeBoard_tcc = require('./TTTBoard.js');
var commands = ['create board', 'help', '', 'login challenge', 'won'];
var active_game = 0;
var channel_tttBoard = {};
channel_tttBoard["_"] = new makeBoard_tcc();
var port = process.env.PORT || 1337
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', (req, res)=>{ res.status(200).send('Hello World!') })
app.listen(port, function() {
    console.log('Listening on port ' + port)
})

	app.post("/", (req, res)=>{
		var cntrl = req.body;
		var slack = {
			channel: cntrl.channel_name, 
			usrName: cntrl.user_name, 
			text: cntrl.text 
		};
		var valid = {
			subChannel : "",
			newChannel : false, 
			sendNow : false,
			existingChannel: false
		};
		if(!channel_tttBoard[slack.slack.channel]){
			//undefined => false
			valid.existingChannel = true;
		}

		//init cmnds 
		if(valid.existingChannel){
			return intiboard(slackl.text)
			.then((response)=>{
				if(slack.text==="create board"){
					channel_tttBoard[curr_channel] = new makeBoard_tcc();
				}
				return res.status(200).json(response);
			});
		}

		//non board posting just logging in
		if(valid.existingChannel){
			if(slack.text === "" || slack.text === "help"){
				var mapping = {
					"": require('./nocommandjson.js'), 
					"help":  require("./helpjson.js")
					}
				return res.status(200).json(mapping.slack.text);
			}
			else if(slack.text === "won"){
				resptxt = require("./winnerJsonresp.js");
				return res.status(200).json(resptxt);
			}
			return loggingIn(slack.text, channel_tttBoard[curr_channel], slack.usrName)
			.then((response)=>{
				return res.status(200).json(response);
			});
		}

	} );

	var intiboard = function(text) {
		switch(text) {
			case "":
				return Promise.resolve(require("./nocommandjson.js"));
			case "create board": 
				return  Promise.resolve(require("./startgame.js"));
			case "help":
				return  Promise.resolve(require("./helpjson.js"));
			default:
				return  Promise.resolve({text:" :mad: bad command! "});
		}
	};

	var loggingIn = function(text, myboard, myName) {
		var opp="";
		if(text.length > 16){
			opp = text.substring(16, text.length);
			usrQ = text.substring(0, 15);
		}
		switch(usrQ){
			case "current board": 
				var boardify = {text : myboard.instr()};
				return Promise.resolve(boardify);
			case "login challenge":
				var bool = myboard.player_and_challenge(myName, opp);
				return (myName) ? require('./duelset.js') : { text: 'enough players as is' };
		}
	}

