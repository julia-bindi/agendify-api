const { encryptor } = require("../helpers");

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    imageName: DataTypes.STRING,
    imageType: DataTypes.STRING,
    imageData: DataTypes.BLOB,
    phone: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.associate = function(model) {
    User.hasMany(model.Company, {
      foreignKey: "user"
    })
  }

  User.associate = function(model) {
    User.hasMany(model.Reservation, {
      foreignKey: "user"
    })
  }
  
  User.beforeSave(async (user, options) => {
    const password = await encryptor.hashPassword(user.password);
    if (user.changed("password")) {
      Object.assign(user, { password });
    }
    return user;
  });

  return User;
};