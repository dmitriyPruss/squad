const CONSTANTS = {
  JWT_SECRET: 'asdasdasd4as5d4as8d7a8sd4as65d4a8sd7asd4as56d4',
  ACCESS_TOKEN_TIME: 60 * 60,
  SALT_ROUNDS: 5,
  SQUADHELP_BANK: {
    NUMBER: '4564654564564564',
    NAME: 'SquadHelp',
    CVC: '453',
    EXPIRY: '11/22'
  },
  CUSTOMER: 'customer',
  CREATOR: {
    NAME: 'creator',
    CREATOR_ENTRIES: 'creator_entries'
  },
  CONTEST: {
    NAME: 'name',
    LOGO: 'logo',
    TAGLINE: 'tagline',
    STATUS: {
      ACTIVE: 'active',
      FINISHED: 'finished',
      PENDING: 'pending'
    }
  },
  CONTESTS_DEFAULT_DIR: 'public/contestFiles/',
  OFFER_STATUS: {
    PENDING: 'pending',
    REJECTED: 'rejected',
    WON: 'won'
  },
  FILES_PATH: 'public/',
  SOCKET: {
    CONNECTION: 'connection',
    SUBSCRIBE: 'subscribe',
    UNSUBSCRIBE: 'unsubscribe'
  },
  NOTIFICATION: {
    ENTRY_CREATED: 'onEntryCreated',
    CHANGE: {
      MARK: 'changeMark',
      OFFER_STATUS: 'changeOfferStatus'
    }
  },
  NEW_MESSAGE: 'newMessage',
  CHANGE_BLOCK_STATUS: 'CHANGE_BLOCK_STATUS',
  TRANSACTION_OPERATION_TYPES: {
    INCOME: 'INCOME',
    EXPENSE: 'EXPENSE'
  }
};

module.exports = CONSTANTS;
