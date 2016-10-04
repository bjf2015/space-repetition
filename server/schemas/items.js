var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
	question:  [{type: String, unique: true}],
	answer: type: String,
	currentBucket: {type: String, default: "z"},
	pointValue: number
});

var hola = new Item({question: 'hola', answer: 'hello', currentBucket: 'z', pointValue: 1});

Item.create(hola, function(error) {
	assert.ifError()
	
})