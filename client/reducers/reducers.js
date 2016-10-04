var actions = require('../actions/actions');

var initialState = {
	wordToGuess : ""
};

var reducerCreator = function(state, action){
	state = state || initialState;


	if(action.type === actions.FETCH_WORD_SUCCESS){
		console.log('fetch success');
		//Update Variable for current Gam
		// console.log(action.data, 'checking if it loops');
		// change to react imm helupers, to just upadte the rigth properter
		// var newState = update(initialState, {
		// 	wordToGuess: { $set : action.data }
		// });
		return{
			wordToGuess: action.data
		};
	// } else if(action.type === actions.FETCH_WORD_ERROR){
	// 	console.log(action.error);
	}

	return state;
};

module.exports = reducerCreator;