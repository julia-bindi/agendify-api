const { signup } = require("./signup.service");
const { login } = require("./login.service")
const { myServices } = require('./myServices.service')

module.exports = {
    signup,
    login,
    myServices
}