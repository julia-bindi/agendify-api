const { signup } = require("./signup.controller")
const { login } = require("./login.controller")
const { myServices } = require("./myServices.controller")
const { myReservations } = require("./myReservations.controller")
const { companyServices } = require("./companyServices.controller")

module.exports = {
    signup,
    login,
    myServices,
    myReservations,
    companyServices
}