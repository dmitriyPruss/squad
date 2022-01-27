const ServerError = require('../errors/ServerError');
const { Offer } = require('../models/postgreModels');

module.exports.getOffers = async (req, res, next) => {
  try {
    const foundOffers = await Offer.findAll({
      attributes: ['text', 'status'],
      raw: true
    });
    res.status(200).send(foundOffers);
  } catch (err) {
    next(new ServerError());
  }
};
