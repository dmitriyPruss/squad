import React from 'react';
import { ReactComponent as PcUser } from './pcUser.svg';
import { ReactComponent as PrizeCup } from './prizeCup.svg';
import styles from './NamingContestWork.module.scss';

function NamingContestWork () {
  const infoArr = [
    'Fill out your Naming Brief and begin receiving name ideas in minutes',
    'Rate the submissions and provide feedback to creatives. Creatives submit even more names based on your feedback.',
    'Our team helps you test your favorite names with your target audience. We also assist with Trademark screening.',
    'Pick a Winner. The winner gets paid for their submission.'
  ];

  return (
    <article className={styles.contestWorkContainer}>
      <section className={styles.headerContestBlock}>
        <PrizeCup style={{ width: '70px' }} />
        <h2>How Do Naming Contests Work?</h2>
      </section>
      <div className={styles.mainContestBlock}>
        <PcUser />

        <ul className={styles.contestWorkItems}>
          {infoArr.map((item, index) => (
            <li className={styles.workItem} key={index}>
              <p className={styles.workItemNum}>{index + 1}.</p>
              <p className={styles.workItemContext}>{item}</p>
            </li>
          ))}
          <li className={styles.linesVisualItem} key={infoArr.length}>
            <p></p>
            <p></p>
            <p></p>
          </li>
        </ul>
      </div>
    </article>
  );
}

export default NamingContestWork;
