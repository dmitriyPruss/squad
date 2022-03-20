const ApplicationError = require("./ApplicationError");

class NotUniqueEmail extends ApplicationError {
  constructor(message) {
    super(message || "This email were already exist", 409);
  }
}

module.exports = NotUniqueEmail;
