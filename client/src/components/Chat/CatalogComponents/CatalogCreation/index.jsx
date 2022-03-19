import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import CONSTANTS from "../../../../constants";
import {
  changeTypeOfChatAdding,
  changeShowAddChatToCatalog,
  getCatalogList,
} from "../../../../actions/actionCreator";
import styles from "./CatalogCreation.module.sass";
import AddToCatalog from "../AddToCatalog";
import CreateCatalog from "../CreateCatalog";

class CatalogCreation extends React.Component {
  componentDidMount() {
    this.props.getCatalogList();
  }

  render() {
    const {
      changeTypeOfChatAdding,
      catalogCreationMode,
      changeShowAddChatToCatalog,
      isFetching,
    } = this.props;

    const { ADD_CHAT_TO_OLD_CATALOG, CREATE_NEW_CATALOG_AND_ADD_CHAT } =
      CONSTANTS;
    return (
      <>
        {!isFetching && (
          <div className={styles.catalogCreationContainer}>
            <i
              className="far fa-times-circle"
              onClick={() => changeShowAddChatToCatalog()}
            />
            <div className={styles.buttonsContainer}>
              <span
                onClick={() => changeTypeOfChatAdding(ADD_CHAT_TO_OLD_CATALOG)}
                className={classNames({
                  [styles.active]:
                    catalogCreationMode === ADD_CHAT_TO_OLD_CATALOG,
                })}
              >
                Old
              </span>
              <span
                onClick={() =>
                  changeTypeOfChatAdding(CREATE_NEW_CATALOG_AND_ADD_CHAT)
                }
                className={classNames({
                  [styles.active]:
                    catalogCreationMode === CREATE_NEW_CATALOG_AND_ADD_CHAT,
                })}
              >
                New
              </span>
            </div>
            {catalogCreationMode === CREATE_NEW_CATALOG_AND_ADD_CHAT ? (
              <CreateCatalog />
            ) : (
              <AddToCatalog />
            )}
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => state.chatStore;

const mapDispatchToProps = (dispatch) => ({
  changeTypeOfChatAdding: (data) => dispatch(changeTypeOfChatAdding(data)),
  changeShowAddChatToCatalog: () => dispatch(changeShowAddChatToCatalog()),
  getCatalogList: () => dispatch(getCatalogList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogCreation);
