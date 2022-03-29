const { SOCKET } = require("../../constants");

class WebSocket {
  connect(namespace, io) {
    this.io = io.of(namespace);
    this.listen();
  }

  listen() {
    this.io.on(SOCKET.CONNECTION, (socket) => {
      this.onSubscribe(socket);
      this.onUnsubscribe(socket);
      this.anotherSubscribes(socket);
    });
  }

  anotherSubscribes(socket) {}

  onSubscribe(socket) {
    socket.on(SOCKET.SUBSCRIBE, (id) => {
      socket.join(id);
    });
  }

  onUnsubscribe(socket) {
    socket.on(SOCKET.UNSUBSCRIBE, (id) => {
      socket.leave(id);
    });
  }
}

module.exports = WebSocket;
