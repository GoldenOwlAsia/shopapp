'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phoneNumber: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: true,
      type: DataTypes.STRING
    },
    dateOfBirth: {
      allowNull: false,
      type: DataTypes.DATE
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    address: {
      allowNull: true,
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
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};