const { Sequelize } = require("sequelize");

const { Flight, Airplane, Airport, City } = require("../models");
const CrudRepository = require("./crud-repository");

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filter, sort) {
    try {
      const response = await Flight.findAll({
        where: filter,
        order: sort,
        include: [
          {
            model: Airplane,
            required: true,
            as: "airplaneDetail",
          },
          {
            model: Airport,
            required: true,
            as: "departureAirport",
            on: {
              col1: Sequelize.where(
                Sequelize.col("Flight.departureAirportId"),
                "=",
                Sequelize.col("departureAirport.code")
              ),
            },
            include: {
              model: City,
              required: true,
            },
          },
          {
            model: Airport,
            required: true,
            as: "arrivalAirport",
            on: {
              col1: Sequelize.where(
                Sequelize.col("Flight.arrivalAirportId"),
                "=",
                Sequelize.col("arrivalAirport.code")
              ),
            },
            include: {
              model: City,
              required: true,
            },
          },
        ],
      });
      return response;
    } catch (error) {
      logger.error("Fetching of Flights went wrong at Repo Layer");
      throw error;
    }
  }

  async updateRemainingSeats(flightId, seats, dec = true) {
    // Parse seats as an integer to ensure correct numeric type
    seats = parseInt(seats);

    if (!Number.isInteger(seats) || seats <= 0) {
      throw new Error("Seats must be a positive integer");
    }

    const flight = await Flight.findByPk(flightId);
    if (!flight) {
      throw new Error(`Flight with ID${flightId} not found`);
    }

    // Normalize dec if it's a string ("true" or "false")
    if (typeof dec == "string") {
      dec = dec.toLowerCase();
      dec = dec == "true";
    }

    if (dec) {
      if (flight.totalSeats < seats) {
        throw new Error("Not enough seats available");
      }
      await flight.decrement("totalSeats", { by: seats });
    } else {
      await flight.increment("totalSeats", { by: seats });
    }

    // ensures updated values are returned
    return flight.reload();
  }
}

module.exports = FlightRepository;
