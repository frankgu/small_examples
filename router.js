var profile = require('./profile.js');
var renderer = require('./renderer');            
var querystring = require('querystring');
var commonHeaders = {'Content-Type': 'text/html'};

// handle '/'
function home(request, response){
  if(request.url === '/'){
    if(request.method.toLowerCase() === 'get')
    {
      response.writeHead(200, commonHeaders);
      renderer.view('header', {}, response);
      renderer.view('search', {}, response);
      renderer.view('footer', {}, response);
      response.end();
    } else {      
      request.on('data', function(postBody){
        var query = querystring.parse(postBody.toString());
        // redirect to the /username
        response.writeHead(303, {'Location':'/' + query.username});
        response.end();
      });
    }
  }  
}

// handle '/[string]'
function user(request, response) {
  var username = request.url.replace('/','');
  if(username.length > 0){
    response.writeHead(200, commonHeaders);
    renderer.view('header', {}, response);
    
    // get json from Treehouse
    var studentProfile = new profile(username);
    // on 'end' event
    studentProfile.on('end', function(profileJSON){
      // show profile
      
      // Store the values which we need
      var values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      }
      
      // Simple response
      renderer.view('profile', values, response);
      renderer.view('footer', {}, response);
      response.end();
    });
    
    // on 'error' event
    studentProfile.on('error', function(error){
      
      renderer.view('error', {errorMessage: error.message}, response);
      renderer.view('search', {}, response);
      renderer.view('footer', {}, response);
      response.end();
    });
    
  }
}

module.exports.home = home;
module.exports.user = user;