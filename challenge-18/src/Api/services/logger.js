const { createLogger, transports, format } = require("winston");

const customFormat = format.combine(
  format.timestamp(),
  format.printf((info) => {
    return `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`;
  })
);

const logger = createLogger({
  format: customFormat,
  level: "info",
  transports: [
    new transports.Console({ level: "info" }),
    new transports.File({
      filename: "logs/warn.log",
      level: "warn",
    }),
    new transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
  ],
});

module.exports = logger;
