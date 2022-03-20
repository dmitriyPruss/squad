import React from "react";
import PhoneForwardedOutlinedIcon from "@mui/icons-material/PhoneForwardedOutlined";
import CONSTANTS from "../../../constants";
import styles from "./InfoBlock.module.scss";

function InfoBlock() {
  return (
    <section className={styles.infoBlock}>
      <div className={styles.infoList}>
        <div className={styles.infoItem}>
          <div className={styles.arrow}>
            <span>&gt;</span>
          </div>
          <h3>Pay a Fraction of cost vs hiring an agency</h3>
          <p>
            For as low as $199, our naming contests and marketplace allow you to
            get an amazing brand quickly and affordably.
          </p>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.arrow}>
            {" "}
            <span>&gt;</span>
          </div>
          <h3>Satisfaction Guarantee</h3>
          <p>
            Of course! We have policies in place to ensure that you are
            satisfied with your experience.
            <a href="https://www.squadhelp.com/how-it-works"> Learn More</a>
          </p>
        </div>
      </div>
      <div className={styles.questions}>
        <h3>Questions?</h3>
        <p>
          Speak with a Squadhelp platform expert to learn more and get your
          questions answered.
        </p>
        <button>
          <span>Schedule Consultation</span>
        </button>
        <p className={styles.phoneNumber}>
          <PhoneForwardedOutlinedIcon
            style={{ width: "30px", color: "white" }}
          />
          <span>{CONSTANTS.CONTACTS.TEL}</span>
        </p>
        <p>Call us for assistance</p>
      </div>
    </section>
  );
}

export default InfoBlock;
