const { Server: WebSocketServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const { app, routerProds } = require("./app");
const PORT = process.env.PORT || 8080;
const Sockets = require("./sockets");

const httpServer = new HttpServer(app);
const io = new WebSocketServer(httpServer);
Sockets(io);

// SERVE VIEWS
app.get("/", (req, res) => {
  res.render("pages/index", { page_name: "index" });
});
app.get("/Productos", async (req, res) => {
  res.render("pages/products", {
    // prods: await products.getAll(),
    page_name: "products",
  });
});

httpServer
  .listen(PORT, () => {
    console.log(`Server running on port ${httpServer.address().port}`);
  })
  .on("error", (err) => {
    console.log(err);
  });
