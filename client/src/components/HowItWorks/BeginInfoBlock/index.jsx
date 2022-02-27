import React from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import styles from './BeginInfoBlock.module.scss';

import { ReactComponent as MobileUser } from './mobileUser.svg';

function BeginInfoBlock () {
  return (
    <article className={styles.beginInfoBlock}>
      <section>
        <span className={styles.likeButton}>World's #1 Naming Platform</span>
        <h1 className={styles.mainHeader}>How Does Squadhelp Work?</h1>
        <p>
          Squadhelp helps you come up with a great name for your business by
          combining the power of crowdsourcing with sophisticated technology and
          Agency-level validation services.
        </p>
        <button className={styles.playVideoButton}>
          {' '}
          <PlayArrowIcon />{' '}
          <a target='_blank' rel="noreferrer" href='https://vimeo.com/368584367'>
            Play Video
          </a>
        </button>
      </section>
      <MobileUser />
    </article>
  );
}

export default BeginInfoBlock;
