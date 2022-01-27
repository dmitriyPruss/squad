import React from 'react';
import { ReactComponent as AbstractImg } from './svg_images/abstractImg.svg';
import { ReactComponent as LeavesImg } from './svg_images/leavesImg.svg';
import styles from './ReadyStarted.module.scss';

function ReadyStarted () {
  return (
    <section className={styles.readyStartedItem}>
      <h2>Ready to get started?</h2>
      <p>
        Fill out your contest brief and begin receiving custom name suggestions
        within minutes.
      </p>
      <a href='https://www.squadhelp.com/start-contest'>Start A Contest</a>

      <AbstractImg className={styles.abstractImg} />
      <LeavesImg className={styles.leavesImg} />
    </section>
  );
}

export default ReadyStarted;
