const { Op } = require("sequelize");

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

async function getAllFlights(query) {
  let customFilter = {};
  let sortFilter = [];

  // trips -> MUM-DEL
  if (query.trips) {
    [departureAirportId, arrivalAirportId] = query.trips.split("-");

    if (!departureAirportId || !arrivalAirportId) {
      throw new Error("Invalid trips format. Expected format: code1-code2");
    }
    if (departureAirportId === arrivalAirportId) {
      throw new Error("Departure and Arrival airports must be different");
    }

    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;
  }

  // price -> minPrice-maxPrice
  if (query.price) {
    let [minPrice, maxPrice] = query.price.split("-");
    minPrice = minPrice == undefined ? 0 : Number(minPrice);
    maxPrice = maxPrice == undefined ? 50000 : Number(maxPrice);

    customFilter.price = {
      [Op.between]: [minPrice, maxPrice],
    };
  }

  // travellers
  if (query.travellers) {
    const travellers = Number(query.travellers);

    if (isNaN(travellers) || travellers <= 0) {
      throw new Error("Travellers count must be Positive Number.");
    }

    customFilter.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }

  // date
  if (query.tripDate) {
    const startOfDay = new Date(query.tripDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(query.tripDate);
    endOfDay.setHours(23, 59, 59, 999);

    customFilter.departureTime = {
      [Op.between]: [startOfDay, endOfDay],
    };
  }

  // sorting filters
  if (query.sort) {
    sortFilter = query.sort
      .split(",")
      .map((param) => param.trim())
      .map((param) => {
        const [field, order] = param.split("_");

        return [field, order];
      });
  }

  try {
    const flights = await flightRepository.getAllFlights(
      customFilter,
      sortFilter
    );
    return flights;
  } catch (error) {
    logger.error("Fetching of all Flights went wrong at Service Layer");
    throw error;
  }
}

async function getFlight(id) {
  try {
    const flight = await flightRepository.get(id);
    return flight;
  } catch (error) {
    logger.error("Fetching the flight went wrong at Service Layer");
    throw error;
  }
}

async function updateSeats(data) {
  try {
    const response = await flightRepository.updateRemainingSeats(
      data.flightId,
      data.seats,
      data.dec
    );
    return response;
  } catch (error) {
    logger.error("Updating the seats went wrong at Service Layer");
    throw error;
  }
}

module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
  updateSeats,
};
