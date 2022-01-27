'use strict';
const { Model } = require('sequelize');
const {
  TRANSACTION_OPERATION_TYPES: { EXPENSE, INCOME }
} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate (models) {
      Transaction.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Transaction.init(
    {
      operationType: {
        type: DataTypes.ENUM(EXPENSE, INCOME),
        allowNull: false
      },
      amount: {
        type: DataTypes.DECIMAL,
        validate: { min: 0 },
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Transaction',
      timestamps: true
    }
  );
  return Transaction;
};
