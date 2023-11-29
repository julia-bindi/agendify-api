const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const { Op } = require("sequelize")

const { encryptor, messages } = require("../../helpers");
const { constants } = require("../../utils");
const { reservationRepository, serviceRepository, usersRepository, companyRepository} = require("../../repositories");
const { promisify } = require("util");
const { RowDescriptionMessage } = require("pg-protocol/dist/messages");

module.exports.myReservations = async(token) => {
    const payload = encryptor.decode(token)

    const response = []
    if(payload.type == constants.client){
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
    }
    else {
        const company = await companyRepository.get({ user: payload.id})
        const reservations = await reservationRepository.list({
            where:{
                company: company.id
            },
            raw: true
        })

        const ServiceIds = []
        const UserIds = []
        reservations.rows.forEach(r => {
            ServiceIds.push(r.service)
            UserIds.push(r.user)
        });

        const services = await serviceRepository.list({
            where: {
                id: { [Op.in]: ServiceIds}
            },
            raw: true
        })

        const users = await usersRepository.list({
            where: {
                id: { [Op.in]: UserIds}
            },
            raw: true
        })

        servicesDict = {}
        services.rows.forEach( s => {
            servicesDict[s.id] = s 
        })
        usersDict = {}
        users.rows.forEach( s => {
            usersDict[s.id] = s 
        })

        reservations.rows.forEach(r =>{
            response.push({
                id: r.id,
                company: r.company,
                user: usersDict[r.user],
                service: servicesDict[r.service],
                start: r.start,
                date: r.date,
                status: r.status
            })
        })
    }


    return response
}
