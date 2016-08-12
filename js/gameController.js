angular.module('RPSApp')
	.controller('GameController', GameController);

function GameController(){

	var self = this;

	this.startGame = function(){

		console.log("start game");
	
	}

	this.selectRock = function(){

		console.log("rock");
	
	}

	this.selectPaper = function(){

		console.log("paper");
	
	}

	this.selectScissors = function(){

		console.log("scissors");
	
	}
	
}