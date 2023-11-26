const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const { encryptor, messages } = require("../../helpers");
const { constants } = require("../../utils");
const { reservationRepository } = require("../../repositories");
const { promisify } = require("util");

module.exports.myReservations = async(token) => {
    const payload = encryptor.decode(token)

    const reservations = await reservationRepository.list({
        where:{
            user: payload.id
        },
        raw: true
    })

    return reservations.rows
}