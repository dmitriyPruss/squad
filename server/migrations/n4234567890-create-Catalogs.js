"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Catalogs",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          allowNull: false,
          type: Sequelize.SMALLINT,
        },
        catalogName: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        chats: {
          allowNull: false,
          type: Sequelize.ARRAY(Sequelize.INTEGER),
        },
      },
      {
        schema: "chat",
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Catalogs");
  },
};
