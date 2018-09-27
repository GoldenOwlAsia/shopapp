'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    importPrice: {
      allowNull: false,
      type: DataTypes.DOUBLE
    },
    price: {
      allowNull: false,
      type: DataTypes.DOUBLE
    },
    category: {
      allowNull: true,
      type: DataTypes.STRING
    },
    description: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    color: {
      allowNull: false,
      type: DataTypes.STRING
    },
    images: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    size: {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};