const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const { Op } = require("sequelize")

const { encryptor, messages } = require("../../helpers");
const { constants } = require("../../utils");
const { reservationRepository, serviceRepository} = require("../../repositories");
const { promisify } = require("util");
const { RowDescriptionMessage } = require("pg-protocol/dist/messages");

module.exports.myReservations = async(token) => {
    const payload = encryptor.decode(token)

    const reservations = await reservationRepository.list({
        where:{
            user: payload.id
        },
        raw: true
    })

    const ids = []
    reservations.rows.forEach(r => {
        ids.push(r.service)
    });

    const services = await serviceRepository.list({
        where: {
            id: { [Op.in]: ids}
        },
        raw: true
    })

    servicesDict = {}
    services.rows.forEach( s => {
        servicesDict[s.id] = s 
    })

    const response = []
    reservations.rows.forEach(r =>{
        response.push({
            id: r.id,
            company: r.company,
            user: r.user,
            service: servicesDict[r.service],
            start: r.start,
            date: r.date,
            status: r.status
        })
    })


    return response
}