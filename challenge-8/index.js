const { Server: WebSocketServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const { app } = require("./app");
const Sockets = require("./sockets");

// const Container = require("./containers/ChatContainer");

const httpServer = new HttpServer(app);
const io = new WebSocketServer(httpServer);
Sockets(io);

httpServer
  .listen(app.get("port"), () => {
    console.log(`Server running on port ${httpServer.address().port}`);
  })
  .on("error", (err) => {
    console.log(err);
  });

// const cont = new Container("message");
// cont.saveMsg({
//   author: "juan@gmail.com",
//   text: "Bien y vos?",
// });
// cont.getAll();
