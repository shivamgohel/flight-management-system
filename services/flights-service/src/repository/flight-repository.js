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
}

module.exports = FlightRepository;
