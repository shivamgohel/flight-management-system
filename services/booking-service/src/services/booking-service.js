const axios = require("axios");

const db = require("../models");
const { BookingRepository } = require("../repository");
const { serverConfig, logger } = require("../config/index");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

const bookingRepository = new BookingRepository();

async function createBooking(data) {
  try {
    const result = await db.sequelize.transaction(
      async function bookingImplementation(t) {
        const flight = await axios.get(
          `${serverConfig.FLIGHTS_SERVICE}/api/v1/flights/${data.flightId}`
        );

        const flightData = flight.data.data;

        const bookingData = {
          flightId: data.flightId,
          userId: data.userId,
          noOfSeats: data.noOfSeats,
          totalCost: data.noOfSeats * flightData.price,
        };
        const booking = await bookingRepository.create(bookingData, {
          transaction: t,
        });

        return booking;
      }
    );
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

async function getBooking(id) {
  try {
    const booking = await bookingRepository.get(id);
    return booking;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

module.exports = {
  createBooking,
  getBooking,
};
