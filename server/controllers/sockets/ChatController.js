const WebSocket = require("./WebSocket");
const { NEW_MESSAGE, CHANGE_BLOCK_STATUS } = require("../../constants");

class ChatController extends WebSocket {
  anotherSubscribes(socket) {
    this.onSubscribeChat(socket);
    this.onUnsubscribeChat(socket);
  }

  onSubscribeChat(socket) {
    socket.on("subscribeChat", (id) => {
      socket.join(id);
    });
  }

  onUnsubscribeChat(socket) {
    socket.on("unsubscribeChat", (id) => {
      socket.join(id);
    });
  }

  emitNewMessage(target, message) {
    this.io.to(parseInt(target)).emit(NEW_MESSAGE, { message });
  }

  emitChangeBlockStatus(target, message) {
    this.io.to(parseInt(target)).emit(CHANGE_BLOCK_STATUS, { message });
  }
}

module.exports = ChatController;
