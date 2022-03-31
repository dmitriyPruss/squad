const WebSocket = require("./WebSocket");
const { NEW_MESSAGE, CHANGE_BLOCK_STATUS, SOCKET } = require("../../constants");

class ChatController extends WebSocket {
  anotherSubscribes(socket) {
    this.onSubscribeChat(socket);
    this.onUnsubscribeChat(socket);
  }

  onSubscribeChat(socket) {
    socket.on(SOCKET.SUBSCRIBE_CHAT, (id) => {
      socket.join(id);
    });
  }

  onUnsubscribeChat(socket) {
    socket.on(SOCKET.UNSUBSCRIBE_CHAT, (id) => {
      socket.leave(id);
    });
  }

  emitNewMessage(target, message) {
    this.io.to(target).emit(NEW_MESSAGE, { message });
  }

  emitChangeBlockStatus(target, message) {
    this.io.to(target).emit(CHANGE_BLOCK_STATUS, { message });
  }
}

module.exports = ChatController;
