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
      user: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
          as: "user"
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
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
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