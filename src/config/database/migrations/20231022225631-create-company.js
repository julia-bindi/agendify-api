'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
          as: "user"
        }
      },
      description: {
        type: Sequelize.STRING
      },
      workDays: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      startTime: {
        type: Sequelize.STRING
      },
      endTime: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      street: {
        type: Sequelize.STRING
      },
      homeNumber: {
        type: Sequelize.INTEGER
      },
      neighborhood: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Companies');
  }
};