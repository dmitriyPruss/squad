const { Router } = require("express");
const {
  onlyForCreative,
  canSendOffer,
  onlyForModerator,
} = require("./../middlewares/basicMiddlewares");
const { checkToken } = require("./../middlewares/checkToken");
const {
  setNewOffer,
  getOffersForModerator,
  getEmailMessages,
  setOfferStatus,
  directEmailBox,
} = require("./../controllers/offerController");
const { uploadLogoFiles } = require("./../utils/fileUpload");

const offerRouter = Router();

offerRouter.use(checkToken);

offerRouter.get("/:page", onlyForModerator, getOffersForModerator);

offerRouter.post("/setNewOffer", uploadLogoFiles, canSendOffer, setNewOffer);

offerRouter.post("/setOfferStatus", onlyForModerator, setOfferStatus);

offerRouter.get("/emailMessages/:page", getEmailMessages);

offerRouter.post("/directEmailBox", onlyForCreative, directEmailBox);

module.exports = offerRouter;
