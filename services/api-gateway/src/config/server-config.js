const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,

  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL,
  BOOKING_SERVICE_URL: process.env.BOOKING_SERVICE_URL,
  FLIGHTS_SERVICE_URL: process.env.FLIGHTS_SERVICE_URL,
  NOTIFICATION_SERVICE_URL: process.env.NOTIFICATION_SERVICE_URL,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
};
