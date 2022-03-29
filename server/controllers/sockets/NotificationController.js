const WebSocket = require("./WebSocket");
const { NOTIFICATION } = require("../../constants");

class NotificationController extends WebSocket {
  emitEntryCreated(target) {
    this.io.to(target).emit(NOTIFICATION.ENTRY_CREATED);
  }

  emitChangeMark(target) {
    this.io.to(target).emit(NOTIFICATION.CHANGE.MARK);
  }

  emitChangeOfferStatus(target, message, contestId) {
    this.io
      .to(target)
      .emit(NOTIFICATION.CHANGE.OFFER_STATUS, { message, contestId });
  }
}

module.exports = NotificationController;
