const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../constants");
const ServerError = require("../errors/ServerError");

module.exports = async (req, res, next) => {
  const { password } = req.body;

  try {
    req.hashPass = await bcrypt.hash(password, SALT_ROUNDS);
    next();
  } catch (err) {
    next(new ServerError("Server Error on hash password"));
  }
};
