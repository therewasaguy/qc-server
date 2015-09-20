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
		mongoose.connect(dbURL)
		callback();


		app.get('/all_users', function(req, res) {
			// User.find()
		});

	}
};