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
      allowNull: true,
      default: 0,
      type: DataTypes.DOUBLE(10,2),
    },
    tax: {
      allowNull: true,
      default: 0,
      type: DataTypes.DOUBLE(10,2),
    },
    grandTotal: {
      allowNull: true,
      default: 0,
      type: DataTypes.DOUBLE(10,2),
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