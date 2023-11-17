'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reservations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company: {
        type: Sequelize.INTEGER,
        references: {
          model: "Companies",
          key: "id",
          as: "company"
        }
      },
      service: {
        type: Sequelize.INTEGER,
        references: {
          model: "Services",
          key: "id",
          as: "service"
        }
      },
      start: {
        type: Sequelize.DATE
      },
      date: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING,
        validate:{
          isIn: {
            args: [["OPEN", "RESERVED"]],
            msg: "The status must be OPEN or RESERVED"
          }
        }
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
    await queryInterface.dropTable('Reservations');
  }
};