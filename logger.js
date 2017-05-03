
const winston = require('winston');
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({
      filename: __dirname + '/log/info.log',
      level: 'info'
    }),
    new (winston.transports.File)({
      filename: __dirname + '/log/error.log',
      level: 'error'
    })
  ]
});

module.exports = logger;
