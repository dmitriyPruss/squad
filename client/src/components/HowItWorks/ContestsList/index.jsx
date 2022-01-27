import React from 'react';
import InfoContest from '../InfoContest';
import styles from './ContestsList.module.scss';

function ContestsList () {
  return (
    <article className={styles.listContainer}>
      <ul className={styles.listGroup}>
        <li>
          <a href='#contests'>Launching A Contest</a>
        </li>
        <li>
          <a href='#marketplace'>Buying From Marketplace</a>
        </li>
        <li>
          <a href='#managed'>Managed Contests</a>
        </li>
        <li>
          <a href='#creatives'>For Creatives</a>
        </li>
      </ul>

      <InfoContest />
    </article>
  );
}

export default ContestsList;
