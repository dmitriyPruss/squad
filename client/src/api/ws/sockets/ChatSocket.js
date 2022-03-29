import isEqual from "lodash/isEqual";
import WebSocket from "./WebSocket";
import CONSTANTS from "../../../constants";
import {
  addMessage,
  changeBlockStatusInStore,
} from "../../../actions/actionCreator";

class ChatSocket extends WebSocket {
  constructor(dispatch, getState, room) {
    super(dispatch, getState, room);
  }

  anotherSubscribes = () => {
    this.onNewMessage();
    this.onChangeBlockStatus();
  };

  onChangeBlockStatus = () => {
    this.socket.on(CONSTANTS.CHANGE_BLOCK_STATUS, (data) => {
      const { message } = data;
      const { messagesPreview } = this.getState().chatStore;
      messagesPreview.forEach((preview) => {
        if (isEqual(preview.participants, message.participants))
          preview.blackList = message.blackList;
      });
      this.dispatch(
        changeBlockStatusInStore({ chatData: message, messagesPreview })
      );
    });
  };

  onNewMessage = () => {
    this.socket.on("newMessage", (data) => {
      const {
        message: {
          message,
          preview,
          message: { body, createdAt, sender, participants },
        },
      } = data;
      const { messagesPreview } = this.getState().chatStore;

      console.log("data", data);

      let isNew = true;
      messagesPreview.forEach((preview) => {
        if (isEqual(preview.participants, participants)) {
          preview.text = body;
          preview.sender = sender;
          preview.createAt = createdAt;
          isNew = false;
        }
      });
      if (isNew) {
        messagesPreview.push(preview);
      }

      console.log("message", message);
      console.log("messagesPreview", messagesPreview);

      this.dispatch(addMessage({ message, messagesPreview }));
    });
  };

  subscribeChat = (id) => {
    this.socket.emit("subscribeChat", id);
  };

  unsubscribeChat = (id) => {
    this.socket.emit("unsubscribeChat", id);
  };
}

export default ChatSocket;
