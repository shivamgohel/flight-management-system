const { AirportRepository } = require("../repository");
const { logger } = require("../config");

const airportRepository = new AirportRepository();

async function createAirport(data) {
  try {
    const airport = await airportRepository.create(data);
    return airport;
  } catch (error) {
    logger.error("Not able to Create Airport at Airport Service Layer");
    throw error;
  }
}

async function getAirport(id) {
  try {
    const airport = await airportRepository.get(id);
    if (!airport) throw new error("Airport not Found");
    return airport;
  } catch (error) {
    logger.error("Not Able to Fetch Airport at Airport Service Layer");
    throw error;
  }
}

async function getAllAirports() {
  try {
    const airports = await airportRepository.getAll();
    return airports;
  } catch (error) {
    logger.error("Not able to Fetch Airports at Airport Service Layer");
    throw error;
  }
}

async function updateAirport(id, data) {
  try {
    const result = await airportRepository.update(id, data);
    return result;
  } catch (error) {
    logger.error("Not able to Update Airport at Airport Service Layer");
    throw error;
  }
}

async function deleteAirport(id) {
  try {
    const result = await airportRepository.destroy(id);
    return result;
  } catch (error) {
    logger.error("Not Able to Delete Airport at Airport Service Layer");
    throw error;
  }
}

module.exports = {
  createAirport,
  getAirport,
  getAllAirports,
  updateAirport,
  deleteAirport,
};
