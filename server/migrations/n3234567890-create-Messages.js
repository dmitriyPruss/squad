"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Messages",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        sender: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        body: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        conversation: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "Conversations",
            key: "id",
          },
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
    await queryInterface.dropTable("Messages");
  },
};
