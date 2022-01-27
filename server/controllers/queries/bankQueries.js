const { Bank } = require('../../models/postgreModels');
const BankDeclineError = require('../../errors/BankDeclineError');

module.exports.updateBankBalance = async (data, predicate, transaction) => {
  const [updatedCount, [updatedBank]] = await Bank.update(data, {
    where: predicate,
    returning: true,
    transaction
  });

  console.log('updatedCount', updatedCount);
  if (updatedCount < 2) {
    throw new BankDeclineError('Bank decline transaction');
  }
};
