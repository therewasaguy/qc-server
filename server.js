var express = require('express');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var session = require('express-session');
var request = require('request');
var os = require('os');

if(os.hostname().indexOf("local") > -1) {
	require('dotenv').load();
}

var AudioSearch = require('./audiosearch/index');
var audiosearch = new AudioSearch(process.env.AUDIOSEARCH_APP_ID, process.env.AUDIOSEARCH_SECRET);

var port = process.env.PORT || 8000;
var app = express();

app.use(express.static('public'));
// app.set('views', __dirname + '/public/views')
// app.set('view engine', 'jade');
app.use(express.static(__dirname+'/public'));

// require('./server/routes.js');

app.listen(port, function(err) {
	console.log('Running on port ' + port);
});


app.db = require('./server/dbcontroller.js'); // load our routes and pass in our app and fully configured passport
app.db.init(app, function() {
	console.log('db initted');
});


app.get('/', function(req, res) {
	res.sendFile('index.html');
});

app.get('/audiogrep', function(req, res) {
	res.sendFile(__dirname+'/public/views/audiogrep.html');
});

// example query: server/categories?cat1=comedy&cat2=drama
app.get('/categories/*', function(req, res) {
	var cat = req.url.split('/').pop();
	audiosearch.searchEpisodes(cat).then(function (results) {
		res.send(results);
	});
});

// initialize with one of the keywords for the user's action
app.get('/init/*', function(req, res) {
	// keywords are ['laugh', 
	var cat = req.url.split('/').pop();
	audiosearch.searchEpisodes(cat).then(function (results) {
		res.send(results);
	});

	// also create a token and start tracking against that token

});


app.get('/onswipe', function(req, res) {
	// id of episode, and true/false
	// user id if logged in

});

	// get user id, and generate a recommendation based on what we know
app.get('/queue', function(req, res) {
	// TO DO
});

// example query: (server_url)/similarshowsbyname/
app.get('/similarshowsbyname/*', function(req, res) {
	var show = req.url.split('/').pop();
	var _id;
	audiosearch.get('/search/shows/' + encodeURI(show) ).then(function (results) {
		// get similar shows by ID
		// console.log(results[0].id);
		try {
			_id = results.results[0]['id'];
		} catch(e) {
			console.log('error fetching similar shows');
			return;
		}
		audiosearch.get('/shows/'+_id+'/related').then(function(newResults) {
			console.log('success');
			res.send(newResults);
		});
	});
});


app.get('/grep/*', function(req, res) {
	var topic = req.url.split('/').pop();
	audiosearch.searchEpisodes(topic).then(function (results) {
		res.send(results);
	});
});