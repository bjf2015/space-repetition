var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
	question:  [{type: String, unique: true}],
	answer: type: String,
	pointValue: number
});