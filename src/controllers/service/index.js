const { create } = require("./create.controller")
const { destroy } = require("./delete.controller")
const { search } = require("./search.controller")

module.exports = {
    create,
    destroy,
    search,
}