const WebSocket = require("./WebSocket");
const {
  NOTIFICATION: { ENTRY_CREATED, CHANGE, SUBSCRIBE, UNSUBSCRIBE },
} = require("../../constants");

class NotificationController extends WebSocket {
  anotherSubscribes(socket) {
    this.onUnsubscribeNotification(socket);
    this.onSubscribeNotification(socket);
  }

  onSubscribeNotification(socket) {
    socket.on(SUBSCRIBE, (id) => {
      socket.join(id);
    });
  }

  onUnsubscribeNotification(socket) {
    socket.on(UNSUBSCRIBE, (id) => {
      socket.leave(id);
    });
  }

  emitChangeMark(target) {
    this.io.to(target).emit(CHANGE.MARK);
  }

  emitChangeOfferStatus(target, message, contestId) {
    this.io.to(target).emit(CHANGE.OFFER_STATUS, { message, contestId });
  }

  emitNewContest(target) {
    console.log("New Contest");
    this.io.to(target).emit("newContest");
  }

  emitNewOffer(target) {
    console.log("New offer");
    this.io.to(target).emit("newOffer");
  }
}

module.exports = NotificationController;
