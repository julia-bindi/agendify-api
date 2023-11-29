const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const { encryptor, messages } = require("../../helpers");
const { constants } = require("../../utils");
const { usersRepository } = require("../../repositories");
const { promisify } = require("util");

module.exports.login = async (email, passoword) => {
    const user = await usersRepository.get({ email })

    if(!user){
        throw{
            status: StatusCodes.NOT_FOUND,
            message: messages.notFound("user") 
        }
    }

    const validation = await encryptor.comparePassword(passoword, user.password)

    if(!validation){
        throw{
            status: StatusCodes.UNAUTHORIZED,
            message: messages.invalidPassword
        }
    }

    const payload = {
        id: user.id,
        email: user.email,
        type: user.type
    }

    const sign = promisify(jwt.sign);
    const token = await sign(payload, constants.jwtToken);
  
    return { name: user.name, type: user.type, token };

}
