"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Users",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        displayName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        avatar: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "anon.png",
        },
        role: {
          type: Sequelize.ENUM("customer", "creator", "moderator"),
          allowNull: false,
        },
        balance: {
          type: Sequelize.DECIMAL,
          allowNull: false,
          defaultValue: 0,
        },
        accessToken: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        rating: {
          type: Sequelize.FLOAT,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        schema: "public",
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
