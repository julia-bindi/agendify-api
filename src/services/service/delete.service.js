const { StatusCodes } = require("http-status-codes");

const { encryptor, messages } = require("../../helpers");
const { constants } = require("../../utils");
const { serviceRepository } = require("../../repositories");

module.exports.destroy = async(token, serviceId) => {
    const payload = encryptor.decode(token)

    if(payload.type != constants.company){
        throw {
            status: StatusCodes.FORBIDDEN,
            messages: messages.doNotHavePermission("companies")
        }
    }

    const serviceGot = await serviceRepository.destroy(serviceId)

    return serviceGot
}