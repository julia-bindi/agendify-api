const { create } = require("./create.service");
const { destroy } = require("./delete.service");
const { search } = require("./search.service")

module.exports = {
    create,
    destroy,
    search,
}