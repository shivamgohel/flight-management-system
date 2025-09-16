"use strict";
const { Model } = require("sequelize");

const { Enums } = require("../utils/index");
const { ADMIN, FLIGHT_COMPANY, CUSTOMER } = Enums.USER_ROLES_ENUMS;

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, {
        through: "UserRoles",
        as: "users",
        foreignKey: "role_id",
        otherKey: "user_id",
      });
    }
  }
  Role.init(
    {
      name: {
        type: DataTypes.ENUM(ADMIN, FLIGHT_COMPANY, CUSTOMER),
        allowNull: false,
        defaultValue: CUSTOMER,
      },
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
