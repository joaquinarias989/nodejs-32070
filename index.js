const { Server: WebSocketServer } = require('socket.io');
const { Server: HttpServer } = require('http');
const { app } = require('./src/Api/app');
const logger = require('./src/Api/services/logger.service');
const Sockets = require('./src/Api/sockets');

const httpServer = new HttpServer(app);
const io = new WebSocketServer(httpServer);
Sockets(io);

httpServer
  .listen(app.get('port'), () => {
    console.log(`Server running on port ${httpServer.address().port}`);
  })
  .on('error', (err) => logger.log('error', err));
