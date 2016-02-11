var router = require('./router.js');


// Create a web server
var http = require('http');
http.createServer(function (request, response) {
  router.home(request,response);
  router.user(request,response);
}).listen(process.env.PORT);

console.log('Server running at http://<workspace-url>/');
