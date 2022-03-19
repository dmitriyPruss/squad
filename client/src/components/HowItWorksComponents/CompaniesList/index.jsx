import React from "react";
import CONSTANTS from "../../../constants";
import styles from "./CompaniesList.module.scss";

function CompaniesList() {
  const {
    HOW_IT_WORKS: { COMPANY_LINKS },
  } = CONSTANTS;

  const showLinks = (item, index) => (
    <li key={index}>
      <a target="_blank" rel="noreferrer" href={item.path}>
        <img src={item.image} alt="" />
      </a>
    </li>
  );

  const links = Object.values(COMPANY_LINKS);

  return (
    <article className={styles.companiesContainer}>
      <div className={styles.companyHeader}>
        <h3>Featured In</h3>
      </div>
      <ul className={styles.companiesList}>{links.map(showLinks)}</ul>
    </article>
  );
}

export default CompaniesList;
