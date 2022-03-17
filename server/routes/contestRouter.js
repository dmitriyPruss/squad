const { Router } = require("express");
const {
  onlyForCreative,
  canGetContest,
  parseQuery,
  canSendOffer,
  onlyForModerator,
} = require("./../middlewares/basicMiddlewares");
const { checkToken } = require("./../middlewares/checkToken");
const {
  getContests,
  dataForContest,
  getCustomersContests,
  getContestById,
  updateContest,
  setNewOffer,
  getOffersForModerator,
  getEmailMessages,
  setOfferStatus,
  directEmailBox,
} = require("./../controllers/contestController");
const { updateContestFile, uploadLogoFiles } = require("./../utils/fileUpload");

const contestRouter = Router();

contestRouter.use(checkToken);

contestRouter.get("/offers/:page", onlyForModerator, getOffersForModerator);
contestRouter.get("/emailMessages/:page", onlyForCreative, getEmailMessages);
contestRouter.post("/directEmailBox", onlyForCreative, directEmailBox);

contestRouter.get("/all", onlyForCreative, parseQuery, getContests);

contestRouter.get("/customers", getCustomersContests);

contestRouter.post("/dataForContest", dataForContest);

contestRouter
  .route("/:contestId")
  .get(canGetContest, getContestById)
  .patch(updateContestFile, updateContest);

contestRouter.post("/setNewOffer", uploadLogoFiles, canSendOffer, setNewOffer);

contestRouter.post("/setOfferStatus", onlyForModerator, setOfferStatus);

module.exports = contestRouter;
