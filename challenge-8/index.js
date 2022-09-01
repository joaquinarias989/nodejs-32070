const { app } = require("./app");
// const Container = require("./containers/ChatContainer");

const server = app
  .listen(app.get("port"), () => {
    console.log(`Server running on port ${server.address().port}`);
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
