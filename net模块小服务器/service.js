const net = require("net");
const fs = require("fs");
const server = net.createServer();
const globalConfig = require('./config')

server.listen(globalConfig.port, "127.0.1.1")
console.log(globalConfig)

server.on("listening", function() {
  console.log('服务已启动')
})

server.on("connection", function (socket) {
  console.log('con')
  socket.on('data', function(data) {
    const requstList = data.toString().split('\r\n')
    const url = requstList[0].split(' ')[1]
    let fileData
    try {
      fileData = fs.readFileSync(__dirname + globalConfig.path + url);
      socket.write('HTTP 200OK\r\nContent-type:text/html\r\nServer:KWB/1.2\r\n\r\n');
      socket.write(fileData)
    } catch(e) {
      const page = fs.readFileSync(__dirname + globalConfig.path + '/404.html');
      socket.write('HTTP 404NotFound\r\n\r\n'+ page);
    }

    socket.end();
    
  })
})

