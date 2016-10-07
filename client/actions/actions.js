require('isomorphic-fetch');


var FETCH_WORD_SUCCESS = 'FETCH_WORD_SUCCESS';
var FETCH_WORD_ERROR = 'FETCH_WORD_ERROR';

var FEEDBACK_WORD_SUCCESS = 'FEEDBACK_WORD_SUCCESS';
var FEEDBACK_WORD_ERROR = 'FEEDBACK_WORD_ERROR';


/****************Action #1: Fetch The Question/spanish-word along with the id of that question ************************************/

var fetchWordSuccess = function(items){
	return {
		type: FETCH_WORD_SUCCESS,
		data: items 
	};
};

var fetchWordError = function(error){
	return {
		type: FETCH_WORD_ERROR,
		data: error 
	};
};

var fetchWord = function(){
	return function(dispatch){
		var url ="http://localhost:3000/questions/";
		// deal with protected route

	return fetch(url).then(function(response){
		if(response.status < 200 || response.status >= 300){
			var error = new Error(response.statusText);
			error.response = response;
			throw error;
		}
		return response.json();
	})
	.then(function(items){
		// console.log('fetch items Promise: ', items);
		return dispatch(
			fetchWordSuccess(items)
		);
	})
	.catch(function(error){
		return dispatch(
			fetchWordError(error)
		);
	});
}};

/****************Action #2: Get FeedBack and Score ************************************/

var feedbackWordSuccess = function(data){
	return {
		type: FEEDBACK_WORD_SUCCESS,
		data: data 
	};
};

var feedbackWordError = function(error){
	return {
		type: FEEDBACK_WORD_ERROR,
		data: error 
	};
};

var feedbackWord = function(id, englishWord){
	console.log('id', id);
	console.log('englishWord', englishWord);

	return function(dispatch){
		var url ="http://localhost:3000/questions/" + id;
		// deal with protected route
		return fetch(url, {
			method: 'put',
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({english: englishWord })
		}).then(function(response){
		if(response.status < 200 || response.status >= 300){
			var error = new Error(response.statusText);
			error.response = response;
			throw error;
		}
		return response.json();
	})
	.then(function(data){
		console.log("PUT DATA: ", data);
		return dispatch(
			feedbackWordSuccess(data)
		);
	})
	.catch(function(error){
		console.log("error: ", error);

		return dispatch(
			feedbackWordError(error)
		);
	});
}};


exports.fetchWord = fetchWord;
exports.FETCH_WORD_SUCCESS = FETCH_WORD_SUCCESS;
exports.fetchWordSuccess = fetchWordSuccess;
exports.FETCH_WORD_ERROR = FETCH_WORD_ERROR;
exports.fetchWordError = fetchWordError;

exports.feedbackWord = feedbackWord;
exports.FEEDBACK_WORD_SUCCESS = FEEDBACK_WORD_SUCCESS;
exports.feedbackWordSuccess = feedbackWordSuccess;
exports.FEEDBACK_WORD_ERROR = FEEDBACK_WORD_ERROR;
exports.feedbackWordError = feedbackWordError;

