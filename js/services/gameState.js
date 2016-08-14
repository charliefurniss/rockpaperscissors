angular
  	.module('RPSApp')
  	.service('GameStateService', GameStateService);

function GameStateService() {

 	var self = this;

 	self.gameState = false;

 	self.toggleGameState = function(){
 		if(self.gameState){
 			self.gameState = false;
 		} else {
 			self.gameState = true;
 		}
 		return self.gameState;
 	}

}