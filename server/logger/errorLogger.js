const winston = require("winston");
const expressWinston = require("express-winston");
const path = require("path");

module.exports = () => {
  const { dir } = path.parse(__dirname);

  const filePath = `${dir}/logger/err_report.txt`;

  const errorFormat = winston.format.printf((error) => {
    const {
      meta: {
        error: { code, message },
        date,
        stack,
      },
    } = error;

    const errorData = {
      message,
      time: Number(new Date(date)),
      code,
      stackTrace: stack,
    };

    return JSON.stringify(errorData, null, 2);
  });

  return expressWinston.errorLogger({
    transports: [
      new winston.transports.File({
        filename: filePath,
        format: winston.format.combine(errorFormat),
        showTrack: true,
      }),
    ],
  });
};
