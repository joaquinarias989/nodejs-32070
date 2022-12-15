const { app } = require('./src/Api/app');
const logger = require('./src/Api/services/logger.service');

const server = app
  .listen(app.get('port'), () => {
    console.log(`Server running on port ${server.address().port}`);
  })
  .on('error', (err) => logger.log('error', err));
