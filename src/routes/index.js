const { hello } = require("./hello.route")
const { user } = require("./user.route")
const { service } = require("./service.route")

module.exports = {
    hello,
    user,
    service,
}