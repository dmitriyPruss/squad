"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("chat.Catalogs", {
      fields: ["userId"],
      type: "foreign key",
      name: "user_id_field",
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
    await queryInterface.removeConstraint("chat.Catalogs", "user_id_field");
  },
};
