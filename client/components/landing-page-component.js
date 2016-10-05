var React = require('react');
var connect = require('react-redux').connect;
var actions = require('../actions/actions');

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

module.exports = LandingPage;