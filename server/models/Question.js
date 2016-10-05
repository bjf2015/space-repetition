/**
 * Created by bryanfranzoi on 10/4/16.
 */

var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
	spanish: { type: String, required: true },
	english: { type: String, required: true},
	bucket: { type: String, default: 'z'}
});

var Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;