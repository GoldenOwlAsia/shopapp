'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('Users', 'revenue', { type: Sequelize.DOUBLE, allowNull: false, defaultValue: 0 }),
      queryInterface.addColumn('Users', 'soldProducts', { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 }),
    ]
  },
  down: (queryInterface, Sequelize) => {}
};