const CONSTANTS = require('../../constants');

class WebSocket {
  connect (namespace, io) {
    this.io = io.of(namespace);
    this.listen();
  }

  listen () {
    this.io.on(CONSTANTS.SOCKET.CONNECTION, socket => {
      this.onSubscribe(socket);
      this.onUnsubscribe(socket);
      this.anotherSubscribes(socket);
    });
  }

  anotherSubscribes (socket) {}

  onSubscribe (socket) {
    socket.on(CONSTANTS.SOCKET.SUBSCRIBE, id => {
      socket.join(id);
    });
  }

  onUnsubscribe (socket) {
    socket.on(CONSTANTS.SOCKET.UNSUBSCRIBE, id => {
      socket.leave(id);
    });
  }
}

module.exports = WebSocket;
