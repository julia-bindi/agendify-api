'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('Companies', [
    {
      user: 1,
      description: "Company to test the api",
      workDays: ["seg", "terça", "quarta"],
      startTime: "08:00",
      endTime: "18:00",
      street: "Rua da tentativa",
      homeNumber: 0,
      neighborhood: "Teste",
      city: "test",
      state: "API",
      category: ["Test"],
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Companies', null, {});
  }
};
