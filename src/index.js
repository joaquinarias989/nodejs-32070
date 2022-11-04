const { app } = require("./app");

// console.log("test")

const server = app
  .listen(process.env.PORT || 8080, () => {
    console.log(`Server running on port ${server.address().port}`);
  })
  .on("error", (err) => {
    console.log(err);
  });
