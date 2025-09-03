const { Flight } = require("../models");
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
      });
      return response;
    } catch (error) {
      logger.error("Fetching of Flights went wrong at Repo Layer");
      throw error;
    }
  }
}

module.exports = FlightRepository;
