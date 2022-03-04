import React from "react";
import CONSTANTS from "../../../constants";
import styles from "./Tool.module.scss";

function Tool() {
  const {
    HOW_IT_WORKS: {
      TOOL_LINKS: { stars, users, sharingFiles },
    },
  } = CONSTANTS;

  return (
    <section className={styles.toolContainer}>
      <div className={styles.toolItem}>
        <img src={stars.link} alt={stars.altText} />
        <p>
          <b>4.9 out of 5 stars</b>
          <span> from 25,000+ customers.</span>
        </p>
      </div>
      <div className={styles.slash}>/</div>
      <div className={styles.toolItem}>
        <img src={users.link} alt={users.altText} />
        <p>
          <span>Our branding community stands</span>
          <b> 200,000+</b>
          <span> strong.</span>
        </p>
      </div>
      <div className={styles.slash}>/</div>
      <div className={styles.toolItem}>
        <img src={sharingFiles.link} alt={sharingFiles.altText} />
        <p>
          <b>140+ Industries</b>
          <span> supported across more than</span>
          <b> 85 countries</b>
          <span> – and counting.</span>
        </p>
      </div>
    </section>
  );
}

export default Tool;
