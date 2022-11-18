const { app } = require('./src/Api/app');

const server = app
  .listen(app.get('port'), () => {
    console.log(`Server running on port ${server.address().port}`);
  })
  .on('error', console.log);
