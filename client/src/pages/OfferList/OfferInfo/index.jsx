import React from "react";
import styles from "./OfferInfo.module.scss";

const OfferInfo = (props) => {
  // const { changeEditContest, userId, contestData, role, goChat } = props;
  const {
    data: {
      "Contest.contestType": Contest_contestType,
      "Contest.title": Contest_title,
      "Contest.typeOfName": Contest_typeOfName,
      "Contest.styleName": Contest_styleName,
      "Contest.focusOfWork": Contest_focusOfWork,
      "Contest.targetCustomer": Contest_targetCustomer,
      "Contest.industry": Contest_industry,
    },
  } = props;

  console.log("OFFER_INFO props", props);

  return (
    <section className={styles.offerInfoContainer}>
      <h4>Offer Information</h4>
      <ul className={styles.offerInfoList}>
        <li>
          <span>Contest Type:</span>
          <span>{Contest_contestType}</span>
        </li>
        <li>
          <span>Title of the Project:</span>
          <span>{Contest_title}</span>
        </li>
        <li>
          <span>Type of Name:</span>
          <span>{Contest_typeOfName}</span>
        </li>
        <li>
          <span>Style of Name:</span>
          <span>{Contest_styleName}</span>
        </li>
        <li>
          <span>What is your Business/ Brand about?</span>
          <span>{Contest_focusOfWork}</span>
        </li>
        <li>
          <span>Description target customers of company:</span>
          <span>{Contest_targetCustomer}</span>
        </li>
        <li>
          <span>Industry of company:</span>
          <span>{Contest_industry}</span>
        </li>
      </ul>
      {/* <div className={styles.infoContainer}>
        <div className={styles.contestTypeContainer}>
          <div className={styles.dataContainer}>
            <span className={styles.label}>Contest Type</span>
            <span className={styles.data}>{contestType}</span>
          </div>
          {User.id === userId && status !== FINISHED && (
            <div onClick={() => changeEditContest(true)} className={styles.editBtn}>
              Edit
            </div>
          )}
          {role !== CUSTOMER && <i onClick={goChat} className="fas fa-comments" />}
        </div>
        <div className={styles.dataContainer}>
          <span className={styles.label}>Title of the Project</span>
          <span className={styles.data}>{title}</span>
        </div>
        {contestType === NAME ? (
          <NameContestSpecialInfo typeOfName={typeOfName} styleName={styleName} />
        ) : contestType === TAGLINE ? (
          <TaglineContestSpecialInfo typeOfTagline={typeOfTagline} nameVenture={nameVenture} />
        ) : (
          <LogoContestSpecialInfo brandStyle={brandStyle} nameVenture={nameVenture} />
        )}
        <div className={styles.dataContainer}>
          <span className={styles.label}>What is your Business/ Brand about?</span>
          <span className={styles.data}>{focusOfWork}</span>
        </div>
        <div className={styles.dataContainer}>
          <span className={styles.label}>Description target customers of company </span>
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
      </div> */}
    </section>
  );
};

export default OfferInfo;
