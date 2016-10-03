// var actions = require('../actions/actions');#TODO 

var initialState = {
	wordToGuess : 'Fiesta from Reducer!'
};

var reducerCreator = function(state, action){
	state = state || initialState;
	return { 
		wordToGuess: 'Fiesta from Reducer'
	}
};

module.exports = reducerCreator;