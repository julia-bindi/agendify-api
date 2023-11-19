const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { constants } = require("../utils");

module.exports.encryptor = {
  hashPassword: (password) => bcrypt.hash(password, 8),
  comparePassword: (password, userPassword) =>
    bcrypt.compare(password, userPassword),
  encode: (payload) => jwt.sign(payload, constants.jwtToken),
  decode: (token) => jwt.verify(token, constants.jwtToken)
};
