import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import styles from "./ContestSideBar.module.sass";
import CONSTANTS from "../../constants";

const ContestSideBar = (props) => {
  const renderContestInfo = () => {
    const {
      totalEntries,
      contestData: { User, prize, createdAt },
    } = props;

    const { STATIC_IMAGES_PATH, ANONYM_IMAGE_PATH, PUBLIC_URL } = CONSTANTS;

    const getTimeStr = () => {
      const diff = moment.duration(moment().diff(moment(createdAt)));

      const { days, hours } = diff._data;

      let str = "";
      if (days !== 0) str = `${days} days `;
      if (hours !== 0) str += `${hours} hours`;
      if (str.length === 0) str = "less than one hour";
      return str;
    };

    return (
      <div className={styles.contestSideBarInfo}>
        <div className={styles.contestInfo}>
          <div className={styles.awardAndTimeContainer}>
            <div className={styles.prizeContainer}>
              <img src={`${STATIC_IMAGES_PATH}big-diamond.png`} alt="diamond" />
              <span>{`$ ${prize}`}</span>
            </div>
            <div className={styles.timeContainer}>
              <div className={styles.timeDesc}>
                <img src={`${STATIC_IMAGES_PATH}clock.png`} alt="clock" />
                <span>Going</span>
              </div>
              <span className={styles.time}>{getTimeStr()}</span>
            </div>
            <div className={styles.guaranteedPrize}>
              <div>
                <img src={`${STATIC_IMAGES_PATH}smallCheck.png`} alt="check" />
              </div>
              <span>Guaranteed prize</span>
            </div>
          </div>
          <div className={styles.contestStats}>
            <span>Contest Stats</span>
            <div className={styles.totalEntrie}>
              <span className={styles.totalEntriesLabel}>Total Entries</span>
              <span>{totalEntries}</span>
            </div>
          </div>
        </div>
        {props.data.id !== User.id && (
          <div className={styles.infoCustomerContainer}>
            <span className={styles.labelCustomerInfo}>
              About Contest Holder
            </span>
            <div className={styles.customerInfo}>
              <img
                src={
                  User.avatar === "anon.png"
                    ? ANONYM_IMAGE_PATH
                    : `${PUBLIC_URL}${User.avatar}`
                }
                alt="user"
              />
              <div className={styles.customerNameContainer}>
                <span>{`${User.firstName} ${User.lastName}`}</span>
                <span>{User.displayName}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return renderContestInfo();
};

const mapStateToProps = (state) => state.userStore;

export default connect(mapStateToProps, null)(ContestSideBar);
