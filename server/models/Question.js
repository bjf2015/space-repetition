/**
 * Created by bryanfranzoi on 10/4/16.
 */

var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
	spanish:  String, 
	english: String, 
	bucket: String
	// bucket: { type: String, default: 'z'}
});

var Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;