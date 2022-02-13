"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Conversations",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        participants: {
          allowNull: false,
          type: Sequelize.ARRAY(Sequelize.INTEGER),
        },
        favoriteList: {
          allowNull: false,
          type: Sequelize.ARRAY(Sequelize.BOOLEAN),
        },
        blackList: {
          allowNull: false,
          type: Sequelize.ARRAY(Sequelize.BOOLEAN),
          dafaultValue: [false, false],
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        schema: "chat",
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Conversations");
  },
};
