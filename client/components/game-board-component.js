var React = require('react');
var connect = require('react-redux').connect;
var actions = require('../actions/actions');
var Form = require('../components/form-component.js');


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
		

					<h3>{this.props.wordToGuessNext}</h3>
				</div>
			</div>
			<Form onFormSubmit={this.props.onFormSubmit}/>
			<div className="score-wrapper">
				<h4>Feedback: <span>any</span></h4>
				<h3>Score: <span>10</span></h3>
			</div>
			</div>
		)
	}
});

module.exports = GameBoard;

		// <Form onFormSubmit={this.props.onFormSubmit}/>
