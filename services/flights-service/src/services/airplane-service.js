const { AirplaneRepository } = require("../repository");
const { logger } = require("../config");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    logger.error("Error creating airplane at Airplane Service");
    throw error;
  }
}

async function getAirplane(id) {
  try {
    const airplane = await airplaneRepository.get(id);
    if (!airplane) throw new Error("Airplane not Found");
    return airplane;
  } catch (error) {
    logger.error("Error fetching airplane at Airplane Service");
    throw error;
  }
}

async function getAllAirplanes() {
  try {
    const airplanes = await airplaneRepository.getAll();
    return airplanes;
  } catch (error) {
    logger.error("Error fetching airplanes at Airplane Service");
    throw error;
  }
}

async function updateAirplane(id, data) {
  try {
    const result = await airplaneRepository.update(id, data);
    return result;
  } catch (error) {
    logger.error("Error updating airplane at Airplane Service");
    throw error;
  }
}

async function deleteAirplane(id) {
  try {
    const result = await airplaneRepository.destroy(id);
    return result;
  } catch (error) {
    logger.error("Error deleting airplane at Airplane Service");
    throw error;
  }
}

module.exports = {
  createAirplane,
  getAirplane,
  getAllAirplanes,
  updateAirplane,
  deleteAirplane,
};
