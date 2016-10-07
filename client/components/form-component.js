var React = require('react');

var Form = React.createClass({
	onFormSubmit(event){

		event.preventDefault();
		//Grabs the value from the input on submit
		var guessWord = this.refs.theInput.value;

		//Dispatch a fetchWord action with the next index to display
		this.props.onFormSubmit(guessWord);
		//Clears the value on Submit
		this.refs.theInput.value = '';
	},
	render: function(){
		return (
			<div className="form-wrapper" className="container">
				<div className="form-wrapper" className="container">
				<div className="row">
					<form onSubmit={this.onFormSubmit} className='input-group col-xs-6'>
						<input placeholder='Guess the english word'
						className="form-control" ref="theInput" />
						<span className="input-group-btn">
							<button type='submit' className="btn btn-secondary">Guess</button>
						</span>
					</form>
				</div>
			</div>
			</div>
		);
}});

module.exports = Form;