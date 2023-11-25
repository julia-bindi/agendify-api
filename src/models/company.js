'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Company.init({
    user: DataTypes.INTEGER,
    description: DataTypes.STRING,
    workDays: DataTypes.ARRAY(DataTypes.STRING),
    startTime: DataTypes.STRING,
    endTime: DataTypes.STRING,
    street: DataTypes.STRING,
    homeNumber: DataTypes.INTEGER,
    neighborhood: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
  });

  Company.associate = function(model) {
    Company.belongsTo(model.User, {
      foreignKey: "user",
      onDelete: "SET NULL"
    })
  }

  Company.associate = function(model) {
    Company.hasMany(model.Service, {
      foreignKey: "company"
    })
  }

  Company.associate = function(model) {
    Company.hasMany(model.Reservation, {
      foreignKey: "company"
    })
  }

  return Company;
};