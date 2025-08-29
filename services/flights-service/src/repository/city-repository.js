const { Op } = require("sequelize");

const { City } = require("../models/index");
const { logger } = require("../config/index");

class CityRepository {
  async createCity({ name }) {
    try {
      const city = await City.create({
        name,
      });
      return city;
    } catch (error) {
      logger.error(
        `City Creation failed at Repository Layer: ${error.message}`
      );
      throw error;
    }
  }

  async deleteCity(cityId) {
    try {
      await City.destroy({
        where: {
          id: cityId,
        },
      });
      return true;
    } catch (error) {
      logger.error(
        `City Deletion failed at Repository Layer: ${error.message}`
      );
      throw error;
    }
  }

  async updateCity(cityId, data) {
    try {
      const city = await City.update(data, {
        where: {
          id: cityId,
        },
      });
      return city;
    } catch (error) {
      logger.error(
        `City Updation failed at Repository Layer: ${error.message}`
      );
      throw error;
    }
  }

  async getCity(cityId) {
    try {
      const city = await City.findByPk(cityId);
      return city;
    } catch (error) {
      logger.error(
        `City Fetching failed at Repository Layer: ${error.message}`
      );
      throw error;
    }
  }

  async getAllCities(filter) {
    try {
      if (filter.name) {
        const cities = await City.findAll({
          where: {
            name: {
              [Op.startsWith]: filter.name,
            },
          },
        });
        return cities;
      }

      const cities = await City.findAll();
      return cities;
    } catch (error) {
      logger.error(
        `Cities Fetching failed at Repository Layer: ${error.message}`
      );
      throw error;
    }
  }

  async findCityByName(name) {
    try {
      const city = await City.findOne({
        where: {
          name,
        },
      });
      return city;
    } catch (error) {
      logger.error(
        `City Fetching by name failed at Repository Layer: ${error.message}`
      );
      throw error;
    }
  }
}

module.exports = CityRepository;
