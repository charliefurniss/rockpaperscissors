angular.module('RPSApp')
	.controller('GameController', GameController);

function GameController(){

	var self = this;

	self.message = "Ready?";
	self.playerIconURL = "";
	self.computerIconURL = "";
	self.playerScore = 0;
	self.computerScore = 0;
	self.buttonMessage = "Click to start..."

	self.init = function(){
		self.message = "Go!";
		startGame();
	}

	function startGame(){

		//show player button choice

	}

	function computerSelect() {
		var iconArray = ["rock", "paper", "scissors"];
		var number = Math.floor(((Math.random() * 3)));
		return iconArray[number];
	}

	function completeRound(playerTurn){
		var computerTurn = computerSelect();
		self.playerIconURL = "images/" + playerTurn + ".png";
		self.computerIconURL = "images/" + computerTurn + ".png";
		findWinner(playerTurn, computerTurn);
	}

	function findWinner(playerTurn, computerTurn){

		if (playerTurn === computerTurn){
			console.log("draw");
		} else if ((playerTurn == "rock" && computerTurn == "scissors") || (playerTurn == "scissors" && computerTurn == "paper") || (playerTurn == "paper" && computerTurn == "rock")){
			self.playerScore++;
		} else {
			self.computerScore++;
		}

		checkForChamp();

	}

	function checkForChamp(){

		if (self.playerScore == 2) {

			self.buttonMessage = "Player wins!!! Play again?";

			console.log(self.champ);

		} else if (self.computerScore == 2){

			self.buttonMessage = "Computer!!! Play again?";
			console.log(self.champ);

		} else {
			return;
		}

	}

	self.selectRock = function(){
		var turn = "rock";
		completeRound(turn);
	}

	self.selectPaper = function(){
		var turn = "paper";
		completeRound(turn);
	}

	self.selectScissors = function(){
		var turn = "scissors";
		completeRound(turn);
	}

	// function startCountdown(){

	// 	var countdownArray = ["3", "2", "1", "Go!"];
	// 	var i = 0;

	// 	function startLoop(){
	// 		setTimeout(function(){
	// 			if(i < countdownArray.length){
	// 				this.countdown = countdownArray[i];
	// 				i++;
	// 				startLoop();
	// 			}
			
	// 		}, 1000);
	// 	}

	// 	startLoop();

	// }
	
}