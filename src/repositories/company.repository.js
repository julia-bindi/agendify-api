const { Company } = require("../models");

module.exports = {
  list: (query) => Company.findAndCountAll(query),
  getById: (id) => Company.findByPk(id),
  get: (params) => Company.findOne({ where: params }),
  create: (params) => Company.create(params),
  update: (company) => company.save(),
  destroy: (id) => Company.destroy({ where: { id } }),
};