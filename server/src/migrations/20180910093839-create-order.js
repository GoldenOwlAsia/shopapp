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
        type: Sequelize.DOUBLE(10,2),
      },
      tax: {
        allowNull: false,
        type: Sequelize.DOUBLE(10,2),
      },
      grandTotal: {
        allowNull: false,
        type: Sequelize.DOUBLE(10,2),
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