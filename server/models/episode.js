var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var episodeSchema = new Schema ({
  id: Number,
  audio_search_id: Number,
  audio_url: String,
  duration: String,
  preview_start: Number,
  preview_stop: Number,
  template: {
    show_title: String,
    show_image: String,
    episode_image: String,
    episode_title: String,
    episodeDesc: string,
    users_who_liked: [{
			type: Schema.Types.ObjectId,
			ref: User
		}],
    tags: [String]
  }
});

var Episode = mongoose.model('Episode', episodeSchema);
module.exports = Episode;
