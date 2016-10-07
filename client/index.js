var React = require('react');
var ReactDOM = require('react-dom');
//react Router
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;
var Link = router.Link;
var ReactRouterRedux = require('react-router-redux');
var routerReducer = ReactRouterRedux.routerReducer;
var syncHistoryWithStore = ReactRouterRedux.routerReducer;
var browserHistory = router.browserHistory;
//Redux --------------------------------
var Provider = require('react-redux').Provider;
var connect = require('react-redux').connect;
var store = require('./store');
var actions = require('./actions/actions');


//external components ------------------
var Form = require('./components/form-component.js');
var LandingPage = require('./components/landing-page-component.js');
var GameBoard = require('./components/game-board-component.js');

// Components --------------------------

var App = React.createClass({
	componentWillMount: function(){
		//TODO get the first word showing
		this.props.dispatch(actions.fetchWord());
	},
	onFormSubmit(guessWord){
			console.log('clicked on Form', guessWord);
			// var guessWord = this.props.wordTest;
			console.log('guessWord: ', guessWord);
			var currentId = this.props.currentId;
			//Renders the next question: 
			this.props.dispatch(actions.fetchWord());
			// var currentId = this.props.currentId;
			console.log('id to validate question: ', currentId);
			console.log('word fixed to id: ', this.props.wordToGuessNext);
			// console.log('accessToken:', document.cookie);
			//Renders feedback and #TODO: score
			this.props.dispatch(actions.feedbackWord(currentId, guessWord))
			//this.props.dispatch(actions.fetchWord());

			return guessWord;
	},
	hotdog: function(){
		console.log('nextWord');
		this.props.dispatch(actions.fetchWord());
		//TODO: CONNECCT REDUCER
		//CONNECT BACKEND
	},
	render: function () {
		//<LandingPage LogIn={this.LogIn} />
		// console.log('document.cookie', document);
		return (
			<div>
				<button onClick={this.hotdog}>Next button</button>
			
			<div>{ (document.cookie == "") ? <LandingPage /> :<GameBoard feedback={this.props.feedback} wordToGuessNext={this.props.wordToGuessNext} onFormSubmit={this.onFormSubmit} />}</div>
			</div>
		)
	}
});

var mapStateToProps = function(state, props){
	return {
		wordToGuessNext : state.wordToGuess,
		currentId : state.currentId,
		feedback: state.feedback
	};
};

var Container = connect(mapStateToProps)(App);

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
		<Provider store={store}>
			<Container />
		</Provider>,
    	document.getElementById('app'));
});
		//<div>{document.cookie == '' ? <LandingPage /> : console.log("document.cookie", document.cookie);}</div>
		//<div>{document.cookie == '' ? "not Authorized" : "Authorized" }</div>

/*
 				<div>hola
				<GameBoard wordToGuess={this.onFormSubmit()}/>
				<Form onFormSubmit={this.onFormSubmit}/>
 */

