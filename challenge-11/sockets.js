// const prodContainer = require("./containers/ProductsContainer");
const prodContainer = require("./containers/ProductsFakerContainer");
const chatContainer = require("./containers/ChatContainer");
const products = new prodContainer("product");
const messages = new chatContainer("db/chats.json");
const normalizeFunction = require("./normalizr/normalize.js");

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
      const normalizedMsgs = normalizeFunction({
        id: "messages",
        messages: msgs,
      });
      socket.emit("server:loadmessages", normalizedMsgs);
    };
    emitMessages();

    // socket.on("client:newprod", async (data) => {
    //   const prod = await products.save(data);
    //   io.emit("server:newprod", prod);
    // });

    socket.on("client:newmessage", async (chatMessage) => {
      await messages.saveMsg(chatMessage);
      const normalizedMsg = normalizeFunction({
        id: "messages",
        messages: chatMessage,
      });
      io.emit("server:newmessage", normalizedMsg);
    });

    socket.on("disconnect", () => {
      console.log(socket.id, "disconnected");
    });
  });
};
module.exports = Sockets;
