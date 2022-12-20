// const { app } = require('./src/Api/app'); // uncomment for use EXPRESS
const { app } = require('./src/Api/app.koa'); // uncomment for use KOA

const server = app
  // .listen(app.get('port') || process.env.PORT, () => {
  .listen(8080, () => {
    console.log(`Server running on port ${server.address().port}`);
  })
  .on('error', console.log);
