
"use strict"

class Board { 


 constructor(playerOne, playerTwo) {
  this.playerOne = playerOne; 
  this.playerTwo = playerTwo;
 }

 toString(){
  return (`${this.playerOne}  ${this.playerTwo}`);
 }

 print(){
  console.log(this.toString());
 }

}


class TicTacToe extends Board {

 constructor(playerOne, playerTwo) {
  super(playerOne, playerTwo);
 }
 print() {
  super.print();
  console.log(`=>  ${this.playerOne} and ${this.playerTwo}`);
 }

}


var game = new TicTacToe("Me", "You");
game.print();