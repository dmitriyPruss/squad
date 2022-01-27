'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Users', {
      type: 'check',
      fields: ['balance'],
      where: {
        balance: {
          [Sequelize.Op.gte]: 0
        }
      },
      name: 'User_balance'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users', 'User_balance');
  }
};
