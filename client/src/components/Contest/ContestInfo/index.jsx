import React from "react";
import styles from "../../Brief/Brief.module.sass";
import CONSTANTS from "../../../constants";
import LogoContestSpecialInfo from "./LogoContestSpecialInfo";
import NameContestSpecialInfo from "./NameContestSpecialInfo";
import TaglineContestSpecialInfo from "./TaglineContestSpecialInfo";

const ContestInfo = (props) => {
  const { changeEditContest, userId, contestData, role, goChat } = props;
  const {
    typeOfTagline,
    brandStyle,
    typeOfName,
    styleName,
    contestType,
    title,
    focusOfWork,
    targetCustomer,
    industry,
    originalFileName,
    fileName,
    User,
    status,
    nameVenture,
  } = contestData;

  const {
    CUSTOMER,
    PUBLIC_URL,
    CONTEST: { NAME, TAGLINE },
    STATUS: {
      CONTEST: { FINISHED },
    },
  } = CONSTANTS;

  return (
    <div className={styles.mainContestInfoContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.contestTypeContainer}>
          <div className={styles.dataContainer}>
            <span className={styles.label}>Contest Type</span>
            <span className={styles.data}>{contestType}</span>
          </div>
          {User.id === userId && status !== FINISHED && (
            <div
              onClick={() => changeEditContest(true)}
              className={styles.editBtn}
            >
              Edit
            </div>
          )}
          {role !== CUSTOMER && (
            <i onClick={goChat} className="fas fa-comments" />
          )}
        </div>
        <div className={styles.dataContainer}>
          <span className={styles.label}>Title of the Project</span>
          <span className={styles.data}>{title}</span>
        </div>
        {contestType === NAME ? (
          <NameContestSpecialInfo
            typeOfName={typeOfName}
            styleName={styleName}
          />
        ) : contestType === TAGLINE ? (
          <TaglineContestSpecialInfo
            typeOfTagline={typeOfTagline}
            nameVenture={nameVenture}
          />
        ) : (
          <LogoContestSpecialInfo
            brandStyle={brandStyle}
            nameVenture={nameVenture}
          />
        )}
        <div className={styles.dataContainer}>
          <span className={styles.label}>
            What is your Business/ Brand about?
          </span>
          <span className={styles.data}>{focusOfWork}</span>
        </div>
        <div className={styles.dataContainer}>
          <span className={styles.label}>
            Description target customers of company{" "}
          </span>
          <span className={styles.data}>{targetCustomer}</span>
        </div>
        <div className={styles.dataContainer}>
          <span className={styles.label}>Industry of company</span>
          <span className={styles.data}>{industry}</span>
        </div>
        {originalFileName && (
          <div className={styles.dataContainer}>
            <span className={styles.label}>Additional File</span>
            <a
              target="_blank"
              className={styles.file}
              href={`${PUBLIC_URL}${fileName}`}
              download={originalFileName}
              rel="noreferrer"
            >
              {originalFileName}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestInfo;
