const fs = require('fs')
const globalCon = require('./config')

const fileName = globalCon.log_path + globalCon.log_name;

function log(data) {
  fs.writeFile(fileName, data + '\n', {flag: 'a'}, function() {

  })
}

module.exports = log;