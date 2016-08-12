angular.module('RPSApp')
	.controller('GameController', GameController);

function GameController(){

	var self = this;

	self.message = "Ready?";
	self.playerIconURL = "";
	self.computerIconURL = "";



	self.init = function(){

		self.message = "Go!";

		startGame();
	
	}

	function startGame(){

		//show player button choice

	}

	function computerTurn() {

		var iconArray = ["rock", "paper", "scissors"];

		var number = Math.floor(((Math.random() * 3)));

		self.computerIconURL = "images/" + iconArray[number] + ".png";

	}

	self.selectRock = function(){
		self.playerIconURL = "images/rock.png";
		computerTurn();
	}

	self.selectPaper = function(){
		self.playerIconURL = "images/paper.png";
		computerTurn();
	}

	self.selectScissors = function(){
		self.playerIconURL = "images/scissors.png";
		computerTurn();
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