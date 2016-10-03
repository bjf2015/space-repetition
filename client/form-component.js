var React = require('react');

var Form = React.createClass({
	onFormSubmit(event){
		event.preventDefault();
		//Grabs the value from the input on submit
		var newTask = this.refs.theInput.value;
		console.log('NewTask ', newTask);
		this.props.onTodoSubmit(newTask);
		//Clears the value on Submit
		this.refs.theInput.value = '';
	},
	render: function(){
	return (
		<div className="form-wrapper" className="container">
			<div className="row">
				<form onSubmit={this.onFormSubmit} className='input-group col-xs-6'>
					<input placeholder='Guess the english word for fiesta'
					className="form-control" ref="theInput" />
					<span className="input-group-btn">
						<button type='submit' className="btn btn-secondary">Guess</button>
					</span>
				</form>
			</div>
		</div>
	);
}});

module.exports = Form;