"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("chat.Messages", {
      fields: ["sender"],
      type: "foreign key",
      name: "sender_field",
      references: {
        table: {
          tableName: "Users",
          schema: "public",
        },
        field: "id",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("chat.Messages", "sender_field");
  },
};
