const { FlightRepository } = require("../repository");
const { logger } = require("../config");
const { compareTime } = require("../utils/");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    if (compareTime(data.departureTime, data.arrivalTime)) {
      throw new Error("Departure Time must be before Arrival time");
    }

    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    logger.error("Not able to create Flight at Service Layer");
    throw error;
  }
}

module.exports = {
  createFlight,
};
