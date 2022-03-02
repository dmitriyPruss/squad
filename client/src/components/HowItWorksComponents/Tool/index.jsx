import React from 'react';
import styles from './Tool.module.scss';

function Tool () {
  return (
    <section className={styles.toolContainer}>
      <div className={styles.toolItem}>
        <img
          src='https://www.squadhelp.com/resources/assets/imgs/front/stars.svg'
          alt=''
        />
        <p>
          <b>4.9 out of 5 stars</b>
          <span> from 25,000+ customers.</span>
        </p>
      </div>
      <div className={styles.slash}>/</div>
      <div className={styles.toolItem}>
        <img
          src='https://www.squadhelp.com/resources/assets/imgs/front/img2(1).png'
          alt=''
        />
        <p>
          <span>Our branding community stands</span>
          <b> 200,000+</b>
          <span> strong.</span>
        </p>
      </div>
      <div className={styles.slash}>/</div>
      <div className={styles.toolItem}>
        <img
          src='https://www.squadhelp.com/resources/assets/imgs/front/sharing-files.svg'
          alt=''
        />
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
