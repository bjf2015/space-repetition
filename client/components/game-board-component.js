var React = require('react');
var connect = require('react-redux').connect;
var actions = require('../actions/actions');
var Form = require('../components/form-component.js');

var style={
	"margin": "20px",
	"float": "right"
}
var center ={
	"margin" : "0 auto",
	"margin-top" : "5em",
	"width" : "70%"
}

var GameBoard = React.createClass({
	render: function(){
		return ( 
			<div className='container-fluid' style={center}>
				<div className='row'>
					<div className="gameBoard-wrapper col-xs-8 col-xs-offset-3">
					<div className="row">
					</div>
						<div className="logout-wrapper">
							<button type="button" className="btn btn-warning text-right" style={style}>Log out</button>
						</div>
						<h1>Spanish Level 1</h1>
						<div className="container">
							<div className="row">
								<h3>{this.props.wordToGuessNext}</h3>
							</div>
						</div>
						<Form onFormSubmit={this.props.onFormSubmit} wordToGuessNext={this.props.wordToGuessNext}/>
							<div className="score-wrapper">
								<h4>Feedback: <span>{this.props.feedback}</span></h4>
								<h3>Score: <span>{this.props.score}</span></h3>
							</div>
						</div>
					</div>
				</div>
		)
	}
});

module.exports = GameBoard;
