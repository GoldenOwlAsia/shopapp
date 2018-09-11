'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      items: {
        allowNull: false,
        type: Sequelize.JSON,
      },
      customerId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      subTotal: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      tax: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      grandTotal: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
};