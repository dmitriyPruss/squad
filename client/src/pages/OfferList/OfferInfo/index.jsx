import React from "react";
import styles from "./OfferInfo.module.scss";

const OfferInfo = (props) => {
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
    </section>
  );
};

export default OfferInfo;
