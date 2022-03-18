const { Router } = require("express");
const {
  onlyForCreative,
  canGetContest,
  parseQuery,
} = require("./../middlewares/basicMiddlewares");
const { checkToken } = require("./../middlewares/checkToken");
const {
  getContests,
  dataForContest,
  getCustomersContests,
  getContestById,
  updateContest,
} = require("./../controllers/contestController");
const { updateContestFile } = require("./../utils/fileUpload");

const contestRouter = Router();

contestRouter.use(checkToken);

contestRouter.get("/all", onlyForCreative, parseQuery, getContests);

contestRouter.get("/customers", getCustomersContests);

contestRouter.post("/dataForContest", dataForContest);

contestRouter
  .route("/:contestId")
  .get(canGetContest, getContestById)
  .patch(updateContestFile, updateContest);

module.exports = contestRouter;
