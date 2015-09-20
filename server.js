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
app.set('views', __dirname + '/public/views')
app.set('view engine', 'html');
app.use(express.static('public'));

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

// example query: server/categories?cat1=comedy&cat2=drama
app.get('/categories', function(req, res) {
	var params = req.query;

	for (var i in params) {

		// check if it is a category
		if (i.indexOf('cat') > -1) {
			audiosearch.searchEpisodes(params[i]).then(function (results) {
				res.send(results);
			});
		}
	}
});

// example query: (server_url)/similarshowsbyname/
app.get('/similarshowsbyname', function(req, res) {
	for (var i in params) {
		// check if it is a category
		if (i.indexOf('show') > -1) {
			var show = params[i];
			audiosearch.get('/search/shows/' + encodeURI(params[i]) ).then(function (results) {
				res.send(results);
			});
		}
	}
});

