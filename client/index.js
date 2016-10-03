var React = require('react');
var ReactDOM = require('react-dom');

var Form = require('./form-component.js')

var GameBoard = React.createClass({
	render: function(){
		return (
			<div className="gameBoard">
			<h1>Spanish Level 1</h1>
			<div className="container">
				<div className="row">
					<h3>Fiesta</h3>
				</div>
			</div>
			<Form />
			</div>

		)
	}
});

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
    	<GameBoard />,
    	 document.getElementById('app'));
});
