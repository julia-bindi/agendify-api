const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const { encryptor, messages } = require("../../helpers");
const { constants } = require("../../utils");
const { usersRepository, companyRepository, serviceRepository, reservationRepository } = require("../../repositories");
const { promisify } = require("util");

module.exports.myServices = async(token) => {
    const payload = encryptor.decode(token)

    if(payload.type != constants.company){
        throw {
            status: StatusCodes.FORBIDDEN,
            messages: messages.doNotHavePermission("companies")
        }
    }

    const company = await companyRepository.get({ user: payload.id })
  
    const services = await serviceRepository.list({
        where:{
            company: company.id
        },
        raw: true,
    })

    return services.rows
}