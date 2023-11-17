'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('Companies', [
    {
      user: 1,
      description: "Company to test the api",
      workDays: ["seg", "terça", "quarta"],
      openHours: "8h - 18h",
      category: "Test",
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Companies', null, {});
  }
};
