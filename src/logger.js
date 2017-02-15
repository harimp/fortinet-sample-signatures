const winston = require('winston');

const logger = new winston.Logger({
  levels: {
    error: 0,
    info: 1,
    trace: 2,
  },
  colors: {
    error: 'red',
    info: 'cyan',
    trace: 'yellow',
  },
  transports: [
    new (winston.transports.Console)({
      level: 'trace',
      colorize: true,
      showLevel: true,
      label: 'web',
      prettyPrint: true,
    }),
  ],
});

module.exports = logger;
