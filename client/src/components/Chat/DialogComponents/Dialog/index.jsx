import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import className from "classnames";
import {
  getDialogMessages,
  clearMessageList,
} from "../../../../actions/actionCreator";
import ChatHeader from "../../ChatComponents/ChatHeader";
import ChatInput from "../../ChatComponents/ChatInput";
import styles from "./Dialog.module.sass";

class Dialog extends React.Component {
  componentDidMount() {
    const {
      getDialog,
      interlocutor: { id },
    } = this.props;

    getDialog({ interlocutorId: id });
    this.scrollToBottom();
  }

  messagesEnd = React.createRef();

  scrollToBottom = () => {
    this.messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  componentWillUnmount() {
    this.props.clearMessageList();
  }

  componentDidUpdate(prevProps) {
    if (this.messagesEnd.current) {
      this.scrollToBottom();
    }

    const {
      getDialog,
      interlocutor: { id },
    } = this.props;

    if (prevProps.interlocutor.id !== id) {
      getDialog({ interlocutorId: id });
    }
  }

  renderMainDialog = () => {
    const messagesArray = [];
    const { messages, userId } = this.props;

    let currentTime = moment();
    messages.forEach((message, i) => {
      if (!currentTime.isSame(message.createdAt, "date")) {
        messagesArray.push(
          <div key={message.createdAt} className={styles.date}>
            {moment(message.createdAt).format("MMMM DD, YYYY")}
          </div>
        );
        currentTime = moment(message.createdAt);
      }
      messagesArray.push(
        <div
          key={i}
          className={className(
            userId === message.sender ? styles.ownMessage : styles.message
          )}
        >
          <span>{message.body}</span>
          <span className={styles.messageTime}>
            {moment(message.createdAt).format("HH:mm")}
          </span>
          <div ref={this.messagesEnd} />
        </div>
      );
    });
    return <div className={styles.messageList}>{messagesArray}</div>;
  };

  blockMessage = () => {
    const {
      userId,
      chatData,
      chatData: { blackList, participants },
    } = this.props;

    const userIndex = participants.indexOf(userId);

    let message;
    if (chatData && blackList[userIndex]) {
      message = "You blocked the interlocutor";
    } else if (chatData && blackList.includes(true)) {
      message = "You are blocked";
    }
    return <span className={styles.messageBlock}>{message}</span>;
  };

  render() {
    const { chatData, userId } = this.props;
    return (
      <>
        <ChatHeader userId={userId} />
        {this.renderMainDialog()}
        <div ref={this.messagesEnd} />
        {chatData && chatData.blackList.includes(true) ? (
          this.blockMessage()
        ) : (
          <ChatInput />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => state.chatStore;

const mapDispatchToProps = (dispatch) => ({
  getDialog: (data) => dispatch(getDialogMessages(data)),
  clearMessageList: () => dispatch(clearMessageList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
