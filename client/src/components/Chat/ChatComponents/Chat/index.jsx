import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import DialogListContainer from "../../DialogComponents/DialogListContainer";
import styles from "./Chat.module.sass";
import Dialog from "../../DialogComponents/Dialog";
import {
  changeChatShow,
  setPreviewChatMode,
  changeShowModeCatalog,
  clearChatError,
  getPreviewChat,
} from "../../../../actions/actionCreator";
import { chatController } from "../../../../api/ws/socketController";
import CONSTANTS from "../../../../constants";
import CatalogListContainer from "../../CatalogComponents/CatalogListContainer";
import CatalogCreation from "../../CatalogComponents/CatalogCreation";
import CatalogListHeader from "../../CatalogComponents/CatalogListHeader";
import ChatError from "../../../ChatError";

class Chat extends React.Component {
  componentDidMount() {
    const {
      userStore: {
        data: { id },
      },
      getPreviewChat,
    } = this.props;

    chatController.subscribeChat(id);
    getPreviewChat();
  }

  componentWillUnmount() {
    const {
      userStore: {
        data: { id },
      },
    } = this.props;

    chatController.unsubscribeChat(id);
  }

  renderDialogList = () => {
    const {
      setChatPreviewMode,
      chatStore: { chatMode, isShowChatsInCatalog },
      userStore: {
        data: { id },
      },
    } = this.props;

    const {
      PREVIEW_CHAT_MODE: { NORMAL, FAVORITE, BLOCKED, CATALOG },
    } = CONSTANTS;

    return (
      <div>
        {isShowChatsInCatalog && <CatalogListHeader />}
        {!isShowChatsInCatalog && (
          <div className={styles.chatHeader}>
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt="logo" />
          </div>
        )}
        {!isShowChatsInCatalog && (
          <div className={styles.buttonsContainer}>
            <span
              onClick={() => setChatPreviewMode(NORMAL)}
              className={classNames(styles.button, {
                [styles.activeButton]: chatMode === NORMAL,
              })}
            >
              Normal
            </span>
            <span
              onClick={() => setChatPreviewMode(FAVORITE)}
              className={classNames(styles.button, {
                [styles.activeButton]: chatMode === FAVORITE,
              })}
            >
              Favorite
            </span>
            <span
              onClick={() => setChatPreviewMode(BLOCKED)}
              className={classNames(styles.button, {
                [styles.activeButton]: chatMode === BLOCKED,
              })}
            >
              Blocked
            </span>
            <span
              onClick={() => setChatPreviewMode(CATALOG)}
              className={classNames(styles.button, {
                [styles.activeButton]: chatMode === CATALOG,
              })}
            >
              Catalog
            </span>
          </div>
        )}
        {chatMode === CATALOG ? <CatalogListContainer /> : <DialogListContainer userId={id} />}
      </div>
    );
  };

  render() {
    const {
      chatStore: { isExpanded, isShow, isShowCatalogCreation, error },
      userStore: {
        data: { id },
      },
      changeShow,
      getPreviewChat,
    } = this.props;

    return (
      <div
        className={classNames(styles.chatContainer, {
          [styles.showChat]: isShow,
        })}
      >
        {error && <ChatError getData={getPreviewChat} />}
        {isShowCatalogCreation && <CatalogCreation />}
        {isExpanded ? <Dialog userId={id} /> : this.renderDialogList()}
        <div className={styles.toggleChat} onClick={() => changeShow()}>
          {isShow ? "Hide Chat" : "Show Chat"}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { chatStore, userStore } = state;
  return { chatStore, userStore };
};

const mapDispatchToProps = (dispatch) => ({
  changeShow: () => dispatch(changeChatShow()),
  setChatPreviewMode: (mode) => dispatch(setPreviewChatMode(mode)),
  changeShowModeCatalog: () => dispatch(changeShowModeCatalog()),
  clearChatError: () => dispatch(clearChatError()),
  getPreviewChat: () => dispatch(getPreviewChat()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
