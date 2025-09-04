const { Sequelize } = require("sequelize");

const { Flight, Airplane, Airport, sequelize } = require("../models");
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
          },
        ],
      });
      return response;
    } catch (error) {
      logger.error("Fetching of Flights went wrong at Repo Layer");
      throw error;
    }
  }
}

module.exports = FlightRepository;
