'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserToken = sequelize.define('UserToken', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    token: {
      allowNull: false,
      type: DataTypes.STRING
    },
    expiredAt: {
      allowNull: false,
      type: DataTypes.DATE
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
  UserToken.associate = function(models) {
    // associations can be defined here
  };
  return UserToken;
};