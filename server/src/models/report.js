'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reports = sequelize.define('Report', {
    totalRevenue: DataTypes.DOUBLE
  }, {});
  Reports.associate = function(models) {
    // associations can be defined here
  };
  return Reports;
};