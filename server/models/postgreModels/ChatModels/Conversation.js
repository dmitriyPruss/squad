"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate(models) {
      Conversation.hasMany(models.Message, {
        foreignKey: "conversation",
        sourceKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Conversation.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      participants: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
      favoriteList: {
        type: DataTypes.ARRAY(DataTypes.BOOLEAN),
        allowNull: false,
        validate: (val) => {
          if (val.length !== 2) {
            throw new Error("Favorite list must have two boolean values!");
          }
        },
        dafaultValue: [false, false],
      },
      blackList: {
        type: DataTypes.ARRAY(DataTypes.BOOLEAN),
        allowNull: false,
        validate: (val) => {
          if (val.length !== 2) {
            throw new Error("Black list must have two boolean values!");
          }
        },
        dafaultValue: [false, false],
      },
    },
    {
      sequelize,
      schema: "chat",
      modelName: "Conversation",
    }
  );
  return Conversation;
};
