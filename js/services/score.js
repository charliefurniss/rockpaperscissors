angular
  	.module('RPSApp')
  	.service('ScoreService', ScoreService);

function ScoreService() {

 	var self = this;

 	self.playerScore = 0;
 	self.computerScore = 0;

 	self.increaseScore = function(winner){
		if(winner == "player"){
			self.playerScore++;
		} else if (winner == "computer"){
			self.computerScore++;
		}
	}

}