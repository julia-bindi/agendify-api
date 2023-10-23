const { Service } = require("../models");

module.exports = {
  list: (query) => Service.findAndCountAll(query),
  getById: (id) => Service.findByPk(id),
  get: (params) => Service.findOne({ where: params }),
  create: (params) => Service.create(params),
  update: (service) => service.save(),
  destroy: (id) => Service.destroy({ where: { id } }),
};