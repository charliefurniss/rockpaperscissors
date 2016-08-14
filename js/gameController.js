angular.module('RPSApp')
	.controller('GameController', GameController);

function GameController(){

	var self = this;

	self.gameState = false;
	self.buttonMessage = "Click to play..."

	resetVariables();

	function changeGameState(){
		if(self.gameState){
			self.gameState = false;
		} else {
			self.gameState = true;
		}
	}

	self.startGame = function(){
		changeGameState();
		resetVariables();
	}

	function resetVariables(){
		self.playerIconURL = "images/blank.png";
		self.computerIconURL = "images/blank.png";
		self.playerScore = 0;
		self.computerScore = 0;
		self.champ = "";
		self.highlightRock = "";
		self.highlightPaper = "";
		self.highlightScissors = "";
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
			return;
		} else if ((playerTurn == "rock" && computerTurn == "scissors") || (playerTurn == "scissors" && computerTurn == "paper") || (playerTurn == "paper" && computerTurn == "rock")){
			self.playerScore++;
		} else {
			self.computerScore++;
		}
		checkForChamp();
	}

	function checkForChamp(){
		if (self.playerScore == 2) {
			self.champ = "Player";
			changeGameState();
			self.buttonMessage = self.champ + " wins!!! Click to play again..."
		} else if (self.computerScore == 2){
			self.champ = "Computer";
			changeGameState();
			self.buttonMessage = self.champ + " wins!!! Click to play again..."
		} else {
			return;
		}
	}

	self.selectRock = function(){
		var turn = "rock";
		completeRound(turn);
		self.highlightRock = "red-rock";
	}

	self.selectPaper = function(){
		var turn = "paper";
		completeRound(turn);
		self.highlightPaper = "red-paper";
	}

	self.selectScissors = function(){
		var turn = "scissors";
		completeRound(turn);
		self.highlightScissors = "red-scissors";
	}

	// function startCountdown(){

	// 	var countdownArray = ["3", "2", "1", "Go!"];
	// 	var i = 0;

	// 	function startLoop(){
	// 		$timeout(function(){
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