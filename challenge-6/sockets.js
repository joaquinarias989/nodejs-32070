const Container = require("./data/Container");
const products = new Container("./data/products.txt");
const messages = new Container("./data/messages.txt");

const Sockets = (io) => {
  io.on("connection", (socket) => {
    console.log("nuevo socket connectado:", socket.id);
    const emitSocketId = () => {
      socket.emit("server:socketid", socket.id);
    };
    emitSocketId();

    const emitProducts = async () => {
      const prods = await products.getAll();
      socket.emit("server:loadprods", prods);
    };
    emitProducts();

    const emitMessages = async () => {
      const msgs = await messages.getAllMsg();
      console.log(msgs);
      socket.emit("server:loadmessages", msgs);
    };
    emitMessages();

    socket.on("client:newprod", async (data) => {
      const idProd = await products.save(data);
      const prod = await products.getById(idProd);
      io.emit("server:newprod", prod);
    });

    socket.on("client:newmessage", async (data) => {
      await messages.saveMsg(data);
      io.emit("server:newmessage", {
        id: socket.id,
        data: { author: "Yo", ...data },
      });
    });

    socket.on("disconnect", () => {
      console.log(socket.id, "disconnected");
    });
  });
};
module.exports = Sockets;
