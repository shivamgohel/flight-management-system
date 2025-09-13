const { createLogger, format, transports } = require("winston");

const { combine, timestamp, printf, colorize, errors } = format;

const logFormat = printf(({ timestamp, level, message, stack }) => {
  return stack
    ? `[${timestamp}] [${level}]: ${message} - ${stack}`
    : `[${timestamp}] [${level}]: ${message}`;
});

const logger = createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }) // Capture stack trace if error
  ),
  transports: [
    // Console with colors
    new transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        errors({ stack: true }),
        logFormat
      ),
    }),

    // Simple file transport (appends to file)
    new transports.File({
      filename: "combined.log",
      format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
