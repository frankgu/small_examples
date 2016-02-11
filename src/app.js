'use strict';

var express = require('express'),
	  posts = require('./mock/posts.json');

var app = express();

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

app.get('/', function(req, res){
	res.render('index');
});

app.get('/blog/:title?', function(req, res){
	var title = req.params.title;
	if (title === undefined) {
		res.status(503);
		res.send("This page is under construction!");
	} else {
		var post = posts[title] || {};
		res.render('post', { post: post});
	}
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("The frontend server is running on the environment port or port 3000!");
});
