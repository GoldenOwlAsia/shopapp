'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('Users', 'revenue', { type: Sequelize.DOUBLE, allowNull: false, defaultValue: 0 }, { transaction: t }),
        queryInterface.addColumn('Users', 'soldProducts', { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 }, { transaction: t })
      ])
    })
  },
  down: (queryInterface, Sequelize) => { }
};