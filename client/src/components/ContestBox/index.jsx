import React from "react";
import moment from "moment";
import CONSTANTS from "../../constants";
import styles from "./ContestBox.module.sass";

const ContestBox = (props) => {
  const {
    data: {
      id,
      title,
      contestType,
      createdAt,
      prize,
      count,
      brandStyle,
      typeOfName,
      typeOfTagline,
    },
    goToExtended,
  } = props;

  const {
    CONTEST: { NAME, LOGO },
    STATIC_IMAGES_PATH,
  } = CONSTANTS;

  const getTimeStr = () => {
    const diff = moment.duration(moment().diff(moment(createdAt)));

    const {
      _data: { days, hours },
    } = diff;

    let str = "";
    if (days !== 0) {
      str = `${days}d `;
    }
    if (hours !== 0) {
      str += `${hours}h`;
    }
    if (str.length === 0) {
      str = "less than one hour";
    }

    return str;
  };

  const getPreferenceContest = () => {
    if (contestType === NAME) {
      return typeOfName;
    }
    if (contestType === LOGO) {
      return brandStyle;
    }
    return typeOfTagline;
  };

  const ucFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <li
      key={id}
      className={styles.contestBoxContainer}
      onClick={() => goToExtended(id)}
    >
      <div className={styles.mainContestInfo}>
        <div className={styles.titleAndIdContainer}>
          <span className={styles.title}>{title}</span>
          <span className={styles.id}>{`(#${id})`}</span>
        </div>
        <div className={styles.contestType}>
          <span>{`${ucFirstLetter(
            contestType
          )} / ${getPreferenceContest()}`}</span>
        </div>
        <div className={styles.contestType}>
          <span>
            This is an Invitation Only Contest and is only open to those
            Creatives who have achieved a Tier A status.
          </span>
        </div>
        <div className={styles.prizeContainer}>
          <div className={styles.guaranteedContainer}>
            <div>
              <img src={`${STATIC_IMAGES_PATH}smallCheck.png`} alt="check" />
            </div>
            <span>Guaranteed prize</span>
          </div>
          <div className={styles.prize}>
            <img src={`${STATIC_IMAGES_PATH}diamond.png`} alt="diamond" />
            <span>{`$${prize}`}</span>
          </div>
        </div>
      </div>
      <div className={styles.entryAndTimeContainer}>
        <div className={styles.entriesContainer}>
          <div className={styles.entriesCounter}>
            <img src={`${STATIC_IMAGES_PATH}entrieImage.png`} alt="logo" />
            <span>{count}</span>
          </div>
          <span>Entries</span>
        </div>
        <div className={styles.timeContainer}>
          <span className={styles.timeContest}>{getTimeStr()}</span>
          <span>Going</span>
        </div>
      </div>
    </li>
  );
};

export default ContestBox;
