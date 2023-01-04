const Container = require('../DataAccess/DAOs/MessageDAO');
const MessageDTO = require('../DataAccess/DTOs/MessageDTO');
const logger = require('./services/logger.service');
const Messages = new Container();

const Sockets = (io) => {
  io.on('connection', (socket) => {
    logger.log('info', `nuevo socket connectado: ${socket.id}`);

    const emitSocketId = () => {
      socket.emit('server:socketid', socket.id);
    };
    emitSocketId();

    const emitMessages = async () => {
      const msgs = await Messages.GetAll();
      socket.emit('server:loadmessages', msgs);
    };
    emitMessages();

    socket.on('client:newmessage', async (data) => {
      console.log(data);
      const msg = new MessageDTO({
        authorType: 'Usuario',
        email: data.author,
        body: data.text,
        timestamp: data.date,
      });

      await Messages.SaveMsg(msg);
      io.emit('server:newmessage', msg);
    });

    socket.on('disconnect', () => {
      logger.log('info', `disconnected: ${socket.id}`);
    });
  });
};

module.exports = Sockets;
