'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    createdBy: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    items: {
      allowNull: false,
      type: DataTypes.JSON,
    },
    customerId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    subTotal: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    tax: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    grandTotal: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    raw: true,
  });
  Order.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.User, { foreignKey: 'createdBy', as: 'createdByStaff' });
    this.belongsTo(models.Customer, { foreignKey: 'customerId', as: 'customer' })
  };
  return Order;
};