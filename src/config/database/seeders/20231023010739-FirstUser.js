'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users",[
      {
        name: "Company Test",
        email: "company@test.com",
        password: "$2a$08$EePAvS3RM2mR.vFVpjqyOeH6A.Ptzi7YyxEFTkpHA3aOsKeelBq/S",
        imageName: "image.png",
        imageType: "image/png",
        imageData: "",
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
