'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Banks', {
      type: 'check',
      fields: ['balance'],
      where: {
        balance: {
          [Sequelize.Op.gte]: 0
        }
      },
      name: 'Bank_balance'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Banks', 'Bank_balance');
  }
};
