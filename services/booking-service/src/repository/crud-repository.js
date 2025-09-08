const { StatusCodes } = require("http-status-codes");

const { logger } = require("../config/index");
const AppError = require("../utils/errors/app-error");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      logger.error("failed to create resource at Repo Layer", error);
      throw new AppError(
        "failed to create resource",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async get(id) {
    try {
      const response = await this.model.findByPk(id);
      if (!response) {
        throw new AppError("Resource not found", StatusCodes.NOT_FOUND);
      }
      return response;
    } catch (error) {
      logger.error("failed to fetch resource at Repo Layer", error);
      throw new AppError(
        "failed to fetch resource",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAll() {
    try {
      const response = await this.model.findAll();
      return response;
    } catch (error) {
      logger.error("failed to fetch resources at Repo Layer", error);
      throw new AppError(
        "failed to fetch resources",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(id, data) {
    try {
      const response = await this.model.update(data, {
        where: {
          id: id,
        },
      });
      return response;
    } catch (error) {
      logger.error("failed to update resources at Repo Layer", error);
      throw new AppError(
        "failed to update resources",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async destroy(id) {
    try {
      const response = await this.model.destroy({
        where: {
          id: id,
        },
      });
      return response;
    } catch (error) {
      logger.error("failed to delete resources at Repo Layer", error);
      throw new AppError(
        "failed to delete resources",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = CrudRepository;
