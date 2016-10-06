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

// Components --------------------------

var App = React.createClass({
	render: function () {
		//<LandingPage LogIn={this.LogIn} />
		return (
			<LandingPage />

		);
	}
});

var mapStateToProps = function(state, props){
	return {
		loginTest : state.loginTestReducer
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
