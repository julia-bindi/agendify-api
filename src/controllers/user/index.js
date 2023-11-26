const { signup } = require("./signup.controller")
const { login } = require("./login.controller")
const { myServices } = require("./myServices.controller")
const { myReservations } = require("./myReservations.controller")

module.exports = {
    signup,
    login,
    myServices,
    myReservations
}