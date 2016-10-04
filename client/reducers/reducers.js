var actions = require('../actions/actions');

var initialState = {
	wordToGuess : []
};

var reducerCreator = function(state, action){
	state = state || initialState;

	var currentGame = {
		score: 0,
		feedback: null,
		currentWord: 0
	}

	if(action.type === actions.FETCH_WORD_SUCCESS){
		//Update Variable for current Game
		var index = currentGame.currentWord; // 0
		var spanishWord = action.data.items[index].spanish;
		currentGame.currentWord += 1;

		return{
			wordToGuess: spanishWord
		};
	} else if(action.type === actions.FETCH_WORD_ERROR){
		console.log(action.error);
	}

	return state;
};

module.exports = reducerCreator;