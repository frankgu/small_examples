'use strict'

var express = require('express'),
  posts = require('./mock/posts.json');

var app = express();

app.get('/', function(request, response) {
  response.send("<h1>I Love Treehouse</h1>");
});

app.get('/blog', function(request, response) {
  response.send(posts);
});

app.listen(3000, function() {
  console.log("The frontend server is running in port 3000");
});
