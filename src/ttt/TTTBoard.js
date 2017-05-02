var TTTBoard = function() {
    var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    var allowed = [" ", "_"];
    var num_players = 0;
    var winner = false;
    var count_move = 0;
    var currplayer = "none";
    var winplay = '';
/*==========================================
Setters:  players, mark cell
==========================================*/
    this.setPlayers = function(player, challenged)
    {
        if (num_players == 0) {
            num_players = 2;
            currplayer = player + '';
            allowed[0] = player;
            allowed[1] = challenged;
            return true;
        } else {
            return false;
        }
    }
    this.players_turn = function(position, plyr) {
            if (count_move === 9)
                return 'game over'; // draw
            else if (winner)
            {
                if (winplay != plyr)
                    return 'loser';
                else
                    return 'sore winner'
            } //win
            else if (currplayer != plyr)
                return 'wrong';
            else if (position > 8 || position < 0)
                return 'out';
            else if (!Number.isInteger(board[position]))
                return 'oldmove';
            else if (plyr == allowed[0])
            {
                count_move++;
                board[position] = 'X';
                currplayer = allowed[1];
                if (count_move > 4 && this.checkForWinner(plyr))
                {
                    console.log(winner);
                    winplay = plyr;
                    winner = true;
                    return 'winner';
                }
                else{
                    var rer = "your turn " + currplayer;
                    console.log(rer);
                    return rer;
                }
            }
            else if (plyr == allowed[1])
            {
                count_move++;
                board[position] = 'O';
                currplayer = allowed[0];
                if (count_move > 4 && this.checkForWinner(plyr)) {
                    console.log(winner)
                    winplay = plyr;
                    winner = true;
                    return 'winner';
                }
                else {
                    var rer = "your turn " + currplayer;
                    console.log(rer);
                    return rer;
                }
            }
            else
                return 'none';
        }
/*==========================================
Getters: checkWinner (Horiz, Vert, Diag), TTT-Board, Winner
==========================================*/
    this.checkForWinner = function(plyr) {
        if (this.checkHorizontal()) {
            winner = true;
            return true;
        } else if (this.checkVertical()) {
            winner = true;
            return true;
        } else if (this.checkDiag()) {
            winner = true;
            return true;
        } else {
            return false;
        }
    }
    this.checkHorizontal = function() {
        if (board[0] == board[1]) {
            if (board[0] == board[2]) {
                return true;
            }
        }
        if (board[3] == board[4]) {
            if (board[3] == board[5]) {
                return true;
            }
        }
        if (board[6] == board[7]){
            if (board[7] == board[8]){
                return true;
            }
        } else
            return false;
    }
    this.checkVertical = function() {
        if (board[0] == board[3]) {
            if (board[0] == board[6]) {
                return true;
            }
        }
        if (board[1] == board[4]) {
            if (board[1] == board[7]) {
                return true;
            }
        }
        if (board[2] == board[5]) {
            if (board[5] == board[8]) {
                return true;
            }
        } else
            return false;
    }
    this.checkDiag = function() {
        if (board[0] == board[4]) {
            if (board[4] == board[8]){
                return true;
            }
        }
        if (board[6] == board[4]) {
            if (board[4] == board[2]) {
                return true;
            }
        } else
            return false;
    }
    this.instr = function() {
        var string_board = "";
        for (var i = 0; i < board.length; i++) {
            string_board = string_board + ' ' + board[i];
            if (((i + 1) % 3) == 0) {
                string_board = string_board + "\n"
            }
        } //for()
        return string_board;
    }
/*==========================================
Checkers: winner, logged in, valid user
==========================================*/
this.whowon = function()
    {
        if(winner){
            return winplay;
        }
        else
        {
            return '';
        }
    }
this.isPlayer = function(name)
    {
      if (-1 != allowed.indexOf(name))
        return true;
      else
        return false;
    }
}
module.exports = TTTBoard
