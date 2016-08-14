angular.module('RPSApp')
	.controller('GameController', GameController);

GameController.$inject = ['$scope', '$timeout', 'GameStateService'];

function GameController($scope, $timeout, GameState){

	var self = this;

	self.enableButtonClick = true;
	self.enableIconClick = false;
	self.gameState = GameState.gameState;
	self.winMessage = "";
	self.buttonMessage = "Click to play..."

	console.log(self.gameState);

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

	function resetVariables(){
		clearIcons();
		self.playerScore = 0;
		self.computerScore = 0;
		self.champ = "";
		self.highlightStartButton = false;
		self.highlightRock = false;
		self.highlightPaper = false;
		self.highlightScissors = false;
	}

	function computerSelect(){
		var iconArray = ["rock", "paper", "scissors"];
		var number = Math.floor(((Math.random() * 3)));
		return iconArray[number];
	}

	function completeRound(playerTurn){
		var computerTurn = computerSelect();
		self.playerIconURL = "images/" + playerTurn + ".png";
		self.computerIconURL = "images/" + computerTurn + ".png";
		
		var winner = findWinner(playerTurn, computerTurn);
		self.winMessage = createWinMessage(winner, playerTurn, computerTurn);
		flashMessage(winner);
	}

	function clearIcons(){
		self.playerIconURL = "images/blank.png";
		self.computerIconURL = "images/blank.png";
	}

	function findWinner(playerTurn, computerTurn){
		if (playerTurn === computerTurn){
			return "draw";
		} else if ((playerTurn == "rock" && computerTurn == "scissors") || (playerTurn == "scissors" && computerTurn == "paper") || (playerTurn == "paper" && computerTurn == "rock")){
			return "player";
		} else {
			return "computer";
		}
	}

	function createWinMessage(winner, playerTurn, computerTurn){
		if (winner == "draw"){
			return "It's a draw!";
		} else if (winner == "player") {
			return playerTurn + " wins!";
		} else {
			return computerTurn + " wins!";
		}
	}

	function flashMessage(winner){
		$timeout(function(){
			showRelevantMessage(winner);
			$timeout(function(){
				increaseScore(winner);
				self.showPlayerWinMessage = false;
				self.showComputerWinMessage = false;
				checkForChamp();
			}, 2000, true);
		}, 2000);
	}

	function showRelevantMessage(winner){
		if (winner == "draw"){
			self.showPlayerWinMessage = true;
			self.showComputerWinMessage = true;
		}
		else if (winner == "player"){
			self.showPlayerWinMessage = true;
		} else {
			self.showComputerWinMessage = true;
		}
	}

	function increaseScore(winner){
		if(winner == "player"){
			self.playerScore++;
		} else if (winner == "computer"){
			self.computerScore++;
		}
	}

	function checkForChamp(){
		if((self.playerScore != 2) && (self.computerScore != 2)){
			self.gameState = GameState.toggleGameState();
			startNewRound();
		} else {
			identifyChamp();
		}
	}

	function identifyChamp(){
		self.highlightStartButton = true;
		self.enableButtonClick = true;
		if (self.playerScore == 2) {
			self.champ = "Player";
			self.buttonMessage = self.champ + " wins!!! Click to play again..."
		} else if (self.computerScore == 2){
			self.champ = "Computer";
			self.buttonMessage = self.champ + " wins!!! Click to play again..."
		}
		self.gameState = GameState.toggleGameState();
	}

	self.selectRock = function(){
		var turn = "rock";
		completeRound(turn);

		self.enableIconClick = false;
		self.highlightRock = true;
		$timeout(function(){
			self.highlightRock = false;
		}, 200, true);
	}

	self.selectPaper = function(){
		var turn = "paper";
		completeRound(turn);
		
		self.enableIconClick = false;
		self.highlightPaper = true;
		$timeout(function(){
			self.highlightPaper = false;
		}, 200, true);
	}

	self.selectScissors = function(){
		var turn = "scissors";
		completeRound(turn);
		
		self.enableIconClick = false;
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
					self.gameState = GameState.toggleGameState();
				}
			}, 1000);
		}

		startLoop();
	}
	
}