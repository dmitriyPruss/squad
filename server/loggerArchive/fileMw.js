const fileHandler = require("./fileHandler");

module.exports = (err, req, res, next) => {
  setInterval(() => {
    const date = new Date();

    console.log(
      "date.getHours(",
      date.getHours(),
      ":",
      date.getMinutes(),
      ":",
      date.getSeconds()
    );

    if (date.getHours() === 14 && date.getMinutes() === 30) {
      fileHandler();
    }
  }, 60 * 1000);
};
