const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const { encryptor, messages } = require("../../helpers");
const { constants } = require("../../utils");
const { usersRepository, companyRepository, serviceRepository, reservationRepository } = require("../../repositories");
const { promisify } = require("util");

module.exports.companyServices = async(email) => {
    const user = await usersRepository.get({ email })

    const company = await companyRepository.get({ user: user.id })
  
    const services = await serviceRepository.list({
        where:{
            company: company.id
        },
        raw: true,
    })

    return services.rows
}