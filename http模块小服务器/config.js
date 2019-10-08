const fs = require('fs');

const config = fs.readFileSync('./server.conf').toString();

const configList = config.split('\r\n');

const globalConfig = {}

configList.forEach(t => {
  const temp = t.split('=');
  if(temp.length === 2) {
    globalConfig[temp[0]] = temp[1];
  }
})

if(globalConfig.static_file_type) {
  globalConfig.static_file_type = globalConfig.static_file_type.split('|')
} else {
  throw new Error('配置文件异常，缺少static_file_type')
  
}

module.exports = globalConfig