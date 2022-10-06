const express = require("express");
const config = require("./config");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const routerAuth = require("./routes/auth.routes");
const routerProds = require("./routes/products.routes");
const routerCart = require("./routes/cart.routes");
const notFound = require("./middlewares/notFound");
const handleErrors = require("./middlewares/handleErrors");

const app = express();

//setings
app.set("port", config.port);

//views
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

// serve views
app.get("/", (req, res) => {
  res.render("pages/index");
});
app.get("/IniciarSesion", async (req, res) => {
  res.render("pages/login");
});

//middlewares
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        process.env.CONNECTION_STRING ||
        "mongodb+srv://admin:FXZ9T5ZszWP4CHU4@cluster0.dyzigwz.mongodb.net/street-wear-ecommerce?retryWrites=true&w=majority",
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: process.env.SESSION_SECRET || "myTopSecretKey",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 1000 * 60 * 10,
    },
  })
);

app.use("/api/auth", routerAuth);
app.use("/api/products", routerProds);
app.use("/api/cart", routerCart);

app.use(notFound);
app.use(handleErrors);

module.exports = { app };
