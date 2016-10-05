var express = require('express');
var bodyParser= require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var Question = require('./models/Question');
var app = express();
var passport = require('passport');

var GoogleStrategy = require('passport-google-oauth20').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

/*Google Strategy*/


// Question.create({spanish: 'amigo', english: 'friend' }, function(err, question) {
// 	console.log(question);
// });

Question.find({}, function(error, questions) {
	console.log(questions);
});


app.use(bodyParser.urlencoded({extended: true}));

var Storage = {
	add: function(spanish, english) {
		var item = {spanish: spanish, english: english, id: this.setId};
		this.items.push(item);
		this.setId += 1;
		return item;
	}
};

var createStorage = function() {
	var storage = Object.create(Storage);
	storage.items = ['nada'];
	storage.setId = 1;
	return storage;
}

var storage = createStorage();

storage.add('Hola', 'Hello');
storage.add('Fiesta', 'Party');
storage.add('Noche', 'Night');
storage.add('Muy', 'Very');
storage.add('Bueno', 'Good');
storage.add('Mal', 'Bad');
storage.add('Ocho', 'Eight');
storage.add('Puerta', 'Door');
storage.add('Pollo', 'Chicken');
storage.add('Tonto', 'Silly');

var app = express();
app.use('/', express.static('build'));

app.get('/items/', function(request, response) {
	response.json(storage.items);
});

app.post('/items', bodyParser, function(request, response) {
	if (!('name' in request.body)) {
		return response.sendStatus(400);
	}
	
	var item = storage.add(request.body.name);
	response.status(201).json(item);
});

// app.get('/', function (req, res) {
// 	res.send('Hello World!\n');
// });

var counter = 0;
app.get('/questions', function(req, res) {
	Question.find(function(err, questions) {
		if (err) {
			return res.status(500).json({message: 'Internal Server Error'
			                            });
		}
		var spanishWord = questions[counter].spanish + counter;
		var id = questions[counter]._id;
		res.json({
			question : spanishWord,
			id : id 
		}); //counter is just for testing
		// res.json(questions);
		
		counter++;
		console.log('counter value: ',counter);
	});
});

app.put('/questions/:id', bodyParser.json(), function(req, res){
		console.log(req.body.english );
	// fod find , get the right andster
	Question.findOne({_id: req.params.id}, function(err, question){
		//(question);
		var newBucket;
		if(req.body.english === question.english){
			newBucket = "c";
		} else {
			newBucket = "a";
		}
		   Question.findOneAndUpdate({_id: req.params.id}, 
		   	{bucket: newBucket}, function(err, q) {
		  				res.json({ question: q});
		       
		       
		   });
	});	

});

// app.get('/nextq')

app.get('/users', function (req, res) {
	res.send('Yoli\n');
});

app.post('/quotes', (req, res) => {
	res.send(req.body)
});

app.post('/question', function (req, res) {
	res.end('Connection Closed\n\n');
});

// app.get('/gamebaord', function (res, reg) {
// 	res.send(__dirname, '/index.js')
// }) #TODO

var runServer = function(callback) {
	mongoose.connect(config.DATABASE_URL, function(err) {
		if (err && callback) {
			return callback(err);
		}
		
		app.listen(config.PORT, function() {
			console.log('Listening on localhost:' + config.PORT);
			if (callback) {
				callback();
			}
		});
	});
};

if (require.main === module) {
	runServer(function(err) {
		if (err) {
			console.error(err);
		}
	});
};

/*Google Strategy*/

//STEP 1
app.get('/public', function(req, res){
	res.json({
		message: 'google strategy'
	})
})


//STEP 2
passport.use(new GoogleStrategy({
    clientID: "194268723918-d6l5f777ulrhkisikenk6oj73ilhen8i.apps.googleusercontent.com",
    clientSecret: "i1WcRbasimAwIr8ZGpz4r6u8",
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
  	console.log('=========', accessToken, profile);
      //do mongo stuff here : 
      var user = {
      	googleId: profile.id,
      	accessToken: accessToken,
      	displaName: profile.displayName,
      	name: profile.name
      }
      return cb(null, user);

    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.cookie('accessToken', req.user.accessToken, {expires:0, httpOnly: true });
    res.redirect('/'); //back to GameBoard 
  });


//STEP 3: Use BearerStrategy 
/*
this is separate from above. we need to tight them together
we need to match the endpoints or 
*/
passport.use(new BearerStrategy(
  function(token, done) {
  	if(token == 12345){
  		var user = {user: 'yoli'};
  		return done(null, user, {scope: 'read'});
  	} else {
  		return done(null, false);
  	}
  }
));

app.get('/profile', 
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
    res.json(req.user);
 });

exports.app = app;
exports.runServer = runServer;

/*
 google Auth - login button (APi)
 Provided term - h3 tag (Get)
 User Answer - input form (post)
 Score : - <span> (get)
 Logout buttn - (api)
 */
