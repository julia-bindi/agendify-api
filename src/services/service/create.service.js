const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const { encryptor, messages } = require("../../helpers");
const { constants } = require("../../utils");
const { serviceRepository } = require("../../repositories");
const { promisify } = require("util");

module.exports.create = async(token, name, cost, duration, description) => {
    const payload = encryptor.decode(token)

    if(payload.type != constants.company){
        throw {
            status: StatusCodes.FORBIDDEN,
            messages: messages.doNotHavePermission("companies")
        }
    }
    console.log(payload.id)
    const service = {
        name,
        cost,
        duration,
        description,
        company: payload.id,
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    await serviceRepository.create(service)

    const serviceGot = await serviceRepository.get({ name })

    return serviceGot
}