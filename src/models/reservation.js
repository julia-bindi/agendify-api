'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reservation.init({
    company: DataTypes.INTEGER,
    user: DataTypes.INTEGER,
    service: DataTypes.INTEGER,
    start: DataTypes.STRING,
    date: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reservation',
  });

  Reservation.associate = function(model) {
    Reservation.belongsTo(model.Company, {
      foreignKey: "company",
      onDelete: "CASCADE"
    })
  }

  Reservation.associate = function(model) {
    Reservation.belongsTo(model.User, {
      foreignKey: "user",
      onDelete: "CASCADE"
    })
  }

  Reservation.associate = function(model) {
    Reservation.belongsTo(model.Service, {
      foreignKey: "service",
      onDelete: "CASCADE"
    })
  }

  return Reservation;
};