import React from "react";
import CONSTANTS from "../../../constants";
import styles from "./OfferInfo.module.scss";

const OfferInfo = (props) => {
  const {
    data: {
      "Contest.contestType": contestType,
      "Contest.title": title,
      "Contest.typeOfName": typeOfName,
      "Contest.styleName": styleName,
      "Contest.focusOfWork": focusOfWork,
      "Contest.targetCustomer": targetCustomer,
      "Contest.industry": industry,
      "Contest.fileName": fileName,
    },
  } = props;

  return (
    <section className={styles.offerInfoContainer}>
      <ul className={styles.offerInfoList}>
        <li>
          <span>Contest Type:</span>
          <span>{contestType}</span>
        </li>
        <li>
          <span>Title of the Project:</span>
          <span>{title}</span>
        </li>
        <li>
          <span>Type of Name:</span>
          <span>{typeOfName}</span>
        </li>
        <li>
          <span>Style of Name:</span>
          <span>{styleName}</span>
        </li>
        <li>
          <span>What is your Business/ Brand about?</span>
          <span>{focusOfWork}</span>
        </li>
        <li>
          <span>Description target customers of company:</span>
          <span>{targetCustomer}</span>
        </li>
        <li>
          <span>Industry of company:</span>
          <span>{industry}</span>
        </li>
        {fileName ? (
          <li>
            <span>Image:</span>
            <img
              className={styles.chosenImg}
              src={`${CONSTANTS.PUBLIC_URL}${fileName}`}
              alt="file"
            />
          </li>
        ) : (
          ""
        )}
      </ul>
    </section>
  );
};

export default OfferInfo;
