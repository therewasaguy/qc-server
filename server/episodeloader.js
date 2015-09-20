var mongoose = require('mongoose');
var Episode = require('./models/episode.js');

var errorHandler = function(er) {
  console.log(er);
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
        var epi = new Episode({});

        epi.audio_search_id = ep.episode.id;
        epi.audio_url = ep.episode.audio_files[0].url[0];
        epi.duration = ep.episode.audio_files[0].duration;
        ep.preview_start = 100;
        ep.preview_stop = 115;
        ep.template = {};
        ep.template.show_title = ep.episode.show_title;
        ep.template.show_image = ep.episode.image_urls.full;
        ep.template.episode_image = ep.episode.images_urls.full;
        ep.template.episode_title = ep.episode.title;
        ep.template.episode_description = "";
        ep.tags = ep.episode.tags;

        ep.save(function(err){
          if (err) {
            console.log("shit that didn't save");
          } else {
            console.log('episode ' + ep.template.show_title + ' saved!');
          }
        })

      }
    });
  });
};

module.exports = episodeLoader = createOrFindEpisode;

