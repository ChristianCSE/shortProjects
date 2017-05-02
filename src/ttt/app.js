//get all required modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var makeBoard_tcc = require('./TTTBoard.js');
var commands = ['create board', 'help', '', 'login challenge', 'won'];
// var boolean = array.includes(searchElement[, fromIndex])
var active_game = 0;

var channel_tttBoard = {};
channel_tttBoard["_"] = new makeBoard_tcc();
var port = process.env.PORT || 1337
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', function(req, res) { res.status(200).send('Hello World!') })
app.listen(port, function() {
    console.log('Listening on port ' + port)
})

app.post('/ttt', function(req, res, next) {
    var curr_channel = req.body.channel_name;
    var user_name = req.body.user_name;
    var user_text_q = req.body.text;
    var sub_challenge = ''
    var new_channel = false;
    var sendnow = false;
    var existing_chan = false;
    if (channel_tttBoard[curr_channel] != undefined) { existing_chan = true; }

/*===================
Init commands
===================**/
if (!existing_chan) {
        switch (user_text_q) {
            case '':
                resp_text = require('./nocommandjson.js');
                sendnow = true;
                break;
            case 'create board':
                new_channel = false;
                resp_text = require("./startgame.js");
                channel_tttBoard[curr_channel] = new makeBoard_tcc();
                sendnow = true;
                break;
            case 'help':
                var resp_text = require("./helpjson.js");
                sendnow = true;
                break;
            default:
                var resp_text = { text: ":mad: bad command" };
                sendnow = true;
                break; //for default tell them to iniate the board
        }
    } //if()
if (sendnow) {return res.status(200).json(resp_text); }


/*======================================
NON BOARD POSTING JUST LOGGING IN
======================================**/
    if (existing_chan) {
        var opp = ''
        if (user_text_q.length > 16) {
            opp = user_text_q.substring(16, user_text_q.length);
            user_text_q = user_text_q.substring(0, 15)
        }
        switch (user_text_q) {
            case '':
                resp_text = require('./nocommandjson.js');
                return res.status(200).json(resp_text);
                break;
            case 'current board':
                var myBoardString = channel_tttBoard[curr_channel].instr();
                var resp_text = { text: myBoardString };
                return res.status(200).json(resp_text);
                break;
            case 'help':
                var resp_text = require("./helpjson.js");
                return res.status(200).json(resp_text);
                break;
            case 'login challenge':
                //console.log(" this is the person you want to play with", opp);
                var bool = channel_tttBoard[curr_channel].player_and_challenge(user_name, opp);
                if (bool) {
                    var resp_text = require('./duelset.js');
                    return res.status(200).json(resp_text)
                } else {
                    var resp_text = { text: 'enough players as is' };
                    return res.status(200).json(resp_text)
                }
                break;
            case 'won':
                var resp_text = require("./winnerJsonresp.js");
                return res.status(200).json(resp_text);
            default:
                break;
        } //switch()
    } //if()


/*===================
RESTART
===================**/
 if (existing_chan && user_text_q === 'rematch') {
            channel_tttBoard[curr_channel].declareRematch();
            resp_text = require('./rematch.js');
            existing_chan = false;
            return res.status(200).json(resp_text);
}
var mademove = false;
    if (existing_chan) {
        if (user_text_q.length === 6 && channel_tttBoard[curr_channel].checkloggers())
        {
            var cmnd = user_text_q.substring(0, 4);
            if (cmnd == 'mark') {
                var boxnumber = user_text_q.substring(user_text_q.length - 1); //box area
                var potential_name = "";
                var res_case = channel_tttBoard[curr_channel].players_turn(boxnumber, user_name);

                if (res_case.length > 9)
                {
                    potential_name = res_case.substring(10, res_case.length);
                    console.log(potential_name);
                    res_case = res_case.substring(0, 8);
                    console.log('should be: ',res_case);
                }
                switch (res_case) {
                    case 'winner':
                        resp_text = require('./winnerJsonresp.js');
                        mademove = true;
                        break;
                    case 'out':
                        resp_text = require('./outofbounds.js');
                        mademove = true;
                        break;
                    case 'wrong':
                        var resp_text = { text: ":smiling_imp: it's not your turn just yet!" };
                        mademove = true;
                        break;
                    case 'oldmove':
                        var ree = { text: ":smiling_imp: some already made that move. Make another" };
                        mademove = true;
                        break;
                    case 'your turn':
                        var init_resp = 'Hey!' + potential_name + 'it is your turn';
                        console.log(init_respm, '                                                        line145');
                        init_resp = init_resp + '\n' + channel_tttBoard[curr_channel].instr();
                        console.log(init_resp, '                                                        line148');
                        var resp_text = { response_type: 'ephemeral', text: init_resp };
                        var resp_text = init_resp;
                        console.log(resp_text);
                        mademove = true;
                        break;
                    case 'game over':
                        var resp_text = require('./gameover');
                    case 'loser':
                        var resp_text = require('./losercalls');
                        break;
                    default:
                        var resp_text = { text: 'none' };
                        console.log('                                                        line160');
                        mademove = true;
                        break;
                } //switch()
            } //if(mark)
        } //if(length and logged)
        if(mademove){return res.status(200).json(resp_text);}
        var resp_text = { text: 'none' };
        if (user_name != 'slackbot') {
            return res.status(200).json(resp_text)
        } else {
            return res.status(200).end();
        }
    }
});
