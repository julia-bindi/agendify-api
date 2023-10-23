'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users",[
      {
        id: 1,
        name: "Company Test",
        email: "company@test.com",
        password: "test",
        Photo: "",
        phone: "1198888-7777",
        type: "COMPANY",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
