'use strict';
const generateToken = () => {
  return Math.floor((Math.random() * 8999) + 1000);
};

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: {
      allowNull: true,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: true,
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
      allowNull: true,
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
    role: {
      allowNull: false,
      type: DataTypes.STRING
    },
    code: {
      allowNull: true,
      type: DataTypes.STRING
    },
    fullName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    salary: {
      allowNull: true,
      type: DataTypes.DOUBLE
    },
    revenue: {
      allowNull: false,
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    soldProducts: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    bonus: {
      allowNull: true,
      type: DataTypes.DOUBLE
    },
    note: {
      allowNull: true,
      type: DataTypes.TEXT('MEDIUM'),
    },
    CMND: {
      allowNull: false,
      type: DataTypes.STRING
    },
    avatar: {
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
  }, {
    raw: true,
  });

  User.associate = function(models) {
    this.hasMany(models.Order, {foreignKey: 'createdBy', as: 'orders'})
  };

  User.beforeCreate((instance, options) => {
    if (instance.role === 'owner') {
      const code = generateToken();;
      instance.code = code;
    }
    return instance;
  });

  return User;
};