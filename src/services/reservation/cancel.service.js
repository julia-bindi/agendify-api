const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const { encryptor, messages } = require("../../helpers");
const { constants } = require("../../utils");
const { companyRepository, reservationRepository, serviceRepository } = require("../../repositories");
const { promisify } = require("util");

module.exports.cancel = async(reservationId) => {
  
    const reservation = await reservationRepository.getById(reservationId)

    if (!reservation){
        throw{
            status: StatusCodes.NOT_FOUND,
            message: messages.notFound("reservation")
        }
    }

    const deleted = await reservationRepository.destroy(reservationId)

    return deleted
}