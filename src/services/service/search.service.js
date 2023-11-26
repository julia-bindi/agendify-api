const { StatusCodes } = require("http-status-codes");

const { Op } = require("sequelize");

const { encryptor, messages } = require("../../helpers");
const { constants } = require("../../utils");
const { serviceRepository, companyRepository} = require("../../repositories");


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
        attributes: ["id"],
        raw: true,
    })
    
    companies.rows.forEach(id => {
        ids.push(id.id)
    });

    const services = await serviceRepository.list({
        where:{
            company: { [Op.in]: ids },
            cost: { [Op.between]: [smallPrice, biggestPrice] }
        },
        raw: true,
    })

    return services
}