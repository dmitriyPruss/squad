const { Router } = require("express");
const { getOffers } = require("./../controllers/offerController");

const offerRouter = Router();

offerRouter.get("/offers", getOffers);

module.exports = offerRouter;
