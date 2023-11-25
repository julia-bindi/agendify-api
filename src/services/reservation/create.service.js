const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const { encryptor, messages } = require("../../helpers");
const { constants } = require("../../utils");
const { companyRepository, reservationRepository, serviceRepository } = require("../../repositories");
const { promisify } = require("util");

module.exports.create = async(token, serviceId, date, time) => {
    const payload = encryptor.decode(token)
  
    const service = await serviceRepository.get({ id: serviceId})

    const reservation = {
        company: service.company,
        user: payload.id,
        service: serviceId,
        start: time,
        date,
        status: "RESERVED",
        createdAt: new Date(),
        updatedAt: new Date()
    }

    const reservationCreated = await reservationRepository.create(reservation)

    return reservationCreated
}