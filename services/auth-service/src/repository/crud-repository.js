const { logger } = require("../config/index");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      logger.error(`CRUD repo error in create: ${error.message}`);
      throw error;
    }
  }

  async get(id) {
    try {
      return await this.model.findByPk(id);
    } catch (error) {
      logger.error(`CRUD repo error in get: ${error.message}`);
      throw error;
    }
  }

  async getAll(options = {}) {
    try {
      return await this.model.findAll(options);
    } catch (error) {
      logger.error(`CRUD repo error in getAll: ${error.message}`);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const response = await this.model.update(data, {
        where: { id: id },
      });
      return response;
    } catch (error) {
      logger.error(`CRUD repo error in update: ${error.message}`);
      throw error;
    }
  }

  async destroy(id) {
    try {
      return await this.model.destroy({
        where: { id },
      });
    } catch (error) {
      logger.error(`CRUD repo error in destroy: ${error.message}`);
      throw error;
    }
  }

  async findOne(options = {}) {
    try {
      return await this.model.findOne(options);
    } catch (error) {
      logger.error(`CRUD repo error in findOne: ${error.message}`);
      throw error;
    }
  }
}

module.exports = CrudRepository;
