var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Episode = require('./episode');

var userSchema = new Schema({
	deviceID: String,
	name: String,
	username: { type: String, unique: true},

	likedEpisodes: [{
		type: Schema.Types.ObjectId,
		ref: Episode
	}],

	dislikedEpisodes: [{
		type: Schema.Types.ObjectId,
		ref: Episode
	}],

	likedTags: [String]


});

var User = mongoose.model('User', userSchema);

module.exports = User;