const { CityRepository } = require("../repository/index");
const logger = require("../config/index");

class CityService {
  constructor() {
    this.cityRepository = new CityRepository();
  }

  async createCity(data) {
    try {
      const city = await this.cityRepository.createCity(data);
      return city;
    } catch (error) {
      logger.error(`City Creation failed at Service Layer: ${error.message}`);
      throw error;
    }
  }
  async deleteCity(cityId) {
    try {
      const response = await this.cityRepository.deleteCity(cityId);
      return response;
    } catch (error) {
      logger.error(`City Deletion failed at Service Layer: ${error.message}`);
      throw error;
    }
  }
  async updateCity(cityId, data) {
    try {
      const city = await this.cityRepository.updateCity(cityId, data);
      return city;
    } catch (error) {
      logger.error(`City Updation failed at Service Layer: ${error.message}`);
      throw error;
    }
  }
  async getCity(cityId) {
    try {
      const city = await this.cityRepository.getCity(cityId);
      return city;
    } catch (error) {
      logger.error(`City Fetching failed at Service Layer: ${error.message}`);
      throw error;
    }
  }
  async searchCity(cityName) {
    try {
      const city = await this.cityRepository.findCityByName(cityName);
      return city;
    } catch (error) {
      logger.error(`City Searching failed at Service Layer: ${error.message}`);
      throw error;
    }
  }
}

module.exports = CityService;
