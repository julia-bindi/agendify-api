const { signup } = require("./signup.controller")
const { login } = require("./login.controller")
const { myServices } = require("./myServices.controller")

module.exports = {
    signup,
    login,
    myServices
}