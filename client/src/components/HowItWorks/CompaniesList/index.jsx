import React from 'react';
import styles from './CompaniesList.module.scss';

function CompaniesList () {
  return (
    <article className={styles.companiesContainer}>
      <div className={styles.companyHeader}>
        <h3>Featured In</h3>
      </div>
      <div className={styles.companiesList}>
        <a
          target='_blank'
          href='https://www.forbes.com/sites/forbestreptalks/2016/07/11/not-sure-how-to-name-a-startup-squadhelp-will-crowdsource-it-for-199/?sh=6b5e55e46145'
        >
          <img
            src='https://www.squadhelp.com/resources/assets/imgs/front/forbes.svg'
            alt=''
          />
        </a>
        <a target='_blank' href='https://thenextweb.com/latest'>
          <img
            src='https://www.squadhelp.com/resources/assets/imgs/front/TNW.svg'
            alt=''
          />
        </a>
        <a
          target='_blank'
          href='https://www.chicagotribune.com/business/blue-sky/ct-squadhelp-startup-names-bsi-20170331-story.html'
        >
          <img
            src='https://www.squadhelp.com/resources/assets/imgs/front/chicago.svg'
            alt=''
          />
        </a>
        <a
          target='_blank'
          href='https://mashable.com/archive/make-money-crowdworking'
        >
          <img
            src='https://www.squadhelp.com/resources/assets/imgs/front/Mashable.svg'
            alt=''
          />
        </a>
      </div>
    </article>
  );
}

export default CompaniesList;
