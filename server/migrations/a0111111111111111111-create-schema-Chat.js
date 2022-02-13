"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createSchema("chat");
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropSchema("chat");
  },
};
