const axios = require("axios");

const db = require("../models");
const { BookingRepository } = require("../repository");
const { serverConfig, logger, queueConfig } = require("../config/index");
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
        // Create booking record in DB within transaction
        const booking = await bookingRepository.create(bookingData, {
          transaction: t,
        });

        // Fetch user email from Auth service
        let userEmail = null;
        try {
          const userResponse = await axios.get(
            `${serverConfig.AUTH_SERVICE}/api/v1/auth/users/${booking.userId}`
          );
          userEmail = userResponse.data.data.email;
        } catch (error) {
          logger.error(
            `Failed to fetch user email for userId ${booking.userId}:`,
            error.message
          );
        }
        // Prepare notification message payload
        const notificationPayload = {
          type: "BOOKING_CREATED",
          bookingId: booking.id,
          userId: booking.userId,
          userEmail,
          flightId: booking.flightId,
          seats: booking.noOfSeats,
          totalCost: booking.totalCost,
          timestamp: new Date().toISOString(),
        };
        // Publish message to notification queue
        await queueConfig.sendData(notificationPayload);

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

async function getAllBookings() {
  try {
    const bookings = await bookingRepository.getAll();
    return bookings;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

async function updateBooking(id, data) {
  try {
    // only allow status update
    if (!data.status) {
      throw new AppError(
        "Status is required for update",
        StatusCodes.BAD_REQUEST
      );
    }

    const existingBooking = await bookingRepository.get(id);
    if (!existingBooking) {
      throw new AppError("Booking is not Found", StatusCodes.NOT_FOUND);
    }

    // update status
    const updated = await bookingRepository.update(id, { status: data.status });
    if (!updated) {
      throw new AppError(
        "Failed to update Booking",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }

    const updatedBooking = await bookingRepository.get(id);
    return updatedBooking;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

async function cancelBooking(id) {
  try {
    const booking = await bookingRepository.get(id);
    if (!booking) {
      throw new AppError("Booking not found", StatusCodes.NOT_FOUND);
    }

    if (booking.status === "CANCELLED") {
      throw new AppError(
        "Booking is already Cancelled",
        StatusCodes.BAD_REQUEST
      );
    }

    await bookingRepository.update(id, { status: "CANCELLED" });

    const updatedBooking = await bookingRepository.get(id);
    return updatedBooking;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

module.exports = {
  createBooking,
  getBooking,
  getAllBookings,
  updateBooking,
  cancelBooking,
};
