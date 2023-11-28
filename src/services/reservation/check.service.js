const { StatusCodes } = require("http-status-codes");

const { encryptor, messages } = require("../../helpers");
const { constants } = require("../../utils");
const { reservationRepository, serviceRepository, companyRepository } = require("../../repositories");
const { promisify } = require("util");

module.exports.check = async(serviceId, date) => {
    const reservations = await reservationRepository.list({ where: { service: serviceId, date: date, status: 'RESERVED' }, attributes: ['start'], raw: true})
    const service = await serviceRepository.getById(serviceId)
    const company = await companyRepository.getById(service.company)

    const duration = service.duration * 1
    let s = company.startTime
    const e = company.endTime

    const hours = []
    while(s < e){
        let time = Math.floor(s/60).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            }).toString() 
          + ":" 
          + (s%60).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            }).toString()
        hours.push(time)
        s = Number(s) + Number(duration)
    }

    if(reservations.count != 0){
        const rows = reservations.rows

        rows.forEach(element => {
            const index = hours.indexOf(element.start)
            delete hours[index]
        });
    }

    return hours.filter((element) => element != null)
}