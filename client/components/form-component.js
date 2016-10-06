var React = require('react');

var Form = React.createClass({
	onFormSubmit(event){
		//#TODO: 
		//update counter for score in the Reducer 
		//Display a feedback 

		event.preventDefault();
		//Grabs the value from the input on submit
		var guessWord = this.refs.theInput.value;
		console.log('guessWord is:', guessWord);
		//Dispatch a fetchWord action with the next index to display
		this.props.onFormSubmit(guessWord);
		//Clears the value on Submit
	},
	render: function(){
		return (
			<div className="form-wrapper" className="container">
				s
			</div>
		);
}});

module.exports = Form;