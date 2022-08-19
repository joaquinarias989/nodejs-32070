const { app } = require("./app");
const PORT = process.env.PORT || 8080;

const server = app
  .listen(PORT, () => {
    console.log(`Server running on port ${server.address().port}`);
  })
  .on("error", (err) => {
    console.log(err);
  });
