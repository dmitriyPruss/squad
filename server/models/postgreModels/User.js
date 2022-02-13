"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Offer, { foreignKey: "userId", sourceKey: "id" });
      User.hasMany(models.Contest, { foreignKey: "userId", sourceKey: "id" });
      User.hasMany(models.Rating, { foreignKey: "userId", sourceKey: "id" });
      User.hasMany(models.Transaction, { foreignKey: "userId" });
      //
      User.hasMany(models.Message, { foreignKey: "sender", sourceKey: "id", onDelete: "CASCADE" });
      User.hasMany(models.Catalog, { foreignKey: "userId", sourceKey: "id", onDelete: "CASCADE" });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "anon.png",
      },
      role: {
        type: DataTypes.ENUM("customer", "creator"),
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      accessToken: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      schema: "public",
      modelName: "User",
      timestamps: false,
    }
  );
  return User;
};