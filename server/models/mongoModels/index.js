const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const env = process.env.NODE_ENV || "development";
const configPath = path.join(__dirname, "./../..", "config/mongoConfig.json");
const config = require(configPath)[env];

mongoose
  .connect(`mongodb://${config.host}:${config.port}/${config.database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((data) => console.log(`Connect with mongoDB`))
  .catch((err) => {
    console.log(`err`, err);
    process.exit(1);
  });

const db = {};
const fileRegExp = /^[^.].*?\.js$/;
const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter((file) => fileRegExp.test(file) && file !== basename)
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    db[model.modelName] = model;
  });

db.mongoose = mongoose;
module.exports = db;
