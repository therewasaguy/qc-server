var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var episodeSchema = new Schema({
	title: String,
	description: String,
	date_created: String,
	show_title: String,
	digital_location: String,
	path_to_mp3: String,
	duration: String,
	image_urls: [{
		full: String,
		thumb: String
	}],
	audiosearchID: Number,

	usersWhoLikeThis: [{
		type: Schema.Types.ObjectId,
		ref: User
	}],

});

var Episode = mongoose.model('Episode', episodeSchema);
module.exports = Episode;