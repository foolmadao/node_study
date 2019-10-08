const fs = require("fs");
const confList = fs.readFileSync("config.conf").toString().split('\r\n')
const globalConfig = {}

confList.forEach(item => {
  const tempConf = item.split('=');
  if(tempConf.length === 2) {
    globalConfig[tempConf[0]] = tempConf[1];
  }
});

module.exports = globalConfig;