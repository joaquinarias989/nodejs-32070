const socket = io.connect();

export const saveProd = (title, price, img) => {
  socket.emit("client:newprod", {
    title,
    price,
    img
  });
};

export const loadProds = (callback) => {
  socket.on("server:loadprods", callback);
};

export const onNewProd = (callback) => {
  socket.on("server:newprod", callback);
};
