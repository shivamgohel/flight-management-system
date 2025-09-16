"use strict";

const { Enums } = require("../utils/index");
const { ADMIN, FLIGHT_COMPANY, CUSTOMER } = Enums.USER_ROLES_ENUMS;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("Roles", [
      { name: ADMIN, createdAt: new Date(), updatedAt: new Date() },
      { name: FLIGHT_COMPANY, createdAt: new Date(), updatedAt: new Date() },
      { name: CUSTOMER, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Roles", {
      name: [ADMIN, FLIGHT_COMPANY, CUSTOMER],
    });
  },
};
