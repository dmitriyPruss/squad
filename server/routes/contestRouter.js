const { Router } = require('express');
const {
  onlyForCreative,
  canGetContest,
  parseQuery,
  canSendOffer,
  onlyForCustomerWhoCreateContest
} = require('./../middlewares/basicMiddlewares');
const { checkToken } = require('./../middlewares/checkToken');
const {
  getContests,
  dataForContest,
  getCustomersContests,
  getContestById,
  updateContest,
  downloadFile,
  setNewOffer,
  setOfferStatus
} = require('./../controllers/contestController');
const { updateContestFile, uploadLogoFiles } = require('./../utils/fileUpload');

const contestRouter = Router();

contestRouter.use(checkToken);

contestRouter.get('/all', onlyForCreative, parseQuery, getContests);

contestRouter.get('/customers', getCustomersContests);

contestRouter.post('/dataForContest', dataForContest);

contestRouter
  .route('/:contestId')
  .get(canGetContest, getContestById)
  .patch(updateContestFile, updateContest);

contestRouter.get('/downloadFile/:fileName', downloadFile);

contestRouter.post('/setNewOffer', uploadLogoFiles, canSendOffer, setNewOffer);

contestRouter.post(
  '/setOfferStatus',
  onlyForCustomerWhoCreateContest,
  setOfferStatus
);

module.exports = contestRouter;
