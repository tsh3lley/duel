var ai = {};

ai.predict = function(history) {
	var rock = 0, paper = 0, scissors = 0, total = 0;
	history.forEach(function(game) {
		switch(game) {
		    case 'rock':
		        rock ++;
		        break;
		    case 'paper':
		        paper ++;
		        break;
		    case 'scissors':
		        scissors ++;
		        break;
		}
		total++;
	});

	var plays = [rock, paper, scissors],
	    mostPlayed = Math.max.apply(Math.max, plays),
	    playNames = ["rock", "paper", "scissors"],
	    mostPlayedName = playNames[plays.indexOf(mostPlayed)];

	return counterPlay(mostPlayedName);
}

ai.pickWinner = function(botChoice, playerChoice) {
	switch(playerChoice) {
	    case 'rock':
	        switch(botChoice) {
			    case 'rock':
			        return 'tie';
			        break;
			    case 'paper':
			        return 'loss';
			        break;
			    case 'scissors':
			        return 'win';
			        break;
			}
	        break;
	    case 'paper':
	       	switch(botChoice) {
			    case 'rock':
			        return 'win';
			        break;
			    case 'paper':
			        return 'tie';
			        break;
			    case 'scissors':
			        return 'loss';
			        break;
			}
	        break;
	    case 'scissors':
	    	switch(botChoice) {
			    case 'rock':
			        return 'loss';
			        break;
			    case 'paper':
			        return 'win';
			        break;
			    case 'scissors':
			        return 'tie';
			        break;
			}
	        break;
	}
}

var counterPlay = function(play) {
	switch(play) {
	    case 'rock':
	        return 'paper';
	        break;
	    case 'paper':
	        return 'scissors';
	        break;
	    case 'scissors':
	        return 'rock';
	        break;
	}
}

module.exports = ai;