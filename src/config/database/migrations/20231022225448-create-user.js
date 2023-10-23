'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        unique: true,
        type: Sequelize.STRING,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING
      },
      Photo: {
        type: Sequelize.STRING,
        validate:{
          isUrl:{
            msg: "Precisa ser uma url"
          }
        }
      },
      phone: {
        type: Sequelize.STRING,
        validate: {
          is: ["^\(?[0-9]{2}\)?\s*?[0-9]?[0-9]{4}-?[0-9]{4}$", "g"]
        }
      },
      type: {
        type: Sequelize.STRING,
        validate: {
          isIn: {
            args: [["CLIENT", "COMPANY"]],
            msg: "The type of user must be CLIENT or COMPANY"
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
    await queryInterface.dropTable('Users');
  }
};