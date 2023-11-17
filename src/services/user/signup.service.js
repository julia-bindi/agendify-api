const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const { encryptor, messages } = require("../../helpers");
const { constants } = require("../../utils");
const { usersRepository, companyRepository } = require("../../repositories");
const { promisify } = require("util");

module.exports.signup = async (name, email, password, imageName, imageType, imageData, phone, type, description, workDays, openHours, category) => {
    const user = await usersRepository.get({ email })

    if(user) {
        throw {
            status: StatusCodes.CONFLICT,
            message: messages.alreadyExists("user")
        }
    }

    const newUser = {
        name,
        email,
        password,
        imageName,
        imageType,
        imageData,
        phone,
        type,
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    await usersRepository.create(newUser);

    const userGot = await usersRepository.get({ email })

    if(type == "COMPANY"){
        const newCompany = {
            user: userGot.id,
            description,
            workDays,
            openHours,
            category,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        await companyRepository.create(newCompany);
    }

    const payload = {
        id: userGot.id,
        email: userGot.email,
        type: userGot.type
    }

    const sign = promisify(jwt.sign);
    const token = await sign(payload, constants.jwtToken);
  
    return { email, type, token };
};