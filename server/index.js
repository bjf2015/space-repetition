var express = require('express');
var bodyParser= require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var Question = require('./models/Question');
var app = express();
var passport = require('passport');
var User = require('./models/Users');
var req = require('request');

var GoogleStrategy = require('passport-google-oauth20').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

// mongoose.connect('mongodb://localhost:27017/space-repetition-dev');

// var users = mongoose.model('Users', { name: String });

// var kitty = new User({ googleId: '123445312' });
// kitty.save(function (err) {
// 	console.log('success kitty');
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('meow');
//   }
// });

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
		var spanishWord = questions[counter].spanish;
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
	// fod find , get the right andster
	Question.findOne({_id: req.params.id}, function(err, question){
		console.log( "word from input : ", req.body.english );
		console.log( "word from database : ", question.english );
		//(question);
		var newBucket;
		if(req.body.english === question.english){
			newBucket = "c";
		} else {
			newBucket = "a";
		}
		   Question.findOneAndUpdate({_id: req.params.id}, 
		   	{bucket: newBucket}, function(err, q) {
		  				res.json({ question: q.bucket});
		   });
	});	

});

// app.get('/nextq')
// 
// app.put('/questions/:id', bodyParser.json(), function(req, res) {
//     console.log(req.body.english);
//     // fod find , get the right andster
//     Question.findOne({
//         _id: req.params.id
//     }, function(err, question) {
//         (question);
//         var newBucket;
//         if (req.body.english === question.english && newBucket === 'z') {
//             newBucket = "c";
//         } else if (req.body.english !== question.english && newBucket === 'z') {
//             newBucket = "a";
//         } else if (req.body.english === question.english && newBucket === 'a') {
//             newBucket = "b";
//         } else if (req.body.english !== question.english && newBucket === 'a') {
//             newBucket = "a";
//         } else if (req.body.english === question.english && newBucket === 'b') {
//             newBucket = "c";
//         } else if (req.body.english !== question.english && newBucket === 'b') {
//             newBucket = "a";
//         } else if (req.body.english !== question.english && newBucket === 'c') {
//             newBucket = 'b';
//         } else if (req.body.english === question.english && newBucket === 'c') {
//             completedQuestions.push(question);
//         } else {
//             alert("Congratulations!! You have finsished all the queesions");
//         }

//         Question.findOneAndUpdate({
//                 _id: req.params.id
//             }, {
//                 bucket: newBucket
//             }, function(err, q) {
//                 res.json({
//                     question: q
//                 });
//             }
//         );
//     });
// });

app.get('/users', function (req, res) {
	res.send('Yoli\n');
});

app.post('/quotes', (req, res) => {
	res.send(req.body);
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

//STEP 3: Use BearerStrategy 
/*
this is separate from above. we need to tight them together
we need to match the endpoints or 
Verify with google only once 
*/
passport.serializeUser(function(user, done){
	done(null, user);
});

// passport.deserializeUser(function(user,done){
// 	done(null, user);
// });

passport.use(new BearerStrategy(
  function(token, done) {
  	User.findOne({ accessToken: token},
  		function(err, user){
  			if(err){
  				return done(err);
  			}
  			if(!user) {
  				return done(null, false);
  			}
  			return done(null, user, { scope: ['https://www.googleapis.com/auth/plus.login']});
  		});

  	// if(token == 12345){
  	// 	var user = {user: 'Bryan'};
  	// 	return done(null, user, {scope: 'read'});
  	// } else {
  	// 	return done(null, false);
  	// }
  }
));

//STEP 2
passport.use(new GoogleStrategy({
    clientID: "194268723918-d6l5f777ulrhkisikenk6oj73ilhen8i.apps.googleusercontent.com",
    clientSecret: "i1WcRbasimAwIr8ZGpz4r6u8",
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
  	console.log('=========', accessToken, profile);
  	console.log('User', User);
     // do mongo stuff here :
     //User.db.listCollections() 
     User.findOneAndUpdate(
     	{googleId: profile.id},
	    {$set: {
	    	displayName: profile.displayName, 
	    	accessToken: accessToken}
	    },
	    {	upsert:true, 
	    	returnNewDocument:true
	    },
	    function(err, user){
      		if(err){
      			console.log('error: ', err);
      		} else {
      			console.log('displayName:', user);
      			return done(null, user);
      		}}
     );
  })
);

// we call this endopoint in frontend action with our login button
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.cookie('accessToken', req.user.accessToken, {expires:0 });
    res.redirect('/'); //back to GameBoard 
  });

app.get('/profile', 
  passport.authenticate('bearer', { failureRedirect: '/', session: false }),
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