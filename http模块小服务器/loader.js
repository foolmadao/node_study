const fs = require('fs')
const globalConf = require('./config')

const web_path = globalConf.web_path
const files = fs.readdirSync(web_path)

const controllerSet = []
const pathMap = new Map();

for(let i=0; i<files.length; i++) {
  const temp = require('./' + web_path + '/'+ files[i])
  if (temp.path) {
    for (let [k,v] of temp.path) {
      if(pathMap.get(k) == null) {
        pathMap.set(k,v)
      } else {
        throw new Error('URL 异常：' + k)
      }
    }
    controllerSet.push(temp)
  } else {

  }
}

module.exports = pathMap;