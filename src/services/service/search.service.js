const { StatusCodes } = require("http-status-codes");

const { Op } = require("sequelize");

const { encryptor, messages } = require("../../helpers");
const { constants } = require("../../utils");
const { serviceRepository, companyRepository, usersRepository} = require("../../repositories");


module.exports.search = async(category = [], startTime = "00:00", endTime = "24:00", smallPrice = 0.0, biggestPrice = Number.POSITIVE_INFINITY, state = "", city = "") => {

    const ids = []
    const stime = startTime.split(":")
    const st = stime[0] * 60 + stime[1] * 1
    const etime = endTime.split(":")
    const et = etime[0] * 60 + etime[1] * 1

    const companies = await companyRepository.list({
        where: {
            category:{ [Op.contains]: category },
            city: { [Op.iLike]: "%" + city + "%" },
            state: { [Op.iLike]: "%" + state + "%" },
            startTime: { [Op.lt]: et },
            endTime: { [Op.gt]: st},
        },
        raw: true,
    })

    companies.rows.forEach(id => {
        ids.push(id.user)
    });

    const users = await usersRepository.list({
        where:{
            id: {[Op.in]: ids}
        },
        raw: true
    })

    userDict = {}
    users.rows.forEach(u => {
        userDict[u.id] = u
    });

    const response = []
    companies.rows.forEach(c => {
        response.push({
            id: userDict[c.user].id,
            name: userDict[c.user].name,
            email: userDict[c.user].email,
            imageName: userDict[c.user].imageName,
            imageType: userDict[c.user].imageType,
            imageData: userDict[c.user].imageData,
            phone: userDict[c.user].phone,
            description: c.description,
            workDays: c.workDays,
            startTime: (Math.trunc(c.startTime/60)).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
              }) + ":" + (c.startTime%60).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
              }),
            endTime: (Math.trunc(c.endTime/60)).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
              }) + ":" + (c.endTime%60).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
              }),
            category: c.category,
            street: c.street,
            homeNumber: c.homeNumber,
            neighborhood: c.neighborhood,
            city: c.city,
            state: c.state,
        })
    });


    return response
}
