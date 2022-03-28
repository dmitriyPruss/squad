const fileHandler = require("./fileHandler");

module.exports = () => {
  setInterval(() => {
    const date = new Date();

    if (date.getHours() === 13 && date.getMinutes() === 52) {
      fileHandler();
    }
  }, 60 * 1000);
};
