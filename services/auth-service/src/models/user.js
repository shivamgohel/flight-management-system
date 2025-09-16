"use strict";
const { Model } = require("sequelize");

const { passwordHelpers } = require("../utils/index");
const hashPassword = passwordHelpers.hashPassword;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, {
        through: "UserRoles",
        as: "roles",
        foreignKey: "user_id",
        otherKey: "role_id",
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 50],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate(async (user) => {
    if (user.password) {
      user.password = await hashPassword(user.password);
    }
  });

  return User;
};
