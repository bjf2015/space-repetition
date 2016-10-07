var actions = require('../actions/actions');
var update = require('react-addons-update');

var initialState = {
	wordToGuess : "Hello From reducer"
};

var reducerCreator = function(state, action){
	state = state || initialState;

	if(action.type === actions.LOGIN_GOOGLE_SUCCESS){
		console.log("Success loginin with Google");
		// console.log(document.cookie);
	}

	if(action.type === actions.FETCH_WORD_SUCCESS){
		console.log('fetch success');
		// console.log('current word:', action.data);

		var newState = update(initialState, {
		 	wordToGuess : {$set : action.data.question}	
		 	 
		 });
		// console.log(action);
		// console.log('newState:', newState);
		return newState;
		// return 'testing it!';


	} else if(action.type === actions.FETCH_WORD_ERROR){
		// console.log('error: ', action.error);
	}

	return state;
};

module.exports = reducerCreator;