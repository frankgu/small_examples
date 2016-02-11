var fs = require('fs');

function mergeValues(values, content) {
  for (var key in values) {
    content = content.replace("{{" + key +"}}", values[key]);
  }
  
  return content;
}

function view(templateName, values, response) {
  var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: 'utf8'});
  // Insert values into the content
  fileContents = mergeValues(values, fileContents);
  // wirte out the content
  response.write(fileContents);
}

module.exports.view = view;