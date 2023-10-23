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
  Reseration.init({
    company: DataTypes.INTEGER,
    service: DataTypes.INTEGER,
    start: DataTypes.DATE,
    date: DataTypes.DATE,
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
    Reservation.belongsTo(model.Service, {
      foreignKey: "serice",
      onDelete: "CASCADE"
    })
  }

  return Reservation;
};