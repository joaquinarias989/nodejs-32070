const { app } = require('./src/app');

const server = app
  .listen(app.get('port'), () => {
    console.log(`Server running on port ${server.address().port}`);
  })
  .on('error', (err) => {
    console.log(err);
  });
