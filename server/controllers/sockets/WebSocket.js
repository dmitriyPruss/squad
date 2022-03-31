const { SOCKET } = require("../../constants");

class WebSocket {
  connect(namespace, io) {
    this.io = io.of(namespace);
    this.listen();
  }

  listen() {
    this.io.on(SOCKET.CONNECTION, (socket) => {
      this.anotherSubscribes(socket);
    });
  }

  anotherSubscribes(socket) {}
}

module.exports = WebSocket;
