const MessagesContainer = require('../DataAccess/DAOs/MessageDAO');
const ProdsContainer = require('../DataAccess/DAOs/ProductDAO');
const MessageDTO = require('../DataAccess/DTOs/MessageDTO');
const logger = require('./services/logger.service');
const Messages = new MessagesContainer();
const Prods = new ProdsContainer();

const Sockets = (io) => {
  io.on('connection', (socket) => {
    logger.log('info', `nuevo socket connectado: ${socket.id}`);

    const emitSocketId = () => {
      socket.emit('server:socketid', socket.id);
    };
    emitSocketId();

    const emitProducts = async () => {
      const prods = await Prods.GetAll();
      socket.emit('server:loadprods', prods);
    };
    emitProducts();

    const emitMessages = async (email) => {
      const msgs = await Messages.GetAllByEmail(email);
      socket.emit('server:loadmessages', msgs);
    };

    socket.on('client:requiremessages', async (email) => {
      emitMessages(email);
    });

    socket.on('client:newmessage', async (data) => {
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
