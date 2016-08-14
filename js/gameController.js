angular.module('RPSApp')
	.controller('GameController', GameController);

GameController.$inject = ['$scope', '$timeout'];

function GameController($scope, $timeout){

	var self = this;

	self.gameState = false;
	self.winMessage = "";
	self.showWinMessage = false;
	self.buttonMessage = "Click to play..."

	resetVariables();

	self.startGame = function(){
		clearIcons();
		resetVariables();
		startNewRound();
	}

	function startNewRound(){
		clearIcons();
		startCountdown();
	}

	function changeGameState(){
		if(self.gameState){
			self.gameState = false;
		} else {
			self.gameState = true;
		}
	}

	function resetVariables(){
		clearIcons();
		self.playerScore = 0;
		self.computerScore = 0;
		self.champ = "";
		self.highlightRock = false;
		self.highlightPaper = false;
		self.highlightScissors = false;
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

	function clearIcons(){
		self.playerIconURL = "images/blank.png";
		self.computerIconURL = "images/blank.png";
	}

	function findWinner(playerTurn, computerTurn){
		if (playerTurn === computerTurn){
			self.winMessage = "It's a draw!";
			return;
		} else if ((playerTurn == "rock" && computerTurn == "scissors") || (playerTurn == "scissors" && computerTurn == "paper") || (playerTurn == "paper" && computerTurn == "rock")){
			self.winMessage = playerTurn + " wins!";
			self.playerScore++;
		} else {
			self.winMessage = computerTurn + " wins!";
			self.computerScore++;
		}

		$timeout(function(){
			flashMessage();
		}, 2000);
	}

	function flashMessage(winner){
		self.showWinMessage = true;
		$timeout(function(){
			self.showWinMessage = false;
			checkForChamp();
		}, 2000, true);
	}

	function checkForChamp(){
		if (self.playerScore == 2) {
			self.champ = "Player";			
			self.buttonMessage = self.champ + " wins!!! Click to play again..."
			changeGameState();
		} else if (self.computerScore == 2){
			self.champ = "Computer";
			changeGameState();
			self.buttonMessage = self.champ + " wins!!! Click to play again..."
		} else {
			changeGameState();
			startNewRound();
		}
	}

	self.selectRock = function(){
		var turn = "rock";
		completeRound(turn);
		self.highlightRock = true;
		$timeout(function(){
			self.highlightRock = false;
		}, 200, true);
	}

	self.selectPaper = function(){
		var turn = "paper";
		completeRound(turn);
		self.highlightPaper = true;
		$timeout(function(){
			self.highlightPaper = false;
		}, 200, true);
	}

	self.selectScissors = function(){
		var turn = "scissors";
		completeRound(turn);
		self.highlightScissors = true;
		$timeout(function(){
			self.highlightScissors = false;
		}, 200, true);
	}

	function startCountdown(){

		self.buttonMessage = "";
		var countdownArray = ["3", "2", "1"];
		var i = 0;

		function startLoop(){
			self.buttonMessage = countdownArray[i];
			console.log(self.buttonMessage);
			$timeout(function(){
				if(i < countdownArray.length - 1){
					i++;
					startLoop();
				} else {
					changeGameState();
				}
			}, 1000);
		}
		startLoop();
	}
	
}