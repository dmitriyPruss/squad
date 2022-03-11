const express = require("express");
const cors = require("cors");
const router = require("./router");
const handlerError = require("./handlerError/handler");
const errorLogger = require("./logger/errorLogger");
const fileErrorMw = require("./loggerArchive/fileMw");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/public", express.static("public"));
app.use("/public/images", express.static("./../public/images"));
app.use(router);
app.use(errorLogger());
fileErrorMw();

app.use(handlerError);

module.exports = app;
