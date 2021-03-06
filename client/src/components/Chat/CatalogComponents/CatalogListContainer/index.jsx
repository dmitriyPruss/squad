import React from "react";
import { connect } from "react-redux";
import {
  getCatalogList,
  removeChatFromCatalog,
} from "../../../../actions/actionCreator";
import CatalogList from "../CatalogList";
import DialogList from "../../DialogComponents/DialogList";

class CatalogListContainer extends React.Component {
  componentDidMount() {
    this.props.getCatalogList();
  }

  removeChatFromCatalog = (event, chatId) => {
    const {
      chatStore: {
        currentCatalog: { id },
      },
      removeChatFromCatalog,
    } = this.props;

    removeChatFromCatalog({ chatId, catalogId: id });
    event.stopPropagation();
  };

  getDialogsPreview = () => {
    const {
      chatStore: {
        messagesPreview,
        currentCatalog: { chats },
      },
    } = this.props;

    const dialogsInCatalog = [];
    messagesPreview.forEach((preview) => {
      chats.forEach((chat) => {
        if (chat === preview.id) {
          return dialogsInCatalog.push(preview);
        }
      });
    });

    return dialogsInCatalog;
  };

  render() {
    const {
      chatStore: { catalogList, isShowChatsInCatalog },
      userStore: {
        data: { id },
      },
    } = this.props;

    return (
      <>
        {isShowChatsInCatalog ? (
          <DialogList
            userId={id}
            preview={this.getDialogsPreview()}
            removeChat={this.removeChatFromCatalog}
          />
        ) : (
          <CatalogList catalogList={catalogList} />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { chatStore, userStore } = state;
  return { chatStore, userStore };
};

const mapDispatchToProps = (dispatch) => ({
  getCatalogList: (data) => dispatch(getCatalogList(data)),
  removeChatFromCatalog: (data) => dispatch(removeChatFromCatalog(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CatalogListContainer);
