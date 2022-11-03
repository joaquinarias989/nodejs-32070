const { app } = require("./app");

// console.log("test")

const server = app
  .listen(app.get("port"), () => {
    console.log(`Server running on port ${server.address().port}`);
  })
  .on("error", (err) => {
    console.log(err);
  });
