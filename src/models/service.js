'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Service.init({
    name: DataTypes.STRING,
    cost: DataTypes.FLOAT,
    duration: DataTypes.FLOAT,
    description: DataTypes.STRING,
    company: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Service',
  });

  Service.associate = function(model) {
    Service.belongsTo(model.Company, {
      foreignKey: "company",
      onDelete: "CASCADE",
    })
  }

  Service.associate = function(model) {
    Service.hasMany(model.Reservation, {
      foreignKey: "service"
    })
  }

  return Service;
};