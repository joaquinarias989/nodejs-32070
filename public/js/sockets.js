const socket = io.connect();

export const getSocketId = (callback) => {
  socket.on('server:socketid', callback);
};

export const loadProds = (callback) => {
  socket.on('server:loadprods', callback);
};

export const saveMessage = (author, text, date) => {
  socket.emit('client:newmessage', { author, text, date });
};

export const requireMessages = (email) => {
  socket.emit('client:requiremessages', email);
};

export const loadMessages = (callback) => {
  socket.on('server:loadmessages', callback);
};

export const onNewMessage = (callback) => {
  socket.on('server:newmessage', callback);
};
