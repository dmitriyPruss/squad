import React from 'react';
import CONSTANTS from '../../../constants';
import styles from './CompaniesList.module.scss';

function CompaniesList () {

  const { HOW_IT_WORKS: {
      COMPANY_LINKS
    } 
  } = CONSTANTS;

  const showLinks = value => (
    <a
      target='_blank'
      rel="noreferrer"
      href={value.path}
    >
      <img
        src={value.image}
        alt=''
      />
    </a>
  );

  const links = Object.values(COMPANY_LINKS);

  return (
    <article className={styles.companiesContainer}>
      <div className={styles.companyHeader}>
        <h3>Featured In</h3>
      </div>
      <div className={styles.companiesList}>
        {links.map(showLinks)}
      </div>
    </article>
  );
}

export default CompaniesList;
