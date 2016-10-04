exports.DATABASE_URL = process.env.DATABASE_URL ||
	global.DATABASE_URL ||
	(process.env.NODE_ENV === 'production' ?
		'mongodb://localhost/space-repetition' :
		'mongodb://localhost/space-repetition-dev');
exports.PORT = process.env.PORT || 8080;