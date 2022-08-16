const Container = require("./data/Container");
const products = new Container("./data/products.txt");

const Sockets = (io) => {
  io.on("connection", (socket) => {
    console.log("nuevo socket connectado:", socket.id);

    const emitProducts = async () => {
      const prods = await products.getAll();
      socket.emit("server:loadprods", prods);
    };
    emitProducts();

    socket.on("client:newprod", async (data) => {
      const idProd = await products.save(data);
      io.emit("server:newprod", idProd);
    });

    socket.on("disconnect", () => {
      console.log(socket.id, "disconnected");
    });
  });
};
module.exports = Sockets;
