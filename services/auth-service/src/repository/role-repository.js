const CrudRepository = require("./crud-repository");
const { Role } = require("./../models");
const { logger } = require("../config/index");

class RoleRepository extends CrudRepository {
  constructor() {
    super(Role);
  }

  async getRoleByName(roleName) {
    try {
      return await this.model.findOne({
        where: {
          name: roleName,
        },
      });
    } catch (error) {
      logger.error(`Role repo error in getRoleByName: ${error.message}`);
      throw error;
    }
  }
}

module.exports = RoleRepository;
