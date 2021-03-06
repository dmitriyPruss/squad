import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import isEqual from "lodash/isEqual";
import LightBox from "react-image-lightbox";
import {
  getContestById,
  setOfferStatus,
  clearSetOfferStatusError,
  goToExpandedDialog,
  changeEditContest,
  changeContestViewMode,
  changeShowImage,
} from "../../actions/actionCreator";
import Header from "../../components/Header";
import ContestSideBar from "../../components/ContestSideBar";
import OfferBox from "../../components/OfferBox";
import OfferForm from "../../components/OfferForm";
import Brief from "../../components/Brief";
import SpinnerLoader from "../../components/SpinnerLoader";
import TryAgain from "../../components/TryAgain";
import "react-image-lightbox/style.css";
import Error from "../../components/Error";
import CONSTANTS from "../../constants";
import styles from "./ContestPage.module.sass";

class ContestPage extends React.Component {
  componentWillUnmount() {
    this.props.changeEditContest(false);
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const {
      match: { params },
      getData,
    } = this.props;

    getData({ contestId: params.id });
  };

  setOffersList = () => {
    const array = [];

    const {
      contestByIdStore: {
        offers,
        contestData: { contestType },
      },
    } = this.props;

    offers.forEach((i) => {
      array.push(
        <OfferBox
          data={i}
          key={i.id}
          contestType={contestType}
          date={new Date()}
        />
      );
    });

    return array.length !== 0 ? (
      array
    ) : (
      <div className={styles.notFound}>
        There is no suggestion at this moment
      </div>
    );
  };

  needButtons = (offerStatus) => {
    const {
      contestByIdStore: {
        contestData: {
          status: contestStatus,
          User: { id: contestCreatorId },
        },
      },
      userStore: {
        data: { id: userId },
      },
    } = this.props;

    const {
      STATUS: {
        CONTEST: { ACTIVE },
        OFFER: { PENDING },
      },
    } = CONSTANTS;

    return (
      contestCreatorId === userId &&
      contestStatus === ACTIVE &&
      offerStatus === PENDING
    );
  };

  setOfferStatus = (creatorId, offerId, command) => {
    const {
      clearSetOfferStatusError,
      setOfferStatus,
      contestByIdStore: {
        contestData: { id, orderId, priority },
      },
    } = this.props;

    clearSetOfferStatusError();

    const obj = {
      command,
      offerId,
      creatorId,
      orderId,
      priority,
      contestId: id,
    };

    setOfferStatus(obj);
  };

  findConversationInfo = (interlocutorId) => {
    const {
      chatStore: { messagesPreview },
      userStore: {
        data: { id },
      },
    } = this.props;

    const participants = [id, interlocutorId];
    participants.sort(
      (participant1, participant2) => participant1 - participant2
    );

    const findedMsgPrev = messagesPreview.find((prev) => {
      if (isEqual(participants, prev.participants)) {
        const { participants, id, blackList, favoriteList } = prev;
        return {
          participants,
          id,
          blackList,
          favoriteList,
        };
      }

      return null;
    });

    return findedMsgPrev === null ? null : findedMsgPrev;
  };

  goChat = () => {
    const {
      goToExpandedDialog,
      contestByIdStore: {
        contestData: { User },
      },
    } = this.props;

    goToExpandedDialog({
      interlocutor: User,
      conversationData: this.findConversationInfo(User.id),
    });
  };

  render() {
    const {
      userStore: {
        data: { role },
      },
      contestByIdStore,
      changeShowImage,
      changeContestViewMode,
      getData,
      clearSetOfferStatusError,
    } = this.props;

    const {
      isShowOnFull,
      imagePath,
      error,
      isFetching,
      contestData,
      offers,
      setOfferStatusError,
    } = contestByIdStore;

    let { isBrief } = contestByIdStore;

    const {
      CREATOR,
      CUSTOMER,
      PUBLIC_URL,
      STATUS: {
        CONTEST: { ACTIVE },
      },
    } = CONSTANTS;

    if (contestData?.status === ACTIVE && role === CUSTOMER) {
      isBrief = true;
    }

    return (
      <div>
        {isShowOnFull && (
          <LightBox
            mainSrc={`${PUBLIC_URL}${imagePath}`}
            onCloseRequest={() =>
              changeShowImage({ isShowOnFull: false, imagePath: null })
            }
          />
        )}
        <Header />
        {error ? (
          <div className={styles.tryContainer}>
            <TryAgain getData={getData} />
          </div>
        ) : isFetching ? (
          <div className={styles.containerSpinner}>
            <SpinnerLoader />
          </div>
        ) : (
          <div className={styles.mainInfoContainer}>
            <div className={styles.infoContainer}>
              <div className={styles.buttonsContainer}>
                <span
                  onClick={() => changeContestViewMode(true)}
                  className={classNames(styles.btn, {
                    [styles.activeBtn]: isBrief,
                  })}
                >
                  Brief
                </span>
                {contestData.status === ACTIVE && role === CUSTOMER ? null : (
                  <span
                    onClick={() => changeContestViewMode(false)}
                    className={classNames(styles.btn, {
                      [styles.activeBtn]: !isBrief,
                    })}
                  >
                    Offer
                  </span>
                )}
              </div>
              {isBrief ? (
                <Brief
                  contestData={contestData}
                  role={role}
                  goChat={this.goChat}
                />
              ) : (
                <div className={styles.offersContainer}>
                  {role === CREATOR && contestData.status === ACTIVE && (
                    <OfferForm
                      contestType={contestData.contestType}
                      contestId={contestData.id}
                      customerId={contestData.User.id}
                    />
                  )}
                  {setOfferStatusError && (
                    <Error
                      data={setOfferStatusError.data}
                      status={setOfferStatusError.status}
                      clearError={clearSetOfferStatusError}
                    />
                  )}
                  <div className={styles.offers}>{this.setOffersList()}</div>
                </div>
              )}
            </div>
            <ContestSideBar
              contestData={contestData}
              totalEntries={offers.length}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { contestByIdStore, userStore, chatStore } = state;
  return { contestByIdStore, userStore, chatStore };
};

const mapDispatchToProps = (dispatch) => ({
  getData: (data) => dispatch(getContestById(data)),
  setOfferStatus: (data) => dispatch(setOfferStatus(data)),
  clearSetOfferStatusError: () => dispatch(clearSetOfferStatusError()),
  goToExpandedDialog: (data) => dispatch(goToExpandedDialog(data)),
  changeEditContest: (data) => dispatch(changeEditContest(data)),
  changeContestViewMode: (data) => dispatch(changeContestViewMode(data)),
  changeShowImage: (data) => dispatch(changeShowImage(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContestPage);
