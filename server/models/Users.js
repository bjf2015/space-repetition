/**
 * Created by bryanfranzoi on 10/4/16.
 */

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	googleId: { type: String, index: true },
	accessToken: String,
	displayName: String
});

var User = mongoose.model('User', UserSchema);


module.exports = User;

/*
 googleId: profile.id,
      	accessToken: accessToken,
      	displayName: profile.displayName,
      	name: profile.name
      	*/g