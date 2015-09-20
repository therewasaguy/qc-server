var mongoose = require('mongoose');

var app;
var dB;

var dbURL = process.env.DATABASE_URL;
var assert = require('assert');

var User = require('./models/user.js');
var Episode = require('./models/episode.js');

module.exports = db = {
	init: function(context, callback) {
		app = context;
		if (dbURL) {
			mongoose.connect(dbURL)
			callback();
		} else {
			console.log('unable to connect to database, please provide a DATABASE_URL environment variable i.e. in a .env file');
		}


		app.get('/all_users', function(req, res) {
			// User.find()
		});

	}
};