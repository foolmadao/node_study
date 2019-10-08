const path = new Map();

function getData(request, response) {
  response.writeHead(200);
  response.write('hey man');
  response.end();
}

path.set('/getData', getData);
module.exports.path = path;