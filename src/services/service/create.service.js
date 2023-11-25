const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const { encryptor, messages } = require("../../helpers");
const { constants } = require("../../utils");
const { usersRepository, companyRepository, serviceRepository, reservationRepository } = require("../../repositories");
const { promisify } = require("util");

module.exports.create = async(token, name, cost, duration, description) => {
    const payload = encryptor.decode(token)

    if(payload.type != constants.company){
        throw {
            status: StatusCodes.FORBIDDEN,
            messages: messages.doNotHavePermission("companies")
        }
    }
  
    const company = await companyRepository.get({ user: payload.id})

    const service = {
        name,
        cost,
        duration,
        description,
        company: company.id,
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    await serviceRepository.create(service)

    const serviceGot = await serviceRepository.get({ name })

    return serviceGot
}