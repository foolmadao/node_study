const http = require('http')
const url = require('url')
const globalConf = require('./config')
const fs = require('fs')
const loader = require('./loader')
const log = require('./log')

const server = http.createServer((request, response) => {
  const pathName = url.parse(request.url).pathname;
  const param = url.parse(request.url, true).query;
  const isStatic = isStaticRequest(pathName);
  if (isStatic) {// 静态文件
    try {
      const data = fs.readFileSync(globalConf.page_path + pathName);
      response.writeHead(200);
      response.write(data);
      response.end();
    } catch (error) {
      response.writeHead(404);
      response.write('<html><body><h1>404 NOT FOUND</h1></body></html>');
      response.end();
    }
  } else {// 动态数据
    if(loader.get(pathName) != null) {
      try {
        loader.get(pathName)(request, response)
      } catch (error) {
        response.writeHead(500);
        response.write('<html><body><h1>500 BAD SERVER</h1></body></html>');
        response.end();
      }
      
    } else {
      response.writeHead(404);
      response.write('<html><body><h1>404 NOT FOUND</h1></body></html>');
      response.end();
    }
  }
}).listen(globalConf.port)

log('服务已启动！');

function isStaticRequest(pathName) {
  const length = globalConf.static_file_type.length;
  for(let i=0; i<length; i++) {
    if(pathName.lastIndexOf(globalConf.static_file_type[i]) === pathName.length - globalConf.static_file_type[i].length){
      return true;
    }
  }
  return false;

}