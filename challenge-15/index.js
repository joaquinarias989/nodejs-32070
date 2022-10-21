const { app } = require("./app");
const httpServer = new HttpServer(app);

const { arg } = require("./config.js");

// cluster
const cluster = require("cluster");
const numOfCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`ARGUMENTOS: puerto: ${arg.port} - modo: ${arg.mode}`);
  console.log("master " + process.pid + " is running");

  if (arg.mode === "CLUSTER") {
    for (let i = 0; i < numOfCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    const server = httpServer.listen(port, () => {
      console.log(
        `Server running on port ${server.address().port} - PID WORKER:${
          process.pid
        }`
      );
    });
    server.on("error", (error) => {
      console.log("Something went wrong " + error);
    });
  }
} else {
  const server = httpServer.listen(port, () => {
    console.log(
      `Servidor escuchando en el PUERTO:${port} - PID WORKER:${process.pid}`
    );
  });
  server.on("error", (error) => {
    console.log("Something went wrong " + error);
  });
}
