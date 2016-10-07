/**
 * Created by bryanfranzoi on 10/4/16.
 */

 var questions = [
 {
 	id : 1,
 	spanish:  'amigo', 
	english: 'friend', 
	bucket: 'z'
 },
 {
 	id : 2,
 	spanish:  'manzana', 
	english: 'apple', 
	bucket: 'z'
 },
 {
 	id : 3,
 	spanish:  'taza', 
	english: 'cup', 
	bucket: 'z'
 }
 ];

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	googleId: { type: String, index: true },
	accessToken: String,
	displayName: String
	// questions: {type: Array, default: questions }
});

var User = mongoose.model('User', UserSchema);


module.exports = User;

/*
 googleId: profile.id,
      	accessToken: accessToken,
      	displayName: profile.displayName,
      	name: profile.name
      	*/