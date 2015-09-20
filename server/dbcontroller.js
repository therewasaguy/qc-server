var mongoose = require('mongoose');

var app;
var dB;

var dbURL = process.env.DATABASE_URL;
console.log(dbURL);
var assert = require('assert');

module.exports = db = {
	init: function(context, callback) {
		app = context;
		mongoose.connect(dbURL)
		callback();
	}
}