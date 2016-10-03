var React = require('react');
var ReactDOM = require('react-dom');
//react Router
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;
var Link = router.Link;

//Redux --------------------------------
var Provider = require('react-redux').Provider;
var connect = require('react-redux').connect;
var store = require('./store');
var actions = require('./actions/actions');


//external components ------------------
var Form = require('./components/form-component.js');


// Components --------------------------

var LandingPage = React.createClass({
	render: function(){
		return (
		<div className="landingPage-wrapper container">
			<div className="intro-wrapper col-xs-6 col-xs-offset-3">
				<h3>Spanish Center</h3>
				<p>This online spanish Center, offers space repetition technique to learn new words in Spanish. Log in to start Playing!</p>
			</div>
			<div className="login-wrapper col-xs-6 col-xs-offset-3">
				<button type="button" className="btn btn-warning">Login</button>
			</div>
		</div>
		)
	}
});

var GameBoard = React.createClass({
	render: function(){
		return (
			<div className="gameBoard-wrapper">
			<div className="logout-wrapper">
			 <button type="button" className="btn btn-warning">Log out</button>
			</div>
			<h1>Spanish Level 1</h1>
			<div className="container">
				<div className="row">
					<h3>{this.props.wordToGuess}</h3>
				</div>
			</div>
			<Form />
			<div className="score-wrapper">
				<h3>Score:<span>10</span></h3>
			</div>
			</div>
		)
	}
});

var routes = (
    <Router history={hashHistory}>
        <Route path="/" component={LandingPage}>
        </Route>
        <Route path="/gameBoard" component={GameBoard}>
        </Route>
    </Router>
);

var mapStateToProps = function(state, props){
	return {
		wordToGuess : state.wordToGuess
	};
};

var Container = connect(mapStateToProps)(GameBoard);

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
    	<Provider store={store}>
    	<Container />
    	</Provider>,
    	 document.getElementById('app'));
});
