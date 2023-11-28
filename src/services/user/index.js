const { signup } = require("./signup.service");
const { login } = require("./login.service")
const { myServices } = require('./myServices.service')
const { myReservations } = require("./myReservation.service")
const { companyServices } = require("./companyServices.service")

module.exports = {
    signup,
    login,
    myServices,
    myReservations,
    companyServices
}