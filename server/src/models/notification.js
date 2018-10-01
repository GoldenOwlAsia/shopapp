'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    content: DataTypes.TEXT,
    createdBy: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    type: DataTypes.STRING,
  }, {});
  Notification.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.User, { foreignKey: 'createdBy', as: 'createdByStaff' });
    this.belongsTo(models.Customer, { foreignKey: 'customerId', as: 'customer' });
    this.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
  };
  return Notification;
};