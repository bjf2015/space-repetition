var actions = require('../actions/actions');
var update = require('react-addons-update');

var initialState = {
	wordToGuess : "Hello From reducer",
	currentId: "",
	feedback: "Good!!!"
};

var reducerCreator = function(state, action){
	state = state || initialState;

	if(action.type === actions.FEEDBACK_WORD_SUCCESS){
		console.log("Success fetching bucket update -> FEEDBACK_WORD_SUCCESS");
		console.log(action.data);
		if(action.data.feedback == "a"){
			var newState = update(state, {
		 	feedback:  {$set : "wrong answer"},	
		 });
			return newState;
		}
		else if(action.data.feedback == "c"){
			var newState = update(state, {
		 	feedback:  {$set : "correct answer"},	
		 });
			return newState;
		}
	}

	if(action.type === actions.FETCH_WORD_SUCCESS){
		console.log('=======================');
		console.log('FETCH_WORD_SUCCESS');
		// console.log('current word:', action.data);

		var newState = update(state, {
		 	wordToGuess : {$set : action.data.question},	
		 	currentId : {$set : action.data.id}	//modify question and id for the actual variables from database mongoose
		 	 
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