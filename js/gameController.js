angular.module('RPSApp')
	.controller('GameController', GameController);

GameController.$inject = ['$scope', '$timeout'];

function GameController($scope, $timeout){

	var self = this;

	self.enableButtonClick = true;
	self.enableIconClick = false;
	self.gameState = false;
	self.winMessage = "";
	self.showWinMessage = false;
	self.buttonMessage = "Click to play..."

	resetVariables();

	self.startGame = function(){
		self.enableButtonClick = false;
		clearIcons();
		resetVariables();
		startNewRound();
	}

	function startNewRound(){
		self.enableIconClick = true;
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
		var winner = "";
		if (playerTurn === computerTurn){
			self.winMessage = "It's a draw!";
		} else if ((playerTurn == "rock" && computerTurn == "scissors") || (playerTurn == "scissors" && computerTurn == "paper") || (playerTurn == "paper" && computerTurn == "rock")){
			self.winMessage = playerTurn + " wins!";
			winner = "player";
		} else {
			self.winMessage = computerTurn + " wins!";
			winner = "computer";
		}
		flashMessage(winner);
	}

	function flashMessage(winner){
		$timeout(function(){
			self.showWinMessage = true;
			$timeout(function(){
				increaseScore(winner);
				self.showWinMessage = false;
				checkForChamp();
			}, 2000, true);
		}, 2000);
	}

	function increaseScore(winner){
		if(winner == "player"){
			self.playerScore++;
		} else if (winner == "computer"){
			self.computerScore++;
		}
	}

	function checkForChamp(){
		if (self.playerScore == 2) {
			self.champ = "Player";			
			self.buttonMessage = self.champ + " wins!!! Click to play again..."
			self.enableButtonClick = true;
			changeGameState();
		} else if (self.computerScore == 2){
			self.champ = "Computer";
			self.buttonMessage = self.champ + " wins!!! Click to play again..."
			self.enableButtonClick = true;
			changeGameState();
		} else {
			changeGameState();
			startNewRound();
		}
	}

	self.selectRock = function(){
		self.enableIconClick = false;
		var turn = "rock";
		completeRound(turn);
		self.highlightRock = true;
		$timeout(function(){
			self.highlightRock = false;
		}, 200, true);
	}

	self.selectPaper = function(){
		self.enableIconClick = false;
		var turn = "paper";
		completeRound(turn);
		self.highlightPaper = true;
		$timeout(function(){
			self.highlightPaper = false;
		}, 200, true);
	}

	self.selectScissors = function(){
		self.enableIconClick = false;
		var turn = "scissors";
		completeRound(turn);
		self.highlightScissors = true;
		$timeout(function(){
			self.highlightScissors = false;
		}, 200, true);
	}

	function startCountdown(){

		self.buttonMessage = "";

		var countdownArray = ["Ready?", "Ready?", "3", "2", "1"];
		var i = 0;

		function startLoop(){
			self.buttonMessage = countdownArray[i];
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