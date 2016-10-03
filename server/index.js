var express = require('express');
var app = express();


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/questions', function (req, res) {
	res.send('hola');
});

app.get('/users', function (req, res) {
	res.send('Yoli');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
