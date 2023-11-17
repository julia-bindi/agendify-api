const { Reservation } = require("../models");

module.exports = {
  list: (query) => Reservation.findAndCountAll(query),
  getById: (id) => Reservation.findByPk(id),
  get: (params) => Reservation.findOne({ where: params }),
  create: (params) => Reservation.create(params),
  update: (reservation) => reservation.save(),
  destroy: (id) => Reservation.destroy({ where: { id } }),
};