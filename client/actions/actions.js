// require('isomorphic-fetch'); #TODO when you add Thunk
var FETCH_WORD_SUCCESS = 'FETCH_WORD_SUCCESS';

var fetchWordSuccess = function(word){
	return {
		type: FETCH_WORD_SUCCESS,
		data: word 
	};
};


