var mongoose = require('mongoose');
var Episode = require('./models/episode.js');

var errorHandler = function(er) {
  console.log(er);
};

var createEpisode = function(data, previewStart, previewStop) {
  var epi = {};

  epi.audio_search_id = data.episode.id;
  epi.audio_url = data.episode.audio_files[0].url[0];
  epi.duration = data.episode.audio_files[0].duration;
  epi.preview_start = previewStart || 100;
  epi.preview_stop = previewStop || 115;
  epi.template = {};
  epi.template.show_title = data.episode.show_title;
  epi.template.show_image = data.episode.image_urls.full;
  epi.template.episode_image = data.episode.images_urls.full;
  epi.template.episode_title = data.episode.title;
  epi.template.episode_description = "";
  epi.tags = data.episode.tags;

  // epi.save(function(err){
  //   if (err) {
  //     console.log("shit that didn't save");
  //   } else {
  //     console.log('episode ' + epi.template.show_title + ' saved!');
  //   }
  // });

  return epi;

};

var createOrFindEpisode = function(episodes) {
  episodes.forEach(function(ep){
    Episode.findOne({ 'audio_search_id': ep.episode.id }, function(err, episode) {
      if (err) return errorHandler(err);

      if (episode) {
        console.log('we already have that episode!');
        return episode;
      } else {
        console.log('adding episode to the database');
        return createEpisode(ep);
      }
    });
  });
};


var EpisodeLoader = {
  createOrFindEpisode: createOrFindEpisode,
  addEpisode: createEpisode
};

module.exports = EpisodeLoader;
