const { FlightRepository } = require("../repository");
const { logger } = require("../config");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
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
