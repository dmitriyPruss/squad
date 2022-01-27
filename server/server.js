const http = require('http');
require('./models/mongoModels');
const controller = require('./socketInit');
const app = require('./app');

const env = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
server.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`)
);

controller.createConnection(server);
