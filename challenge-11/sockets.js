const prodContainer = require("./containers/ProductsContainer");
const chatContainer = require("./containers/ChatContainer");
const products = new prodContainer("product");
const messages = new chatContainer("message");

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
      const msgs = await messages.getAll();
      socket.emit("server:loadmessages", msgs);
    };
    emitMessages();

    socket.on("client:newprod", async (data) => {
      const prod = await products.save(data);
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
