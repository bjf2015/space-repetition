var express = require('express');
var bodyParser= require('body-parser');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Mongoose connected to MongoDB');
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
	storage.items = [];
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
app.use(express.static('public'));

app.get('/items/:word', function(request, response) {
	response.json(storage.items);
});

app.post('/items', bodyParser, function(request, response) {
	if (!('name' in request.body)) {
		return response.sendStatus(400);
	}
	
	var item = storage.add(request.body.name);
	response.status(201).json(item);
});

app.get('/', function (req, res) {
	res.send('Hello World!\n');
});

app.get('/questions', function (req, res) {
	res.send('hola\n');
});

app.get('/users', function (req, res) {
	res.send('Yoli\n');
});

app.post('/quotes', (req, res) => {
	res.send(req.body)
});

app.post('/question', function (req, res) {
	res.end('Connection Closed\n\n');
});

// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect('mongodb://localhost/snippets', function(err, db) {
	if (err) {
		console.error(err);
		db.close();
		return;
	}
	
	var collection = db.collection('snippets');
	
	var create = function(name, content) {
		db.close();
	};
	
	var read = function(name) {
		db.close();
	};
	
	var update = function(name, content) {
		db.close();
	};
	
	var del = function(name, content) {
		db.close();
	};
	
	var main = function() {
		if (process.argv[2] == 'create') {
			create(process.argv[3], process.argv[4]);
		}
		else if (process.argv[2] == 'read') {
			read(process.argv[3]);
		}
		else if (process.argv[2] == 'update') {
			update(process.argv[3], process.argv[4]);
		}
		else if (process.argv[2] == 'delete') {
			del(process.argv[3]);
		}
		else {
			console.error('Command not recognized');
			db.close();
		}
	};
	
	main();
});

var create = function(name, content) {
	var snippet = {
		name: name,
		content: content
	};
	collection.insert(snippet, function(err, result) {
		if (err) {
			console.error("Could not create snippet", name);
			db.close();
			return;
		}
		console.log("Created snippet", name);
		db.close();
	});
};


// app.get('/gamebaord', function (res, reg) {
// 	res.send(__dirname, '/index.js')
// }) #TODO

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});


/*
 google Auth - login button (APi)
 Provided term - h3 tag (Get)
 User Answer - input form (post)
 Score : - <span> (get)
 Logout buttn - (api)
 */
