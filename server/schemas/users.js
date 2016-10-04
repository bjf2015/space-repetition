var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	id:  [{type: String, unique: true}],
	token:  String,
	currentScore: number,
	totalQuestions: number,
	bestScore: number
});